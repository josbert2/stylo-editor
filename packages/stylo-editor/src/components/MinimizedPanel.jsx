import LogoApp from './LogoApp';

export default function MinimizedPanel({
  isInspectorMode,
  selectedElement,
  onDragStart,
  onExpand,
  onCycleCorner
}) {
  return (
    <div className="minimized-panel" onMouseDown={onDragStart}>
      <div className="flex gap-2 items-center">
        <div><LogoApp variant="white" size={82} className="logo-app" /></div>
        <div className={`inspector-icon ${isInspectorMode ? 'inspector-icon-active' : 'inspector-icon-inactive'}`} />
        <div className={`inspector-icon ${selectedElement ? 'inspector-icon-active' : 'inspector-icon-inactive'}`} />
      </div>

      <div className="flex gap-1 items-center">
        <div onClick={(e) => { e.stopPropagation(); onExpand(); }} className="expand-btn" title="Expand panel">
          <i className="ti ti-maximize"></i>
        </div>
        <div onClick={(e) => { e.stopPropagation(); onCycleCorner(); }} className="button" title="Move position">
          <i className="ti ti-replace"></i>
        </div>
      </div>
    </div>
  );
}
