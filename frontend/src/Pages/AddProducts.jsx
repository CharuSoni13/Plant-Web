import React, { useState } from 'react';
import axios from 'axios';
import './AddProducts.css';
import { useNavigate } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import { API_ENDPOINTS } from '../config/api';
import toast from 'react-hot-toast';

const AddProducts = () => {
  const navigate = useNavigate();
  const [title, settitle] = useState('');
  const [image, setimage] = useState('');
  const [description, setdescription] = useState('');
  const [category, setcategory] = useState('');
  const [price, setprice] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (loading) return; // Prevent multiple submissions
    
    setLoading(true);
    const loadingToast = toast.loading('Adding product...');
    
    try {
      let formData = new FormData(e.target);
      const res = await axios.post(`${API_ENDPOINTS.PRODUCTS}/add`, formData);
      
      toast.dismiss(loadingToast);
      toast.success('Product added successfully!');
      
      // Reset form
      settitle('');
      setimage('');
      setdescription('');
      setcategory('');
      setprice('');
      
      // Navigate after a short delay to show the success message
      setTimeout(() => {
        navigate('/admin');
      }, 1500);
      
    } catch (err) {
      console.log(err);
      toast.dismiss(loadingToast);
      toast.error('Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <h2><i className="ri-plant-line"></i> Add New Product</h2>
      <form onSubmit={handleSubmit} className="productForm">
        <div className="formGroup">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Enter product title"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            name="title"
            id="title"
            required
            disabled={loading}
          />
        </div>

        <div className="formGroup">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={(e) => setimage(e.target.files[0])}
            required
            disabled={loading}
          />
        </div>

        <div className="formGroup">
          <label htmlFor="description">Description</label>
          <textarea
            placeholder="Enter product description"
            name="description"
            id="description"
            rows="3"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            required
            disabled={loading}
          ></textarea>
        </div>

        <div className="formGroup">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            placeholder="Enter product category"
            name="category"
            id="category"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="formGroup">
          <label htmlFor="price">Price (₹)</label>
          <input
            type="number"
            placeholder="Enter product price"
            name="price"
            id="price"
            value={price}
            onChange={(e) => setprice(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <button 
          type="submit" 
          className="submitBtn"
          disabled={loading}
        >
          {loading ? (
            <>
              <i className="ri-loader-4-line animate-spin"></i> Adding Product...
            </>
          ) : (
            <>
              <i className="ri-upload-cloud-2-line"></i> Submit Product
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProducts;



