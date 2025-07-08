import React from 'react';

export function DestinationList({ title, list, onDeleteClick, onVisitClick, cardBg, showToggle }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {list.map(dest => (
          <div key={dest.id} className="relative">
            {dest.visited && (
              <span className="absolute top-0 right-0 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-bl-lg">
                {dest.timesVisited} Visits
              </span>
            )}
            <div className={`${cardBg} rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition-shadow`}>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{dest.country}</h3>
                {dest.description && <p className="text-gray-600 mb-4">{dest.description}</p>}
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                {showToggle && !dest.visited && (
                  <button
                    onClick={() => onVisitClick(dest.country)}
                    className="text-green-600 hover:text-green-800 font-medium"
                  >Mark Visited</button>
                )}
                <button onClick={() => onDeleteClick(dest.id)} className="text-red-600 hover:text-red-800 font-medium">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}