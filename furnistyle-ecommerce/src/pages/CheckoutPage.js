import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = ({ cart, getTotalPrice, clearCart }) => {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const handlePaymentSubmit = () => {
    if (paymentData.fullName && paymentData.email && paymentData.cardNumber) {
      alert('Payment successful! Your order has been placed.');
      clearCart();
      navigate('/');
    } else {
      alert('Please fill in all required fields');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <button 
        onClick={() => navigate('/cart')} 
        className="mb-6 text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2"
      >
        <ChevronLeft className="w-5 h-5" />
        Back to Cart
      </button>

      <h1 className="text-4xl font-bold text-center mb-12">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2 font-medium">Full Name *</label>
                <input
                  type="text"
                  value={paymentData.fullName}
                  onChange={(e) => setPaymentData({...paymentData, fullName: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Email *</label>
                <input
                  type="email"
                  value={paymentData.email}
                  onChange={(e) => setPaymentData({...paymentData, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Phone</label>
                <input
                  type="tel"
                  value={paymentData.phone}
                  onChange={(e) => setPaymentData({...paymentData, phone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2 font-medium">Address</label>
                <input
                  type="text"
                  value={paymentData.address}
                  onChange={(e) => setPaymentData({...paymentData, address: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="123 Main Street"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">City</label>
                <input
                  type="text"
                  value={paymentData.city}
                  onChange={(e) => setPaymentData({...paymentData, city: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="New York"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">ZIP Code</label>
                <input
                  type="text"
                  value={paymentData.zipCode}
                  onChange={(e) => setPaymentData({...paymentData, zipCode: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="10001"
                />
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Card Number *</label>
                <input
                  type="text"
                  value={paymentData.cardNumber}
                  onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Cardholder Name *</label>
                <input
                  type="text"
                  value={paymentData.cardName}
                  onChange={(e) => setPaymentData({...paymentData, cardName: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="John Doe"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Expiry Date *</label>
                  <input
                    type="text"
                    value={paymentData.expiryDate}
                    onChange={(e) => setPaymentData({...paymentData, expiryDate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="MM/YY"
                    maxLength="5"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">CVV *</label>
                  <input
                    type="text"
                    value={paymentData.cvv}
                    onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="123"
                    maxLength="3"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.name} x{item.quantity}</span>
                  <span className="font-semibold">${item.price * item.quantity}</span>
                </div>
              ))}
              <div className="border-t pt-4 space-y-2">
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
            </div>
            <button 
              onClick={handlePaymentSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Place Order
            </button>
            <p className="text-xs text-gray-500 text-center mt-4">
              Your payment information is secure and encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;