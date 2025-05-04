import { createContext, useContext, useState } from 'react';

const ItemsContext = createContext();

export function ItemsProvider({ children }) {
  const [items, setItems] = useState([
    { id: 1, title: 'Item 1', category: 'Drama', price: 100 },
    { id: 2, title: 'Item 2', category: 'Comedy', price: 200 },
    { id: 3, title: 'Item 3', category: 'Drama', price: 150 },
  ]);

  const [filters, setFilters] = useState({
    searchTerm: '',
    category: '',
    minPrice: '',
    maxPrice: '',
  });

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(filters.searchTerm.toLowerCase());
    const matchesCategory = !filters.category || item.category === filters.category;
    const matchesMinPrice = !filters.minPrice || item.price >= Number(filters.minPrice);
    const matchesMaxPrice = !filters.maxPrice || item.price <= Number(filters.maxPrice);
    
    return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
  });

  const addItem = (newItem) => {
    setItems([...items, { ...newItem, id: items.length + 1 }]);
  };

  return (
    <ItemsContext.Provider value={{
      items: filteredItems,
      filters,
      setFilters,
      addItem,
    }}>
      {children}
    </ItemsContext.Provider>
  );
}

export function useItems() {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('useItems must be used within an ItemsProvider');
  }
  return context;
} 