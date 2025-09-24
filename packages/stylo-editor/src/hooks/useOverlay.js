import { useRef, useCallback } from 'react';

export default function useOverlay() {
  const overlayRef = useRef(null);

  const createOverlay = useCallback(() => {
    if (overlayRef.current) return overlayRef.current;
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      pointer-events: none;
      border: 2px solid #4AEDFF;
      background: rgba(74, 237, 255, 0.1);
      z-index: 9998;
      transition: all 0.1s ease;
      display: none;
    `;
    document.body.appendChild(overlay);
    overlayRef.current = overlay;
    return overlay;
  }, []);

  const updateOverlay = useCallback((el, isSelected = false) => {
    const overlay = createOverlay();
    if (!el) {
      overlay.style.display = 'none';
      return;
    }
    const rect = el.getBoundingClientRect();
    const borderColor = '#4AEDFF';
    const backgroundColor = isSelected ? 'rgba(74, 237, 255, 0.15)' : 'rgba(74, 237, 255, 0.1)';

    overlay.style.cssText = `
      position: fixed;
      pointer-events: none;
      border: 2px solid ${borderColor};
      background: ${backgroundColor};
      z-index: 9998;
      transition: all 0.1s ease;
      display: block;
      top: ${rect.top + window.scrollY}px;
      left: ${rect.left + window.scrollX}px;
      width: ${rect.width}px;
      height: ${rect.height}px;
      ${isSelected ? 'box-shadow: 0 0 0 1px rgba(74, 237, 255, 0.3);' : ''}
    `;
  }, [createOverlay]);

  const destroyOverlay = useCallback(() => {
    if (overlayRef.current) {
      document.body.removeChild(overlayRef.current);
      overlayRef.current = null;
    }
  }, []);

  return { updateOverlay, destroyOverlay, overlayRef };
}
