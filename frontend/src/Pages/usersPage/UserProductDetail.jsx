import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductDetail();
  }, []);

  const getProductDetail = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/products/${productId}`);
      const productData = res.data.product || res.data;
      setProduct(productData);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch product:", err);
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    existingCart.push(product);
    localStorage.setItem("cartItems", JSON.stringify(existingCart));
    alert(`"${product.title}" added to cart! 🛒`);
  };

  const handleBuyNow = () => {
    alert(`Proceeding to buy "${product.title}" 💸`);
  };

  if (loading) return <h2 className="text-center text-xl py-10">Loading...</h2>;
  if (!product) return <h2 className="text-center text-xl py-10 text-red-500">Product not found.</h2>;

  return (
    <div className="min-h-screen bg-green-50 py-12 px-4 md:px-20">
      <div className="bg-white rounded-lg shadow-lg p-8 md:flex gap-10">
        {/* Product Image */}
        <div className="md:w-1/2 mb-6 md:mb-0 flex justify-center items-center">
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-80 object-cover rounded-lg border border-green-200"
            />
          ) : (
            <p className="text-gray-500">No image available</p>
          )}
        </div>

        {/* Product Info */}
        <div className="md:w-1/2">
          <h1 className="text-4xl font-extrabold text-green-800 mb-4">{product.title}</h1>
          <p className="text-gray-700 mb-4 leading-relaxed">{product.description}</p>

          <p className="text-sm text-gray-600 mb-2">
            <strong className="text-green-600">Category:</strong> {product.category}
          </p>

          <h2 className="text-2xl font-bold text-green-700 mb-6">₹{product.price}</h2>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProductDetail;


