import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import 'remixicon/fonts/remixicon.css';

const Navbar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, signOutUser, isAdmin } = useAuth();

  const handleSignOut = async () => {
    await signOutUser();
    setShowUserMenu(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu]);

  // Get display name - show first name only in compact view
  const getDisplayName = () => {
    if (!user) return '';
    
    const fullName = user.displayName || user.email;
    if (fullName.includes(' ')) {
      return fullName.split(' ')[0]; // Show only first name
    }
    return fullName;
  };

  // Get full name for dropdown
  const getFullName = () => {
    if (!user) return '';
    return user.displayName || user.email;
  };

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

        {/* Right Side - User Menu and Add Product */}
        <div className="navbar-right">
          <Link to="/admin/products/add" className="navbar-btn">
            <i className="ri-add-line"></i> Add Product
          </Link>
          
          {user && (
            <div className="user-menu-container">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="user-menu-btn"
              >
                <div className="user-avatar">
                  <i className="ri-user-line"></i>
                </div>
                <div className="user-info">
                  <span className="user-name">{getDisplayName()}</span>
                  {isAdmin() && (
                    <span className="admin-badge">Admin</span>
                  )}
                </div>
                <i className="ri-arrow-down-s-line"></i>
              </button>

              {showUserMenu && (
                <div className="user-dropdown">
                  <div className="user-dropdown-header">
                    <p className="user-dropdown-name">{getFullName()}</p>
                    <p className="user-dropdown-email">{user.email}</p>
                    {isAdmin() && (
                      <span className="admin-badge-dropdown">Admin</span>
                    )}
                  </div>
                  <div className="user-dropdown-menu">
                    <Link
                      to="/admin/dashboard"
                      className="dropdown-item"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <i className="ri-dashboard-line"></i>
                      Admin Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="dropdown-item"
                    >
                      <i className="ri-logout-box-r-line"></i>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

