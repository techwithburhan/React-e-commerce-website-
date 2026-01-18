import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { products } from "../data/products";

const ProductsPage = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

  const categories = ["All", ...new Set(products.map(p => p.category))];

  // ✅ FIXED: Changed from /products/:id to /product/:id
  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  // 🔥 FILTER + SEARCH + SORT LOGIC
  const filteredProducts = products
    .filter((product) =>
      category === "All" ? true : product.category === category
    )
    .filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* ================= HEADER ================= */}
        <h1 className="text-4xl font-bold text-center mb-10">
          Our Products
        </h1>

        {/* ================= FILTER BAR ================= */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-10 grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* CATEGORY FILTER */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          {/* PRICE SORT */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sort by Price</option>
            <option value="low">Low → High</option>
            <option value="high">High → Low</option>
          </select>

          {/* RESET */}
          <button
            onClick={() => {
              setSearch("");
              setCategory("All");
              setSort("");
            }}
            className="bg-gray-200 hover:bg-gray-300 rounded-lg px-4 py-2 font-semibold transition"
          >
            Reset Filters
          </button>
        </div>

        {/* RESULTS COUNT */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-bold">{filteredProducts.length}</span> products
          </p>
        </div>

        {/* ================= PRODUCT GRID ================= */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">
              No products found. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                {/* IMAGE CONTAINER */}
                <div 
                  className="relative overflow-hidden h-64 bg-gray-200 cursor-pointer"
                  onClick={() => handleProductClick(product.id)}
                >
                  <img
                    src={product.images?.[0] || product.image || "https://via.placeholder.com/400x300?text=No+Image"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                    }}
                  />

                  {/* OVERLAY EFFECT */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View Details
                    </span>
                  </div>

                  {/* STOCK BADGE */}
                  {product.inStock && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                      In Stock
                    </div>
                  )}

                  {/* WISHLIST BUTTON */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="absolute top-3 left-3 bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition opacity-0 group-hover:opacity-100"
                  >
                    <Heart className="w-5 h-5 text-gray-600 hover:text-red-600" />
                  </button>
                </div>

                {/* PRODUCT INFO */}
                <div className="p-4">
                  <p className="text-xs text-gray-500 mb-1 uppercase font-semibold">
                    {product.category}
                  </p>
                  <h3 
                    className="text-lg font-bold mb-2 group-hover:text-blue-600 transition cursor-pointer line-clamp-2"
                    onClick={() => handleProductClick(product.id)}
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs text-gray-600 mb-3">
                    {product.material}
                  </p>

                  {/* RATING */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">(120)</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xl font-bold text-blue-600">
                      ₹{product.price}
                    </p>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      {product.inStock ? "Available" : "Out of Stock"}
                    </span>
                  </div>

                  {/* COLOR PREVIEW */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs text-gray-600 mb-1">Colors:</p>
                      <div className="flex gap-2">
                        {product.colors.slice(0, 3).map((color) => (
                          <div
                            key={color}
                            className="w-5 h-5 rounded-full border-2 border-gray-300"
                            title={color}
                            style={{
                              backgroundColor:
                                color === "Black"
                                  ? "#000"
                                  : color === "White"
                                    ? "#fff"
                                    : color === "Gray"
                                      ? "#999"
                                      : color === "Blue"
                                        ? "#3b82f6"
                                        : color === "Brown"
                                          ? "#8B4513"
                                          : color === "Beige"
                                            ? "#F5E6D3"
                                            : color === "Red"
                                              ? "#ef4444"
                                              : color === "Walnut"
                                                ? "#654321"
                                                : color === "Oak"
                                                  ? "#D2B48C"
                                                  : color === "Chrome"
                                                    ? "#E8E8E8"
                                                    : "#ddd",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ACTION BUTTONS */}
                  <button
                    onClick={() => handleProductClick(product.id)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    View & Buy
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
