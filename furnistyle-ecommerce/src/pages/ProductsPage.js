import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../data/products";

const ProductsPage = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

  const categories = ["All", ...new Set(products.map(p => p.category))];

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
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
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* ================= HEADER ================= */}
      <h1 className="text-4xl font-bold text-center mb-10">
        Our Products
      </h1>

      {/* ================= FILTER BAR ================= */}
      <div className="bg-white shadow rounded-lg p-4 mb-10 grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* CATEGORY FILTER */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        {/* PRICE SORT */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="bg-gray-200 hover:bg-gray-300 rounded-lg px-4 py-2 font-semibold"
        >
          Reset
        </button>
      </div>

      {/* ================= PRODUCT GRID ================= */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition hover:scale-105 hover:shadow-xl group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Details
                  </span>
                </div>

                {product.inStock && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    In Stock
                  </div>
                )}
              </div>

              <div className="p-5">
                <p className="text-sm text-gray-500 mb-1">
                  {product.category}
                </p>
                <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600">
                  {product.name}
                </h3>
                <p className="text-xl font-bold text-blue-600">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
