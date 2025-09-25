import clsx from 'clsx';
import Panel from './Panel.module.css';

export default function PanelShell({
  panelRef,
  isDraggingPanel,
  isMinimized,
  panelPosition,
  children
}) {
  return (
    <div
      ref={panelRef}
      className={`${Panel.base} ${isDraggingPanel ? Panel.scaleOnDrag : Panel.hoverShadow} ${isMinimized ? Panel.minimized : Panel.normal}`}
      style={{
        left: `${panelPosition.x}px`,
        top: `${panelPosition.y}px`,
        resize: isMinimized ? 'none' : 'both',
        minWidth: isMinimized ? '300px' : '320px',
        minHeight: isMinimized ? '44px' : '400px',
        maxWidth: isMinimized ? '128px' : '90vw',
        maxHeight: isMinimized ? '32px' : '90vh',
        willChange: isDraggingPanel ? 'transform' : 'auto'
      }}
    >
      {children}
    </div>
  );
}
