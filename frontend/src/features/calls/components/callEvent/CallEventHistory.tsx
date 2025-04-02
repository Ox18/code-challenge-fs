"use client";
import { useCallEvent } from "../../hooks/useCallEvent";

export default function CallEventHistory() {
  const { isOpen, close, data, loading } = useCallEvent();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white max-w-2xl w-full rounded-xl shadow-lg p-0 relative">
        <div className="flex justify-between items-center px-6 py-4 sticky top-0 bg-white z-10 rounded-t-xl">
          <h2 className="text-xl font-semibold">Call Event History</h2>
          <button
            onClick={close}
            className="text-gray-500 hover:text-black text-lg"
          >
            ✕
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {loading && (
            <p className="text-center text-gray-500">Loading events...</p>
          )}

          {!loading && data.length === 0 && (
            <p className="text-center text-gray-500">No events found.</p>
          )}

          {!loading && data.length > 0 && (
            <ul className="space-y-4">
              {data.map((event) => (
                <li key={event.id} className="border-b pb-3">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span className="font-medium">{event.type}</span>
                    <span>{new Date(event.timestamp).toLocaleString()}</span>
                  </div>
                  <pre className="bg-gray-100 text-sm text-gray-800 p-2 rounded overflow-x-auto">
                    {JSON.stringify(event.metadata, null, 2)}
                  </pre>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
