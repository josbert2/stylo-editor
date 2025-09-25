import Dock from './Dock/Dock';

export default function DockTrigger({ onToolSelect, activeTool, isInspectorMode, onInspectorToggle, selectedElement }) {
  return (
    <Dock
      onToolSelect={onToolSelect}
      activeTool={activeTool}
      inspectorMode={isInspectorMode}
      onInspectorToggle={onInspectorToggle}
      selectedElement={selectedElement}
    />
  );
}
