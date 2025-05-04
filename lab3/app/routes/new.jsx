import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useItems } from '../context/ItemsContext';
import Navigation from '../components/Navigation';

export default function NewBookPage() {
  const navigate = useNavigate();
  const { addItem } = useItems();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem({
      ...formData,
      price: Number(formData.price)
    });
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Dodaj nową książkę</h1>
          <p className="text-black">Wypełnij formularz, aby dodać nową pozycję do katalogu</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-black mb-1">
                Tytuł książki
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black transition duration-150 ease-in-out"
                placeholder="Wpisz tytuł książki"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-black mb-1">
                Kategoria
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black transition duration-150 ease-in-out"
              >
                <option value="">Wybierz kategorię</option>
                <option value="Drama">Drama</option>
                <option value="Comedy">Comedy</option>
              </select>
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-black mb-1">
                Cena
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black transition duration-150 ease-in-out"
                placeholder="Wpisz cenę"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-4 py-2 rounded-lg bg-gray-200 text-black hover:bg-gray-300 transition duration-150 ease-in-out"
              >
                Anuluj
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition duration-150 ease-in-out"
              >
                Dodaj książkę
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 