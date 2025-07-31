import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/");
      setProductData(res.data.products);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="px-6 py-10">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-10">Admin Product Dashboard</h1>

        {productData.length === 0 ? (
          <p className="text-center text-gray-500">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {productData.map((elem, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
              >
                <img
                  src={elem.image}
                  alt={elem.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <Link
                    to={`products/detail/${elem._id}`}
                    className="text-lg font-semibold text-green-700 hover:underline"
                  >
                    {elem.title}
                  </Link>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{elem.description}</p>
                  <h2 className="text-md font-bold mt-3 text-green-600">Price: ₹{elem.price}</h2>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
