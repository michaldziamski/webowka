import { useState } from 'react';
import { Link } from 'react-router';
import { useItems } from '../context/ItemsContext';
import Navigation from '../components/Navigation';

export default function MainPage() {
  const { items, filters, setFilters } = useItems();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="mb-8 flex justify-between items-center">
          <div>
          </div>
          <Link
            to="/new"
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition duration-150 ease-in-out"
          >
            Dodaj nową książkę
          </Link>
        </div>
        
        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-200">
          <h2 className="text-lg font-semibold text-black mb-4">Filtry wyszukiwania</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-black mb-1">Szukaj</label>
              <input
                type="text"
                name="searchTerm"
                value={filters.searchTerm}
                onChange={handleFilterChange}
                placeholder="Wpisz frazę..."
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black transition duration-150 ease-in-out"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Kategoria</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black transition duration-150 ease-in-out"
              >
                <option value="">Wszystkie kategorie</option>
                <option value="Drama">Drama</option>
                <option value="Comedy">Comedy</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Min. cena</label>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="0"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black transition duration-150 ease-in-out"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Max. cena</label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="1000"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black transition duration-150 ease-in-out"
              />
            </div>
          </div>
        </div>

        {/* Items List */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-black">Lista pozycji</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">Tytuł</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">Kategoria</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">Cena</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">Akcje</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-black">Brak wyników wyszukiwania</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item.id} className="text-black hover:bg-gray-50 transition duration-150 ease-in-out">
                      <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => {}}
                          className="px-3 py-1 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition duration-150 ease-in-out mr-2"
                        >
                          Edytuj
                        </button>
                        <button
                          onClick={() => {}}
                          className="px-3 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700 transition duration-150 ease-in-out"
                        >
                          Usuń
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 