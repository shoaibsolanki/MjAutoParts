import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import { LogOut } from 'lucide-react';
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate()
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="font-bold text-xl text-blue-600">
          <img src={logo} className='h-16' />
             {/* MJ Auto Parts */}
          </Link>
            
          {/* <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/products" className="text-gray-700 hover:text-blue-600">Products</Link>
            <Link to="/categories" className="text-gray-700 hover:text-blue-600">Categories</Link>
          </div> */}

          <div className="flex items-center">
          {localStorage.getItem('token') && (
            <button
              onClick={() => {
              localStorage.removeItem('token');
              // window.location.reload();
              navigate('/login')
              }}
              className=" flex ml-4  px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <LogOut/>
              Logout
            </button>
            )}
            {/* <Link to="/cart" className="p-2 text-gray-700 hover:text-blue-600">
              <ShoppingCart className="h-6 w-6" />
            </Link> */}
            {/* <button
              className="md:hidden ml-2 p-2 text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button> */}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/categories"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}