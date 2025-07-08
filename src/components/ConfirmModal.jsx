import React from 'react';


export function ConfirmModal({ show, title, message, onConfirm, onCancel }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <p className="mb-6 text-gray-700">{message}</p>
        <div className="flex justify-end space-x-4">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Confirm</button>
        </div>
      </div>
    </div>
  );
}