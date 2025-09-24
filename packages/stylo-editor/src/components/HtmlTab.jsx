import { Copy } from 'lucide-react';

export default function HtmlTab({ selectedElement }) {
  const html = selectedElement?.outerHTML || '';
  return (
    <div className="space-y-4">
      <div className="p-4 bg-gray-900 rounded border border-gray-700">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-blue-400">HTML Structure</span>
          <button onClick={() => navigator.clipboard.writeText(html)} className="p-1 rounded hover:bg-gray-700" title="Copy HTML">
            <Copy size={12} className="text-gray-400" />
          </button>
        </div>
        <pre className="overflow-x-auto font-mono text-xs text-gray-300 whitespace-pre-wrap">{html}</pre>
      </div>
    </div>
  );
}
