import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css';
import './AddProducts.css';
import { API_ENDPOINTS } from '../config/api';
import toast from 'react-hot-toast';

const UpdateProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    getProduct();
  }, [productId]);

  const getProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_ENDPOINTS.PRODUCTS}/${productId}`);
      const prod = res.data.product;
      setProduct(prod);
      setTitle(prod.title);
      setDescription(prod.description);
      setCategory(prod.category);
      setPrice(prod.price);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (updating) return; // Prevent multiple submissions
    
    setUpdating(true);
    const loadingToast = toast.loading('Updating product...');
    
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('price', price);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      await axios.post(`${API_ENDPOINTS.PRODUCTS}/update/${productId}`, formData);
      
      toast.dismiss(loadingToast);
      toast.success('Product updated successfully!');
      
      // Navigate after a short delay to show the success message
      setTimeout(() => {
        navigate('/admin');
      }, 1500);
      
    } catch (err) {
      console.error('Failed to update product:', err);
      toast.dismiss(loadingToast);
      toast.error('Failed to update product. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="formContainer">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="formContainer">
        <div className="text-center">
          <p className="text-red-600">Product not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="formContainer">
      <h2><i className="ri-pencil-line"></i> Update Product</h2>
      <form onSubmit={handleUpdate} className="productForm">
        <div className="formGroup">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            id="title"
            required
            disabled={updating}
          />
        </div>

        <div className="formGroup">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            disabled={updating}
          />
        </div>

        <div className="formGroup">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            disabled={updating}
          ></textarea>
        </div>

        <div className="formGroup">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            disabled={updating}
          />
        </div>

        <div className="formGroup">
          <label htmlFor="price">Price (₹)</label>
          <input
            type="number"
            name="price"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            disabled={updating}
          />
        </div>

        <button 
          type="submit" 
          className="submitBtn"
          disabled={updating}
        >
          {updating ? (
            <>
              <i className="ri-loader-4-line animate-spin"></i> Updating Product...
            </>
          ) : (
            <>
              <i className="ri-upload-2-line"></i> Update Product
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
