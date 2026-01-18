import React, { useState } from 'react';
import { ChevronLeft, ShoppingCart, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductDetailPage = ({ selectedProduct, addToCart }) => {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(selectedProduct?.colors[0] || '');
  const [selectedSize, setSelectedSize] = useState(selectedProduct?.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) {
    navigate('/products');
    return null;
  }

  const handleAddToCart = () => {
    addToCart({ ...selectedProduct, selectedColor, selectedSize, quantity });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <button 
        onClick={() => navigate('/products')} 
        className="mb-6 text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2"
      >
        <ChevronLeft className="w-5 h-5" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img 
              src={selectedProduct.image} 
              alt={selectedProduct.name} 
              className="w-full h-96 object-cover"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
              {selectedProduct.category}
            </p>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{selectedProduct.name}</h1>
            <p className="text-3xl font-bold text-blue-600 mb-6">${selectedProduct.price}</p>
            
            {selectedProduct.inStock ? (
              <div className="flex items-center gap-2 text-green-600 mb-6">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span className="font-semibold">In Stock</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-600 mb-6">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                <span className="font-semibold">Out of Stock</span>
              </div>
            )}
          </div>

          <div className="border-t border-b py-6 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">MATERIAL</h3>
              <p className="text-gray-600">{selectedProduct.material}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">COLOR</h3>
            <div className="flex flex-wrap gap-3">
              {selectedProduct.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border-2 rounded-lg font-medium transition ${
                    selectedColor === color
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">SIZE</h3>
            <div className="flex flex-wrap gap-3">
              {selectedProduct.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border-2 rounded-lg font-medium transition ${
                    selectedSize === size
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">QUANTITY</h3>
            <div className="flex items-center gap-4 bg-gray-100 rounded-lg p-2 w-fit">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                className="bg-white hover:bg-gray-200 p-2 rounded transition"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="font-bold text-lg w-12 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)} 
                className="bg-white hover:bg-gray-200 p-2 rounded transition"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          <button 
            onClick={handleAddToCart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold text-lg transition flex items-center justify-center gap-3"
          >
            <ShoppingCart className="w-6 h-6" />
            Add to Cart
          </button>

          <div className="bg-gray-50 rounded-lg p-6 space-y-3">
            <h3 className="font-semibold text-gray-900 mb-4">Product Description</h3>
            <p className="text-gray-600 leading-relaxed">
              Experience premium quality with our {selectedProduct.name}. Crafted from high-quality {selectedProduct.material}, 
              this piece combines style and functionality to enhance your {selectedProduct.category.toLowerCase()} space. 
              Available in multiple colors and sizes to match your personal style and space requirements.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span>Premium {selectedProduct.material}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span>Multiple color options available</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span>Free shipping on orders over $500</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span>1-year warranty included</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;