import { useCallback, useEffect, useRef, useState } from 'react';

export default function usePanelDrag({ isMinimized, minimizedCorner, setMinimizedCorner }) {
  const panelRef = useRef(null);
  const [panelPosition, setPanelPosition] = useState({ x: 20, y: 20 });
  const [isDraggingPanel, setIsDraggingPanel] = useState(false);
  const [panelDragOffset, setPanelDragOffset] = useState({ x: 0, y: 0 });
  const dragPositionRef = useRef({ x: 0, y: 0 });

  const getMinimizedPosition = useCallback(() => {
    const margin = 60;
    const tl = 20;
    const w = 128;
    const h = 32;
    switch (minimizedCorner) {
      case 'top-left': return { x: tl, y: tl };
      case 'top-right': return { x: window.innerWidth - w - margin, y: margin };
      case 'bottom-left': return { x: margin, y: window.innerHeight - h - margin };
      case 'bottom-right': return { x: window.innerWidth - w - margin, y: window.innerHeight - h - margin };
      default: return { x: tl, y: tl };
    }
  }, [minimizedCorner]);

  const getExpandedPosition = useCallback(() => {
    const expandedWidth = 384;
    const margin = 20;
    switch (minimizedCorner) {
      case 'top-left': return { x: margin, y: margin };
      case 'top-right': return { x: window.innerWidth - expandedWidth - margin, y: margin };
      case 'bottom-left': return { x: margin, y: margin };
      case 'bottom-right': return { x: window.innerWidth - expandedWidth - margin, y: margin };
      default: return { x: margin, y: margin };
    }
  }, [minimizedCorner]);

  useEffect(() => {
    setPanelPosition(isMinimized ? getMinimizedPosition() : getExpandedPosition());
  }, [isMinimized, minimizedCorner, getMinimizedPosition, getExpandedPosition]);

  useEffect(() => {
    const onResize = () => {
      if (isMinimized) setPanelPosition(getMinimizedPosition());
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isMinimized, getMinimizedPosition]);

  const handlePanelDragStart = useCallback((e) => {
    const target = e.target;
    const isHeader = target.closest('.panel-header') || target.classList.contains('drag-handle') || target.closest('.minimized-panel');
    if (!isHeader) return;

    e.preventDefault();
    e.stopPropagation();
    setIsDraggingPanel(true);
    const rect = panelRef.current?.getBoundingClientRect();
    if (rect) {
      setPanelDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      dragPositionRef.current = { x: rect.left, y: rect.top };
    }
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
    document.body.style.pointerEvents = 'none';
    if (panelRef.current) {
      panelRef.current.style.pointerEvents = 'auto';
      panelRef.current.style.zIndex = '10000';
    }
  }, []);

  const handlePanelDragMove = useCallback((e) => {
    if (!isDraggingPanel || !panelRef.current) return;
    e.preventDefault();
    const newX = e.clientX - panelDragOffset.x;
    const newY = e.clientY - panelDragOffset.y;
    const panelWidth = isMinimized ? 128 : 400;
    const panelHeight = isMinimized ? 32 : 600;
    const maxX = window.innerWidth - panelWidth;
    const maxY = window.innerHeight - panelHeight;
    const x = Math.max(0, Math.min(newX, maxX));
    const y = Math.max(0, Math.min(newY, maxY));
    dragPositionRef.current = { x, y };
    panelRef.current.style.left = `${x}px`;
    panelRef.current.style.top = `${y}px`;
  }, [isDraggingPanel, panelDragOffset, isMinimized]);

  const handlePanelDragEnd = useCallback(() => {
    if (!isDraggingPanel) return;
    const { x: finalX, y: finalY } = dragPositionRef.current;

    document.body.style.cursor = 'default';
    document.body.style.userSelect = 'auto';
    document.body.style.pointerEvents = 'auto';
    if (panelRef.current) {
      panelRef.current.style.pointerEvents = 'auto';
      panelRef.current.style.zIndex = '9999';
    }

    if (isMinimized) {
      const w = 128, h = 32, margin = 60, tl = 20;
      const centerX = finalX + w / 2;
      const centerY = finalY + h / 2;
      const winCX = window.innerWidth / 2;
      const winCY = window.innerHeight / 2;
      let pos = { x: finalX, y: finalY };
      let corner = minimizedCorner;

      if (centerX < winCX && centerY < winCY) { pos = { x: tl, y: tl }; corner = 'top-left'; }
      else if (centerX >= winCX && centerY < winCY) { pos = { x: window.innerWidth - w - margin, y: margin }; corner = 'top-right'; }
      else if (centerX < winCX && centerY >= winCY) { pos = { x: margin, y: window.innerHeight - h - margin }; corner = 'bottom-left'; }
      else { pos = { x: window.innerWidth - w - margin, y: window.innerHeight - h - margin }; corner = 'bottom-right'; }

      setPanelPosition(pos);
      setMinimizedCorner(corner);
    } else {
      setPanelPosition({ x: finalX, y: finalY });
    }
    setIsDraggingPanel(false);
  }, [isDraggingPanel, isMinimized, minimizedCorner, setMinimizedCorner]);

  useEffect(() => {
    if (!isDraggingPanel) return;
    document.addEventListener('mousemove', handlePanelDragMove);
    document.addEventListener('mouseup', handlePanelDragEnd);
    return () => {
      document.removeEventListener('mousemove', handlePanelDragMove);
      document.removeEventListener('mouseup', handlePanelDragEnd);
    };
  }, [isDraggingPanel, handlePanelDragMove, handlePanelDragEnd]);

  return {
    panelRef,
    panelPosition,
    isDraggingPanel,
    setIsDraggingPanel,
    handlePanelDragStart,
  };
}
