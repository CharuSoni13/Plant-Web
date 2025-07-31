import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${productId}`)
      .then((res) => setProduct(res.data.product))
      .catch((err) => console.error(err));
  }, [productId]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await axios.get(`http://localhost:3000/products/delete/${productId}`);
      navigate("/admin");
    }
  };

  const handleEdit = () => {
    navigate(`/admin/products/update/${productId}`);
  };

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
        Loading...
      </div>
    );

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
            <h1 className="text-3xl font-extrabold text-green-800 mb-4">{product.title}</h1>
            <p className="text-gray-700 mb-4 leading-relaxed">{product.description}</p>

            <p className="text-sm text-gray-600 mb-2">
              <strong className="text-green-600">Category:</strong> {product.category}
            </p>

            <h2 className="text-xl font-bold text-green-700 mb-6">₹{product.price}</h2>

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
