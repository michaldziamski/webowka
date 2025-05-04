import { createContext, useContext, useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, getDocs, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const ItemsContext = createContext();

export function ItemsProvider({ children }) {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [showOnlyMyItems, setShowOnlyMyItems] = useState(false);
  const [filters, setFilters] = useState({
    searchTerm: '',
    category: '',
    minPrice: '',
    maxPrice: '',
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let q = collection(db, 'books');
    if (showOnlyMyItems && user) {
      q = query(q, where('userId', '==', user.uid));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const books = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setItems(books);
    });

    return () => unsubscribe();
  }, [showOnlyMyItems, user]);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(filters.searchTerm.toLowerCase());
    const matchesCategory = !filters.category || item.category === filters.category;
    const matchesMinPrice = !filters.minPrice || item.price >= Number(filters.minPrice);
    const matchesMaxPrice = !filters.maxPrice || item.price <= Number(filters.maxPrice);
    
    return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
  });

  const addItem = async (newItem) => {
    if (!user) return;
    
    try {
      await addDoc(collection(db, 'books'), {
        ...newItem,
        userId: user.uid,
        createdAt: new Date()
      });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const editItem = async (itemId, updatedItem) => {
    if (!user) return;
    
    try {
      const itemRef = doc(db, 'books', itemId);
      await updateDoc(itemRef, updatedItem);
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const deleteItem = async (itemId) => {
    if (!user) return;
    
    try {
      const itemRef = doc(db, 'books', itemId);
      await deleteDoc(itemRef);
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  const toggleShowOnlyMyItems = () => {
    setShowOnlyMyItems(!showOnlyMyItems);
  };

  return (
    <ItemsContext.Provider value={{
      items: filteredItems,
      filters,
      setFilters,
      addItem,
      editItem,
      deleteItem,
      user,
      showOnlyMyItems,
      toggleShowOnlyMyItems
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