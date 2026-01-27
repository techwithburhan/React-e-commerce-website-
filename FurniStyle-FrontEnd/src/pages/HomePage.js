import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Phone,
  Truck,
  RotateCcw,
  Award,
  Zap,
  Star,
  Heart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Hero slides data
  const slides = [
    {
      id: 1,
      title: "Save Up to 75% OFF",
      subtitle: "Premium Furniture for Your Dream Home",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=600&fit=crop",
      buttonText: "Shop Now"
    },
    {
      id: 2,
      title: "New Launches",
      subtitle: "Explore Latest Collection of Sofas & Beds",
      image: "https://images.unsplash.com/photo-1540932239986-310128078ceb?w=1200&h=600&fit=crop",
      buttonText: "Explore"
    },
    {
      id: 3,
      title: "Luxury Dining Sets",
      subtitle: "Transform Your Dining Experience",
      image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&h=600&fit=crop",
      buttonText: "View Collection"
    },
  ];

  // Fetch products from backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5001/api/products');
        
        if (response.data.success) {
          setProducts(response.data.data);
          setError(null);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Get unique categories from products
  const categories = products.length > 0 
    ? ["All", ...new Set(products.map((p) => p.category))]
    : ["All", "Living Room", "Dining Room", "Bedroom", "Office"];

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (product) => {
    alert(`${product.name} added to cart!`);
  };

  // Filter products by category
  const filteredProducts =
    selectedCategory === "All"
      ? products.slice(0, 8)
      : products.filter((p) => p.category === selectedCategory).slice(0, 8);

  return (
    <div className="bg-white">
      {/* ================= HERO SLIDER ================= */}
      <div className="relative h-96 md:h-[600px] overflow-hidden bg-gray-900">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white px-4 max-w-2xl">
                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-100">
                  {slide.subtitle}
                </p>
                <button
                  onClick={() => navigate("/products")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg text-lg font-semibold transition shadow-lg"
                >
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* SLIDER CONTROLS */}
        <button
          onClick={() =>
            setCurrentSlide(
              (currentSlide - 1 + slides.length) % slides.length
            )
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full z-20 transition shadow-lg"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() =>
            setCurrentSlide((currentSlide + 1) % slides.length)
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full z-20 transition shadow-lg"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* SLIDER DOTS */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide ? "bg-white w-8" : "bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ================= FEATURES BAR ================= */}
      <div className="bg-blue-50 py-8 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <Truck className="w-8 h-8 text-blue-600 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-800">Free Shipping</h4>
              <p className="text-sm text-gray-600">On orders over ₹10,000</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-center md:text-left">
            <RotateCcw className="w-8 h-8 text-blue-600 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-800">Easy Returns</h4>
              <p className="text-sm text-gray-600">75 days return policy</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-center md:text-left">
            <Award className="w-8 h-8 text-blue-600 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-800">Best Price</h4>
              <p className="text-sm text-gray-600">Up to 40% lower prices</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-center md:text-left">
            <Zap className="w-8 h-8 text-blue-600 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-800">5 Yr Warranty</h4>
              <p className="text-sm text-gray-600">Peace of mind guaranteed</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SHOP BY CATEGORY ================= */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Shop by Category
        </h2>

        <div className="flex gap-3 flex-wrap mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 mt-4">Loading products...</p>
          </div>
        )}

        {/* ERROR STATE */}
        {error && !loading && (
          <div className="text-center py-20">
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Retry
            </button>
          </div>
        )}

        {/* FEATURED PRODUCTS GRID */}
        {!loading && !error && (
          <>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-600 text-lg">No products found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  >
                    {/* IMAGE CONTAINER */}
                    <div className="relative h-64 bg-gray-200 overflow-hidden cursor-pointer">
                      <img
                        src={product.image || "https://via.placeholder.com/400x300?text=No+Image"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onClick={() => handleProductClick(product._id)}
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                        }}
                      />

                      {/* OVERLAY */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                        <button
                          onClick={() => handleProductClick(product._id)}
                          className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Quick View
                        </button>
                      </div>

                      {/* CATEGORY BADGE */}
                      <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {product.category}
                      </div>

                      {/* WISHLIST BUTTON */}
                      <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Heart className="w-5 h-5 text-gray-600 hover:text-red-600" />
                      </button>
                    </div>

                    {/* PRODUCT INFO */}
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1 text-gray-800 line-clamp-2">
                        {product.name}
                      </h3>

                      <p className="text-xs text-gray-500 mb-2 line-clamp-1">
                        {product.description}
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

                      {/* PRICE */}
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-2xl font-bold text-blue-600">
                            ₹{product.price}
                          </p>
                          <p className="text-xs text-gray-500 line-through">
                            ₹{Math.round(product.price * 1.5)}
                          </p>
                        </div>
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded font-semibold">
                          40% OFF
                        </span>
                      </div>

                      {/* ADD TO CART */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* VIEW ALL BUTTON */}
            {filteredProducts.length > 0 && (
              <div className="text-center mt-12">
                <button
                  onClick={() => navigate("/products")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-lg font-semibold transition shadow-lg"
                >
                  View All Products
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* ================= WHY CHOOSE US ================= */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Furnishka
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                Premium Quality
              </h3>
              <p className="text-gray-600">
                Crafted with real Sheesham wood and premium materials for durability and elegance
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                Affordable Prices
              </h3>
              <p className="text-gray-600">
                Factory-direct model ensures wholesale prices without middlemen markups
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                24/7 Support
              </h3>
              <p className="text-gray-600">
                Expert team always available to help with selection and service
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TESTIMONIALS ================= */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Customer Reviews
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "Amazing quality furniture at great prices. The delivery was quick and the team was very helpful throughout the process."
                </p>
                <p className="font-semibold text-gray-800">
                  Customer {i} - Bangalore
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= CTA SECTION ================= */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Home?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Explore our premium furniture collection with up to 75% discount
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-lg"
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;