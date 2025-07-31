import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserNav from "./UserNav";
import plantImage from "../../assets/plant-image.jpg"; 

const UserHome = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/");
      setProductData(res.data.products);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  return (
    <div className="min-h-screen font-sans">
      <UserNav />

      {/* Hero Section with Image Background */}
      <div className="relative h-[100vh] flex items-center justify-center text-white overflow-hidden">
        
        {/* ✅ Background Image */}
        <img
          src={plantImage}
          alt="Green Roots Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10"></div>

        {/* Top-left Branding */}
        <div className="absolute top-6 left-8 z-20 text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-wide">
            GRE<span className="text-green-400">EN</span> ROOTS
          </h2>
          <p className="text-sm text-white mt-1 tracking-wider">
            YOU <span className="text-green-400">CAN</span> LIVE OUR LIFE
          </p>
        </div>

        {/* Center Text */}
        <div className="relative z-20 text-center px-4">
          <h3 className="text-sm md:text-base font-semibold text-green-400 mb-2 tracking-wider">
            VARIETY PLANTS
          </h3>
          <h1 className="text-7xl font-extrabold leading-none">
            <span className="text-green-500">GRE</span>
            <span className="text-white">EN</span>
          </h1>
          <h1 className="text-7xl font-extrabold mt-2 text-green-500">ROOTS</h1>
          <p className="mt-6 text-gray-200 max-w-xl mx-auto text-base font-light">
            Discover rare and beautiful plants that bring nature closer to home.
          </p>
          <button className="mt-8 bg-green-600 hover:bg-green-500 transition px-8 py-3 rounded-full text-white font-semibold shadow-md">
            SHOP NOW
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="bg-white py-12 px-6 lg:px-20">
        <h2 className="text-3xl font-bold text-center mb-10 text-green-700">
          Explore Our Forest Products
        </h2>

        {productData.length === 0 ? (
          <p className="text-center text-gray-600">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {productData.map((elem, index) => (
              <div
                className="bg-green-50 border border-green-100 shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all"
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
