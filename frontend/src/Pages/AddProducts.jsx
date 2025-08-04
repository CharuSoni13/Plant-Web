import React, { useState } from 'react';
import axios from 'axios';
import './AddProducts.css';
import { useNavigate } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import toast from 'react-hot-toast';

const AddProducts = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!image) {
      toast.error('Please select an image.');
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading('Adding product...');

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('image', image); // backend expects field name "image"
      formData.append('description', description);
      formData.append('category', category);
      formData.append('price', price);

      const res = await axios.post(
        'https://plant-web-backend.onrender.com/products/add',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      toast.dismiss(loadingToast);
      toast.success('Product added successfully!');

      // reset form
      setTitle('');
      setImage(null);
      setDescription('');
      setCategory('');
      setPrice('');

      // navigate back to admin list
      setTimeout(() => navigate('/admin'), 1000);
    } catch (err) {
      console.error('Submit error:', err);
      toast.dismiss(loadingToast);
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Failed to add product. Check backend logs.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <h2>
        <i className="ri-plant-line"></i> Add New Product
      </h2>
      <form
        onSubmit={handleSubmit}
        className="productForm"
        encType="multipart/form-data"
      >
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
            onChange={(e) => setImage(e.target.files[0])}
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
            onChange={(e) => setDescription(e.target.value)}
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
            onChange={(e) => setCategory(e.target.value)}
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
            onChange={(e) => setPrice(e.target.value)}
            required
            disabled={loading}
            min="0"
            step="0.01"
          />
        </div>

        <button type="submit" className="submitBtn" disabled={loading}>
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

