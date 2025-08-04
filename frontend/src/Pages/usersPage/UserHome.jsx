import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import plantVideo from "../../assets/plant-video.mp4";
import { API_ENDPOINTS } from "../../config/api"; 
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserHome = () => {
  const [productData, setProductData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_ENDPOINTS.BASE);
      setProductData(res.data.products);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="bg-green-50 border border-green-100 shadow-md rounded-lg overflow-hidden">
          <Skeleton height={192} />
          <div className="p-4">
            <Skeleton height={24} width="80%" />
            <Skeleton height={16} count={2} className="mt-2" />
            <Skeleton height={20} width="60%" className="mt-3" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen font-sans">

      {/* Hero Section with Video Background */}
      <div className="relative h-[90vh] flex items-center justify-center text-white overflow-hidden">
        
        {/* ✅ Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect width='1920' height='1080' fill='%23000'/%3E%3C/svg%3E"
        >
          <source src={plantVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Enhanced Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10"></div>

        {/* Top-left Branding with improved styling */}
        <div className="absolute top-6 md:top-8 left-6 md:left-8 z-20 text-left">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-wider drop-shadow-lg">
            GRE<span className="text-green-400 drop-shadow-md">EN</span> ROOTS
          </h2>
          <p className="text-xs md:text-sm lg:text-base text-white/90 mt-1 md:mt-2 tracking-widest font-medium">
            YOU <span className="text-green-400 font-bold">CAN</span> LIVE OUR LIFE
          </p>
        </div>

        {/* Enhanced Center Text with better typography and animations */}
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            <h3 className="text-sm md:text-base lg:text-lg font-bold text-green-400 mb-3 md:mb-4 tracking-widest uppercase">
              Variety Plants
            </h3>
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-none mb-2 md:mb-3">
              <span className="text-green-500 drop-shadow-2xl">GREEN</span>
            </h1>
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-none text-white drop-shadow-2xl mb-4 md:mb-6">
              ROOTS
            </h1>
            <p className="mt-4 md:mt-6 text-gray-100 max-w-2xl mx-auto text-sm md:text-base lg:text-lg font-light leading-relaxed px-4">
              Discover rare and beautiful plants that bring nature closer to home.
            </p>
            <button className="mt-6 md:mt-8 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 transition-all duration-300 px-8 md:px-10 py-3 md:py-4 rounded-full text-white font-bold text-sm md:text-base shadow-2xl hover:shadow-green-500/25 transform hover:scale-105">
              SHOP NOW
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="bg-white py-16 px-6 lg:px-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-green-700">
          Explore Our Forest Products
        </h2>

        {loading ? (
          <LoadingSkeleton />
        ) : productData.length === 0 ? (
          <p className="text-center text-gray-600">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {productData.map((elem, index) => (
              <div
                className="bg-green-50 border border-green-100 shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                key={index}
              >
                <img
                  src={elem.image}
                  alt={elem.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <Link
                    to={`/products/detail/${elem._id}`}
                    className="text-lg font-bold text-green-800 hover:underline"
                  >
                    {elem.title}
                  </Link>
                  <p className="text-sm text-gray-700 mt-2">{elem.description}</p>
                  <h2 className="text-md font-bold mt-4 text-green-600">
                    Price: ₹{elem.price}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHome;
