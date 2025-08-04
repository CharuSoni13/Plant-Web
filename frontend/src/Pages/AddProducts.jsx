import React, { useState } from 'react';
import axios from 'axios';
import './AddProducts.css';
import { useNavigate } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';

const AddProducts = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      setError('Please select an image.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('image', imageFile); // must match backend multer field name
      formData.append('description', description);
      formData.append('category', category);
      formData.append('price', price);

      // If your backend requires any auth headers, include them here.
      const res = await axios.post(
        'https://plant-web-backend.onrender.com/products/add',
        formData,
        {
          headers: {
            // axios will normally set the proper multipart/form-data boundary automatically,
            // but you can include this if your backend expects it explicitly.
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Add product response:', res.data);
      navigate('/admin');
    } catch (err) {
      console.error('Error submitting product:', err);
      setError(
        err.response?.data?.message ||
          'Failed to add product. Check console / network and backend logs.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <h2>
        <i className="ri-plant-line"></i> Add New Product
      </h2>
      <form onSubmit={handleSubmit} className="productForm" encType="multipart/form-data">
        <div className="formGroup">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Enter product title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            id="title"
            required
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
            required
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
            onChange={(e) => setDescription(e.target.value)}
            required
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
            onChange={(e) => setCategory(e.target.value)}
            required
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
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            step="0.01"
          />
        </div>

        {error && <div className="errorMsg">{error}</div>}

        <button type="submit" className="submitBtn" disabled={loading}>
          {loading ? (
            <>
              <i className="ri-loader-4-line ri-spin"></i> Submitting...
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
