import React, { useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation = ({ cart }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#13120A] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="text-2xl font-bold text-white cursor-pointer"
            onClick={() => navigate('/')}
          >
            FurniStyle
          </div>
          
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => navigate('/')} 
              className={`${isActive('/') ? 'text-blue-400' : 'text-white'} hover:text-blue-400 font-medium transition`}
            >
              Home
            </button>
            <button 
              onClick={() => navigate('/products')} 
              className={`${isActive('/products') ? 'text-blue-400' : 'text-white'} hover:text-blue-400 font-medium transition`}
            >
              Products
            </button>
            <button 
              onClick={() => navigate('/contact')} 
              className={`${isActive('/contact') ? 'text-blue-400' : 'text-white'} hover:text-blue-400 font-medium transition`}
            >
              Contact Us
            </button>
          </div>

          <div className="hidden md:block relative">
            <button onClick={() => navigate('/cart')} className="relative">
              <ShoppingCart className="w-6 h-6 text-white hover:text-blue-400 transition" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#13120A] border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button 
              onClick={() => { navigate('/'); setMenuOpen(false); }} 
              className="block w-full text-left px-3 py-2 text-white hover:bg-gray-800 rounded"
            >
              Home
            </button>
            <button 
              onClick={() => { navigate('/products'); setMenuOpen(false); }} 
              className="block w-full text-left px-3 py-2 text-white hover:bg-gray-800 rounded"
            >
              Products
            </button>
            <button 
              onClick={() => { navigate('/contact'); setMenuOpen(false); }} 
              className="block w-full text-left px-3 py-2 text-white hover:bg-gray-800 rounded"
            >
              Contact Us
            </button>
            <button 
              onClick={() => { navigate('/cart'); setMenuOpen(false); }} 
              className="block w-full text-left px-3 py-2 text-white hover:bg-gray-800 rounded flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;