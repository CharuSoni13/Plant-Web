import React, { useState } from 'react';
import axios from 'axios';
import './AddProducts.css';
import { useNavigate } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';

const AddProducts = () => {
  const navigate = useNavigate();
  const [title, settitle] = useState('');
  const [image, setimage] = useState('');
  const [description, setdescription] = useState('');
  const [category, setcategory] = useState('');
  const [price, setprice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    axios
      .post('https://plant-web-backend.onrender.com/product/add', formData)
      .then((res) => {
        console.log(res);
        navigate('/admin');
      })
      .catch((err) => {
        console.log(err);
      });
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
          />
        </div>

        <button type="submit" className="submitBtn">
          <i className="ri-upload-cloud-2-line"></i> Submit Product
        </button>
      </form>
    </div>
  );
};

export default AddProducts;



