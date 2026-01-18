import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Phone,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { slides } from "../data/slides";

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Auto slide
  useEffect(() => {
    if (!slides || slides.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleProductClick = (product) => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div>
      {/* ================= HERO SLIDER ================= */}
      <div className="relative h-96 md:h-[600px] overflow-hidden">
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
              <div className="text-center text-white px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8">
                  {slide.subtitle}
                </p>
                <button
                  onClick={() => navigate("/products")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition"
                >
                  Shop Now
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
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full z-20"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={() =>
            setCurrentSlide((currentSlide + 1) % slides.length)
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full z-20"
        >
          <ChevronRight />
        </button>
      </div>

      {/* ================= FEATURED PRODUCTS ================= */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product)}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition hover:scale-105 hover:shadow-xl"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <p className="text-xs text-gray-500 mb-1">
                  {product.category}
                </p>
                <h3 className="text-base font-semibold mb-2">
                  {product.name}
                </h3>
                <p className="text-xl font-bold text-blue-600">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= WHY CHOOSE US ================= */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Quality Products
              </h3>
              <p className="text-gray-600">
                Premium furniture crafted with attention to detail
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                24/7 Support
              </h3>
              <p className="text-gray-600">
                Our team is always here to help you
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Free Delivery
              </h3>
              <p className="text-gray-600">
                Free shipping on orders over $500
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
