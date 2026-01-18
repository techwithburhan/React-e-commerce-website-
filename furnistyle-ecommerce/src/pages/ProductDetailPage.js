import React, { useState } from "react";
import { ChevronLeft, ShoppingCart, Plus, Minus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { products } from "../data/products";

const ProductDetailPage = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === Number(id));

  const [selectedColor, setSelectedColor] = useState(
    product?.colors[0]
  );
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes[0]
  );
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Product not found</h2>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, selectedColor, selectedSize, quantity });
    navigate("/cart");
  };

  // 🔥 Recommended products (same category, exclude current)
  const recommendedProducts = products
    .filter(
      (p) => p.category === product.category && p.id !== product.id
    )
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/products")}
        className="mb-6 text-blue-600 font-semibold flex items-center gap-2"
      >
        <ChevronLeft /> Back to Products
      </button>

      {/* ================= PRODUCT DETAIL ================= */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-96 object-cover rounded-lg shadow"
        />

        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-3xl text-blue-600 font-bold">
            ${product.price}
          </p>

          <p className="text-gray-600">
            <span className="font-semibold">Material:</span>{" "}
            {product.material}
          </p>

          {/* COLORS */}
          <div>
            <h3 className="font-semibold mb-2">Color</h3>
            <div className="flex gap-3 flex-wrap">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border rounded ${
                    selectedColor === color
                      ? "border-blue-600 bg-blue-50 text-blue-600"
                      : "border-gray-300"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* SIZE */}
          <div>
            <h3 className="font-semibold mb-2">Size</h3>
            <div className="flex gap-3 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded ${
                    selectedSize === size
                      ? "border-blue-600 bg-blue-50 text-blue-600"
                      : "border-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div>
            <h3 className="font-semibold mb-2">Quantity</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="border p-2 rounded"
              >
                <Minus />
              </button>
              <span className="font-bold text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="border p-2 rounded"
              >
                <Plus />
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg"
          >
            <ShoppingCart className="inline mr-2" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* ================= DESCRIPTION ================= */}
      <div className="bg-gray-50 p-8 rounded-lg mb-16">
        <h2 className="text-2xl font-bold mb-4">
          Product Description
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Experience premium quality with our{" "}
          <span className="font-semibold">{product.name}</span>.
          Crafted using high-quality{" "}
          <span className="font-semibold">{product.material}</span>,
          this product is designed to enhance your{" "}
          {product.category.toLowerCase()} with both style and
          durability.
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Premium build quality</li>
          <li>Multiple color and size options</li>
          <li>Modern and ergonomic design</li>
          <li>Free delivery on orders over $500</li>
        </ul>
      </div>

      {/* ================= RECOMMENDED PRODUCTS ================= */}
      {recommendedProducts.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold mb-8">
            Recommended Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {recommendedProducts.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/products/${item.id}`)}
                className="bg-white rounded-lg shadow cursor-pointer hover:shadow-xl transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-48 w-full object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-blue-600 font-bold">
                    ${item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
