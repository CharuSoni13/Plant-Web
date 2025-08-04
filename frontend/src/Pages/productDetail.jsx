import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct();
  }, [productId]);

  const getProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_ENDPOINTS.PRODUCTS}/${productId}`);
      setProduct(res.data.product);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const loadingToast = toast.loading('Deleting product...');
        await axios.get(`${API_ENDPOINTS.PRODUCTS}/delete/${productId}`);
        toast.dismiss(loadingToast);
        toast.success('Product deleted successfully!');
        navigate("/admin");
      } catch (err) {
        toast.error("Failed to delete product.");
      }
    }
  };

  const handleEdit = () => {
    navigate(`/admin/products/update/${productId}`);
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-20">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 flex justify-center items-center">
            <Skeleton height={288} width={320} />
          </div>
          <div className="flex-1">
            <Skeleton height={36} width="80%" className="mb-4" />
            <Skeleton height={16} count={4} className="mb-4" />
            <Skeleton height={20} width="60%" className="mb-2" />
            <Skeleton height={24} width="40%" className="mb-6" />
            <div className="flex gap-4">
              <Skeleton height={40} width={120} />
              <Skeleton height={40} width={120} />
            </div>
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
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
        Product not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-20">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="flex-1 flex justify-center items-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-full max-w-xs h-72 object-cover rounded border border-green-200"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold text-green-800 mb-4">
              {product.title}
            </h1>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {product.description}
            </p>

            <p className="text-sm text-gray-600 mb-2">
              <strong className="text-green-600">Category:</strong>{" "}
              {product.category}
            </p>

            <h2 className="text-xl font-bold text-green-700 mb-6">
              ₹{product.price}
            </h2>

            <div className="flex gap-4">
              <button
                onClick={handleEdit}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded transition"
              >
                Edit Product
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded transition"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
