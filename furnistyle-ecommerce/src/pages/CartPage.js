import React from 'react';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ cart, updateQuantity, removeFromCart, getTotalPrice }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow">
            <ShoppingCart className="w-24 h-24 mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Add some items to get started!</p>
            <button 
              onClick={() => navigate('/products')} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* CART ITEMS */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                  <div className="flex gap-6">
                    {/* PRODUCT IMAGE */}
                    <div className="flex-shrink-0">
                      <img 
                        src={item.images?.[0] || item.image || "https://via.placeholder.com/150x150?text=No+Image"}
                        alt={item.name} 
                        className="w-32 h-32 object-cover rounded-lg shadow"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/150x150?text=No+Image";
                        }}
                      />
                    </div>

                    {/* PRODUCT INFO */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                      <p className="text-gray-600 mb-1">
                        <span className="font-semibold">Category:</span> {item.category}
                      </p>
                      {item.selectedColor && (
                        <p className="text-gray-600 mb-1">
                          <span className="font-semibold">Color:</span> {item.selectedColor}
                        </p>
                      )}
                      {item.selectedSize && (
                        <p className="text-gray-600 mb-3">
                          <span className="font-semibold">Size:</span> {item.selectedSize}
                        </p>
                      )}
                      <p className="text-blue-600 font-bold text-xl">₹{item.price}</p>
                    </div>

                    {/* QUANTITY & REMOVE */}
                    <div className="flex flex-col items-center justify-between">
                      {/* QUANTITY SELECTOR */}
                      <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)} 
                          className="bg-white hover:bg-gray-200 p-2 rounded transition"
                          title="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)} 
                          className="bg-white hover:bg-gray-200 p-2 rounded transition"
                          title="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* REMOVE BUTTON */}
                      <button 
                        onClick={() => removeFromCart(item.id)} 
                        className="text-red-500 hover:text-red-700 font-semibold transition flex items-center gap-1 mt-4"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>

                      {/* SUBTOTAL */}
                      <div className="mt-4 text-right">
                        <p className="text-gray-600 text-sm">Subtotal</p>
                        <p className="text-lg font-bold text-blue-600">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ORDER SUMMARY */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h2>

                <div className="space-y-4 mb-6 border-b pb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">₹{getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (10%)</span>
                    <span className="font-semibold">₹{(getTotalPrice() * 0.1).toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between text-xl mb-6 pt-4">
                  <span className="font-bold text-gray-800">Total</span>
                  <span className="font-bold text-blue-600 text-2xl">₹{(getTotalPrice() * 1.1).toFixed(2)}</span>
                </div>

                {/* BUTTONS */}
                <button 
                  onClick={() => navigate('/checkout')} 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition mb-3 shadow-md"
                >
                  Proceed to Checkout
                </button>
                <button 
                  onClick={() => navigate('/products')} 
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition"
                >
                  Continue Shopping
                </button>

                {/* INFO BOX */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    ✓ Free shipping on orders over ₹10,000<br/>
                    ✓ 30-day return policy<br/>
                    ✓ Secure checkout
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
