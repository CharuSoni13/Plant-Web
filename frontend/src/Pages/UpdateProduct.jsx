import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css';
import './AddProducts.css';

const UpdateProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/products/${productId}`)
      .then(res => {
        const prod = res.data.product;
        setProduct(prod);
        setTitle(prod.title);
        setDescription(prod.description);
        setCategory(prod.category);
        setPrice(prod.price);
      })
      .catch(err => console.error(err));
  }, [productId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('price', price);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      await axios.post(`http://localhost:3000/products/update/${productId}`, formData);
      alert('Product updated successfully!');
      navigate('/admin');
    } catch (err) {
      console.error('Failed to update product:', err);
    }
  };

  if (!product) return <p>Loading...</p>;

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
          />
        </div>

        <button type="submit" className="submitBtn">
          <i className="ri-upload-2-line"></i> Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
