export default function ExpandedPanel({ onDragStart, onMinimize, children }) {
    return (
      <>
        <div className="drag-handle" onMouseDown={onDragStart} />
        <button
          onClick={onMinimize}
          className="flex absolute top-2 right-2 z-10 justify-center items-center w-7 h-7 text-gray-300 rounded bg-secondary-bg hover:bg-pikend-bg/20 hover:text-white"
          title="Minimize panel"
        >
          <i className="ti ti-minimize"></i>
        </button>
        {children}
      </>
    );
  }
  