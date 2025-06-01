import { Link } from 'react-router-dom';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useItems } from '../context/ItemsContext';

export default function Navigation() {
  const { user, showOnlyMyItems, toggleShowOnlyMyItems } = useItems();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in with Google: ', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-black font-semibold text-lg">
              Księgarnia Belmondziarnia
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user && (
              <button
                onClick={toggleShowOnlyMyItems}
                className={`px-4 py-2 rounded-lg ${
                  showOnlyMyItems ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
                } hover:bg-indigo-700 transition duration-150 ease-in-out`}
              >
                MOJE
              </button>
            )}
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">{user.displayName}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition duration-150 ease-in-out"
                >
                  Wyloguj
                </button>
              </div>
            ) : (
            <button
                onClick={handleLogin}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition duration-150 ease-in-out"
            >
                Zaloguj się przez Google
            </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 