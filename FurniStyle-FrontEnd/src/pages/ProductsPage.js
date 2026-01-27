import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Star } from "lucide-react";
import axios from "axios";

const API_URL = "http://localhost:5001/api/products";

/* ================= HELPER: RANDOM IMAGE (STABLE) ================= */
const getRandomImage = (images = []) => {
  if (!images.length) {
    return "https://via.placeholder.com/400x300?text=No+Image";
  }
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

const ProductsPage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await axios.get(API_URL);

        // ✅ IMPORTANT FIX: API returns { success, data }
        const apiProducts = res.data?.data || [];

        // ✅ Attach ONE random image per product (stable)
        const productsWithImage = apiProducts.map((p) => ({
          ...p,
          displayImage: getRandomImage(p.images),
        }));

        setProducts(productsWithImage);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* ================= CATEGORIES ================= */
  const categories = [
    "All",
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  /* ================= FILTER + SORT ================= */
  const filteredProducts = products
    .filter((p) =>
      category === "All" ? true : p.category === category
    )
    .filter((p) =>
      p.name?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return 0;
    });

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-16">

        {/* HEADER */}
        <h1 className="text-4xl font-bold text-center mb-2">
          Our Products
        </h1>

        <p className="text-center text-gray-600 mb-10">
          Showing <span className="font-bold">{filteredProducts.length}</span> products
        </p>

        {/* FILTER BAR */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-10 grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="">Sort by Price</option>
            <option value="low">Low → High</option>
            <option value="high">High → Low</option>
          </select>

          <button
            onClick={() => {
              setSearch("");
              setCategory("All");
              setSort("");
            }}
            className="bg-gray-200 rounded-lg font-semibold"
          >
            Reset
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-center text-gray-600 py-20">
            Loading products...
          </p>
        )}

        {/* ERROR */}
        {error && (
          <p className="text-center text-red-600 py-20">
            {error}
          </p>
        )}

        {/* PRODUCTS GRID */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden group"
              >
                {/* IMAGE */}
                <div
                  className="relative h-64 bg-gray-200 cursor-pointer"
                  onClick={() => handleProductClick(product._id)}
                >
                  <img
                    src={product.displayImage}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x300?text=No+Image";
                    }}
                  />

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100">
                      View Details
                    </span>
                  </div>

                  {product.inStock && (
                    <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                      In Stock
                    </span>
                  )}

                  <button className="absolute top-3 left-3 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                {/* INFO */}
                <div className="p-4">
                  <p className="text-xs uppercase text-gray-500 mb-1">
                    {product.category}
                  </p>

                  <h3
                    className="font-bold mb-1 cursor-pointer"
                    onClick={() => handleProductClick(product._id)}
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs text-gray-600 mb-2">
                    {product.material}
                  </p>

                  {/* RATING */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <span className="text-xs text-gray-500">(120)</span>
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <p className="text-xl font-bold text-blue-600">
                      ₹{product.price}
                    </p>
                    <span className="text-xs bg-green-100 px-2 py-1 rounded">
                      Available
                    </span>
                  </div>

                  <button
                    onClick={() => handleProductClick(product._id)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
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
