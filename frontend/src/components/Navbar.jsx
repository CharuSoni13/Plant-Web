import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <i className="ri-leaf-line"></i>
            <span className="brand">Green<span className="highlight">Roots</span></span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="navbar-search">
          <input type="text" placeholder="Search products..." />
          <i className="ri-search-line search-icon"></i>
        </div>

        {/* Right Side - Add Product Link */}
        <div className="navbar-right">
          <Link to="/admin/products/add" className="navbar-btn">
            <i className="ri-add-line"></i> Add Product
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

