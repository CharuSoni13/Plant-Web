import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/api";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductDetail();
  }, [productId]);

  const getProductDetail = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_ENDPOINTS.PRODUCTS}/${productId}`);
      const productData = res.data.product || res.data;
      setProduct(productData);
    } catch (err) {
      console.error("Failed to fetch product:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    existingCart.push(product);
    localStorage.setItem("cartItems", JSON.stringify(existingCart));
    toast.success(`"${product.title}" added to cart! 🛒`);
  };

  const handleBuyNow = () => {
    toast.success(`Proceeding to buy "${product.title}" 💸`);
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="min-h-screen bg-green-50 py-12 px-4 md:px-20">
      <div className="bg-white rounded-lg shadow-lg p-8 md:flex gap-10">
        <div className="md:w-1/2 mb-6 md:mb-0 flex justify-center items-center">
          <Skeleton height={320} width={400} />
        </div>
        <div className="md:w-1/2">
          <Skeleton height={48} width="80%" className="mb-4" />
          <Skeleton height={16} count={4} className="mb-4" />
          <Skeleton height={20} width="60%" className="mb-2" />
          <Skeleton height={32} width="40%" className="mb-6" />
          <div className="flex gap-4">
            <Skeleton height={40} width={120} />
            <Skeleton height={40} width={120} />
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Product not found</h2>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

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


