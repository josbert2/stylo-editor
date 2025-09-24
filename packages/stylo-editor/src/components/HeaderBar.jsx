export default function HeaderBar({
    selectedElement,
    isInspectorMode,
    onDragStart,
    onClearSelection
  }) {
    return (
      <div className="pt-6 border-b panel-header border-secondary-bg bg-primary-bg cursor-grab" onMouseDown={onDragStart}>
        {selectedElement ? (
          <>
            <div className="flex justify-between items-center px-3 mb-3">
              <div className="flex gap-2 items-center">
                <span className="text-lg font-bold text-white">{selectedElement.tagName.toLowerCase()}</span>
              </div>
              <div className="flex gap-1 items-center">
                <button className="p-2 rounded hover:bg-secondary-bg" title="Copy element">
                  <i className="ti ti-copy"></i>
                </button>
                <button className="p-2 rounded hover:bg-secondary-bg" title="Expand element">
                  <i className="ti ti-eye"></i>
                </button>
                <button className="p-2 rounded hover:bg-secondary-bg" title="Delete element">
                  <i className="ti ti-trash"></i>
                </button>
                <button onClick={onClearSelection} className="p-2 rounded hover:bg-secondary-bg" title="Close inspector">
                  <i className="ti ti-x"></i>
                </button>
              </div>
            </div>
  
            <div className="flex gap-2 items-center mb-3">
              <div className="flex gap-1 items-center text-gray-400">
                <div className="w-3 h-3 border border-gray-500"></div>
                <span className="text-xs">
                  {Math.round(selectedElement.getBoundingClientRect().width)}×{Math.round(selectedElement.getBoundingClientRect().height)}
                </span>
              </div>
            </div>
  
            <div className="flex gap-2 items-center mb-4">
              <div className="flex gap-1 items-center text-gray-400">
                <span className="text-xs">A</span>
                <span className="text-xs underline">
                  {window.getComputedStyle(selectedElement).fontFamily.split(',')[0].replace(/['"]/g, '')} {window.getComputedStyle(selectedElement).fontSize}
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-between items-center pl-3 mb-3">
            <div className="flex gap-2 items-center">
              <span className="text-sm font-bold">Stylo</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  