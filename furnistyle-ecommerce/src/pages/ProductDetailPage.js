import React, { useState, useEffect, useMemo } from "react";
import {
  ChevronLeft,
  ShoppingCart,
  Plus,
  Minus,
  Star,
  Heart,
  Share2,
  Truck,
  RotateCcw,
  Award,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { products } from "../data/products";

const ProductDetailPage = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Convert id to number and find product
  const product = useMemo(() => {
    return products.find((p) => p.id === parseInt(id, 10));
  }, [id]);

  console.log("Product ID from URL:", id);
  console.log("Found Product:", product);

  /* ================= SAFETY CHECK WITH USEMEMO ================= */
  const images = useMemo(() => {
    console.log("Product images:", product?.images);
    console.log("Product image:", product?.image);
    
    if (product?.images && Array.isArray(product.images) && product.images.length > 0) {
      return product.images;
    } else if (product?.image) {
      return [product.image];
    } else {
      return ["https://via.placeholder.com/800x600?text=No+Image"];
    }
  }, [product]);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0] || ""
  );
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes?.[0] || ""
  );
  const [quantity, setQuantity] = useState(1);

  /* 🔁 Update image if product changes */
  useEffect(() => {
    setActiveImage(0);
    setSelectedColor(product?.colors?.[0] || "");
    setSelectedSize(product?.sizes?.[0] || "");
    setQuantity(1);
  }, [id, product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-12 rounded-lg shadow-lg max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            ⚠️ Product Not Found
          </h2>
          <p className="text-gray-600 mb-6 text-lg">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2 mx-auto"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (typeof addToCart === "function") {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        images: product.images,
        selectedColor,
        selectedSize,
        quantity,
      });
      alert(`✅ ${product.name} added to cart!`);
    } else {
      console.error("addToCart is not a function");
      alert("Error adding to cart. Please try again.");
    }
  };

  const discountPercent = 40;
  const originalPrice = Math.round(product.price * (100 / (100 - discountPercent)));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/products")}
          className="mb-8 text-blue-600 font-semibold flex items-center gap-2 hover:text-blue-700 transition text-lg"
        >
          <ChevronLeft className="w-5 h-5" /> Back to Products
        </button>

        {/* ================= MAIN CONTENT ================= */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* IMAGE GALLERY */}
          <div className="space-y-4">
            {/* MAIN IMAGE */}
            <div className="relative bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src={images[activeImage]}
                alt={product.name}
                className="w-full h-auto object-cover rounded-lg"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/800x800?text=No+Image";
                }}
              />

              {/* DISCOUNT BADGE */}
              <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-lg shadow-lg z-10">
                {discountPercent}% OFF
              </div>
            </div>

            {/* THUMBNAIL IMAGES */}
            <div className="flex gap-3 flex-wrap bg-white p-4 rounded-lg shadow max-h-32 overflow-y-auto">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-20 h-20 rounded-lg border-2 overflow-hidden transition flex-shrink-0 ${
                    activeImage === index
                      ? "border-blue-600 shadow-lg"
                      : "border-gray-300 hover:border-blue-400"
                  }`}
                >
                  <img
                    src={img}
                    alt={`thumbnail-${index}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/80x80?text=No+Image";
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* DETAILS */}
          <div className="space-y-6">
            {/* TITLE & PRICE */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <span className="text-gray-600 font-semibold">
                      (120 reviews)
                    </span>
                  </div>
                </div>
                <button className="text-gray-600 hover:text-red-600 transition">
                  <Heart className="w-7 h-7" />
                </button>
              </div>

              {/* PRICE SECTION */}
              <div className="mb-4">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-bold text-blue-600">
                    ₹{product.price}
                  </span>
                  <span className="text-2xl text-gray-500 line-through">
                    ₹{originalPrice}
                  </span>
                </div>
                <p className="text-sm text-green-600 font-semibold">
                  ✓ You save ₹{originalPrice - product.price}
                </p>
              </div>

              {/* STOCK STATUS */}
              <p className="text-lg font-semibold">
                <span
                  className={`px-3 py-1 rounded-full ${
                    product.inStock
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.inStock ? "✓ In Stock" : "Out of Stock"}
                </span>
              </p>
            </div>

            {/* INFO */}
            <div className="bg-white p-6 rounded-lg shadow space-y-3">
              <p className="text-gray-700">
                <strong className="text-gray-900">Category:</strong>{" "}
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {product.category}
                </span>
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Material:</strong> {product.material}
              </p>
            </div>

            {/* DESCRIPTION */}
            <div className="bg-blue-50 p-6 rounded-lg shadow border border-blue-200">
              <h3 className="font-bold text-lg text-gray-800 mb-3">
                About This Product
              </h3>
              <p className="text-gray-700 leading-relaxed text-base">
                {product.description}
              </p>
            </div>

            {/* COLOR SELECTION */}
            {product.colors && product.colors.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold text-lg text-gray-800 mb-4">
                  Select Color
                </h3>
                <div className="flex gap-3 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-5 py-2 border-2 rounded-lg font-semibold transition ${
                        selectedColor === color
                          ? "border-blue-600 bg-blue-50 text-blue-600 shadow-lg"
                          : "border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SIZE SELECTION */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold text-lg text-gray-800 mb-4">
                  Select Size
                </h3>
                <div className="flex gap-3 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 py-2 border-2 rounded-lg font-semibold transition ${
                        selectedSize === size
                          ? "border-blue-600 bg-blue-50 text-blue-600 shadow-lg"
                          : "border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* QUANTITY */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-lg text-gray-800 mb-4">
                Quantity
              </h3>
              <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg w-fit">
                <button
                  onClick={() =>
                    setQuantity(Math.max(1, quantity - 1))
                  }
                  className="border border-gray-300 p-2 rounded hover:bg-white transition"
                >
                  <Minus className="w-5 h-5" />
                </button>

                <span className="font-bold text-2xl w-8 text-center">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="border border-gray-300 p-2 rounded hover:bg-white transition"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-blue-600 text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg"
              >
                <ShoppingCart className="w-6 h-6" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </button>

              <button className="border-2 border-blue-600 text-blue-600 px-6 py-4 rounded-lg font-bold hover:bg-blue-50 transition flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>

            {/* FEATURES */}
            <div className="bg-white p-6 rounded-lg shadow space-y-4">
              <div className="flex items-start gap-4">
                <Truck className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-800">Free Shipping</h4>
                  <p className="text-sm text-gray-600">
                    On orders over ₹10,000
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <RotateCcw className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-800">Easy Returns</h4>
                  <p className="text-sm text-gray-600">
                    75 days return policy
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Award className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-800">Best Price Guarantee</h4>
                  <p className="text-sm text-gray-600">
                    Up to 40% lower than market
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <div className="mt-20 py-12 border-t border-gray-200">
          <h2 className="text-3xl font-bold mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products
              .filter((p) => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((p) => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/product/${p.id}`)}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer overflow-hidden"
                >
                  <img
                    src={p.images?.[0] || p.image}
                    alt={p.name}
                    className="w-full h-40 object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x300?text=No+Image";
                    }}
                  />
                  <div className="p-4">
                    <h4 className="font-bold text-gray-800 line-clamp-2 mb-2">
                      {p.name}
                    </h4>
                    <p className="text-blue-600 font-bold">₹{p.price}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
