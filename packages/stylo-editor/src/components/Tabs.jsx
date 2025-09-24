export default function Tabs({ activeTab, setActiveTab }) {
    const items = [
      { key: 'design', label: 'Design' },
      { key: 'code', label: 'Code' },
      { key: 'html', label: 'HTML' },
      { key: 'chat', label: 'Chat', isNew: true }
    ];
    return (
      <div className="flex gap-1 px-3">
        {items.map(({ key, label, isNew }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-3 py-1 text-xs rounded-t transition-colors relative ${activeTab === key ? 'bg-secondary-bg text-[#dadada] border-b-2 border-blue-500' : 'text-gray-400 hover:text-white hover:bg-secondary-bg'}`}
          >
            {label}
            {isNew && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] px-1 rounded-full">NEW</span>}
          </button>
        ))}
      </div>
    );
  }
  