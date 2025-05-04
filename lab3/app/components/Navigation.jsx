import { Link } from 'react-router';

export default function Navigation() {
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
            <button
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition duration-150 ease-in-out"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 