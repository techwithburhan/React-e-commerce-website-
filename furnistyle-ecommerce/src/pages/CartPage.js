import React from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ cart, updateQuantity, removeFromCart, getTotalPrice }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Shopping Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingCart className="w-24 h-24 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h2>
          <button 
            onClick={() => navigate('/products')} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cart.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6 mb-4 flex items-center gap-6">
                <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-2">{item.category}</p>
                  <p className="text-blue-600 font-bold text-lg">${item.price}</p>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-2">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)} 
                      className="bg-white hover:bg-gray-200 p-2 rounded transition"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)} 
                      className="bg-white hover:bg-gray-200 p-2 rounded transition"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="text-red-500 hover:text-red-700 font-semibold transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${getTotalPrice()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (10%)</span>
                  <span className="font-semibold">${(getTotalPrice() * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 flex justify-between text-xl">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-blue-600">${(getTotalPrice() * 1.1).toFixed(2)}</span>
                </div>
              </div>
              <button 
                onClick={() => navigate('/checkout')} 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition mb-3"
              >
                Proceed to Checkout
              </button>
              <button 
                onClick={() => navigate('/products')} 
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;