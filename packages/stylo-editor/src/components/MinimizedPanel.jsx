import PanelHeader from '../PanelHeader.module.css';
import LogoApp from '../LogoApp';

export default function MinimizedPanel({
  isInspectorMode,
  selectedElement,
  onDragStart,
  onExpand,
  onCycleCorner
}) {
  return (
    <div className={`${PanelHeader.panel} minimized-panel`} onMouseDown={onDragStart}>
      <div className={`${PanelHeader.flexGap2ItemsCenter}`}>
        <div><LogoApp variant="white" size={82} className={`${PanelHeader.logoApp}`} /></div>
        <div className={`${PanelHeader.inspectorIcon} ${isInspectorMode ? PanelHeader.inspectorIconActive : PanelHeader.inspectorIconInactive}`} />
        <div className={`${PanelHeader.inspectorIcon} ${selectedElement ? PanelHeader.inspectorIconActive : PanelHeader.inspectorIconInactive}`} />
      </div>

      <div className={`${PanelHeader.flexGap1ItemsCenter}`}>
        <div onClick={(e) => { e.stopPropagation(); onExpand(); }} className={`${PanelHeader.expandBtn}`} title="Expand panel">
          <i className="ti ti-maximize"></i>
        </div>
        <div onClick={(e) => { e.stopPropagation(); onCycleCorner(); }} className={`${PanelHeader.button}`} title="Move position">
          <i className="ti ti-replace"></i>
        </div>
      </div>
    </div>
  );
}
