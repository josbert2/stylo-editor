export default function ChatTab() {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-gray-900 rounded border border-gray-700">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-purple-400">AI Chat</span>
            <span className="px-2 py-1 text-xs text-white bg-red-500 rounded">NEW</span>
          </div>
          <div className="py-8 text-center text-gray-400">
            <div className="mb-2 text-2xl">🤖</div>
            <p className="text-sm">AI Chat feature coming soon!</p>
            <p className="mt-2 text-xs">Ask questions about this element's styling</p>
          </div>
        </div>
      </div>
    );
  }
  