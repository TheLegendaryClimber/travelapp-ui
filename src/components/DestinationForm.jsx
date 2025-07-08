import React from 'react';

export function DestinationForm({ form, countries, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-2xl shadow-lg mb-12">
      <select
        name="country"
        value={form.country}
        onChange={handleChange}
        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-indigo-400"
        required
      >
        <option value="" disabled>Select Country</option>
        {countries.map(c => (
          <option key={c.name} value={c.name}>{c.name}</option>
        ))}
      </select>

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="md:col-span-2 w-full p-4 border border-gray-300 rounded-lg focus:ring-indigo-400 h-32 resize-none"
      />

      <button
        type="submit"
        className="md:col-span-2 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition transform hover:-translate-y-1"
      >
        Add Destination
      </button>
    </form>
  );
}