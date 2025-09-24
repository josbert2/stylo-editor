import { useCallback, useEffect, useState } from 'react';

export default function useSpacingDrag({ selectedElement, spacingValues, setSpacingValues }) {
  const [isDragging, setIsDragging] = useState(null);
  const [dragStart, setDragStart] = useState({ x: 0, value: 0 });

  const onMouseDown = useCallback((prop, e) => {
    e.preventDefault();
    setIsDragging(prop);
    const curVal = spacingValues[prop]?.value || 0;
    setDragStart({ x: e.clientX, value: curVal });
    document.body.style.cursor = 'ew-resize';
  }, [spacingValues]);

  const onMouseMove = useCallback((e) => {
    if (!isDragging || !selectedElement) return;
    const deltaX = e.clientX - dragStart.x;
    const newValue = Math.max(0, dragStart.value + deltaX);
    const unit = spacingValues[isDragging]?.unit || 'px';
    setSpacingValues((prev) => ({ ...prev, [isDragging]: { value: newValue, unit } }));
    selectedElement.style[isDragging] = `${newValue}${unit}`;
  }, [isDragging, dragStart, selectedElement, spacingValues, setSpacingValues]);

  const onMouseUp = useCallback(() => {
    setIsDragging(null);
    document.body.style.cursor = 'default';
  }, []);

  useEffect(() => {
    if (!isDragging) return;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, onMouseMove, onMouseUp]);

  return { onMouseDown };
}
