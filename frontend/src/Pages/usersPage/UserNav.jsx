import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "remixicon/fonts/remixicon.css";

const UserNav = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, signOutUser, isAdmin } = useAuth();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCart);
  }, []);

  const handleRemoveFromCart = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, i) => i !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const handleSignOut = async () => {
    await signOutUser();
    setShowUserMenu(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close user menu if clicking outside
      if (showUserMenu && !event.target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
      // Close cart if clicking outside
      if (showCart && !event.target.closest('.cart-container')) {
        setShowCart(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu, showCart]);

  return (
    <nav className="bg-green-900 text-white px-6 py-4 flex flex-wrap justify-between items-center shadow-md relative z-50">
    
      <Link
        to="/"
        className="text-2xl font-bold tracking-wide hover:text-green-300 transition"
      >
        🌿 GreenRoots
      </Link>

      <div className="flex items-center gap-6 mt-3 md:mt-0">
        <Link to="/" className="hover:text-green-300 transition">Home</Link>
        <Link to="/about" className="hover:text-green-300 transition">About</Link>
        <Link to="/contact" className="hover:text-green-300 transition">Contact</Link>
        
        
        
        
        {user ? (
          <div className="relative user-menu-container">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 hover:text-green-300 transition focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                <i className="ri-user-line text-sm"></i>
              </div>
              <div className="hidden md:flex md:flex-col md:items-start">
                <span className="text-sm font-medium">
                  {user.displayName || user.email}
                </span>
                {isAdmin() && (
                  <span className="text-xs bg-yellow-500 text-black px-2 py-0.5 rounded-full">
                    Admin
                  </span>
                )}
              </div>
              <i className="ri-arrow-down-s-line"></i>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-xl border border-green-200 z-50">
                <div className="p-3 border-b border-gray-200">
                  <p className="font-medium text-sm">{user.displayName || 'User'}</p>
                  {isAdmin() && (
                    <span className="inline-block mt-1 text-xs bg-yellow-500 text-black px-2 py-0.5 rounded-full">
                      Admin
                    </span>
                  )}
                </div>
                <div className="p-2">
                  {isAdmin() && (
                    <Link
                      to="/admin"
                      className="w-full text-left px-3 py-2 text-sm hover:bg-yellow-100 rounded flex items-center gap-2"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <i className="ri-dashboard-line"></i>
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center gap-2"
                  >
                    <i className="ri-logout-box-r-line"></i>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="hover:text-green-300 transition flex items-center gap-1">
            <i className="ri-login-circle-line"></i>
            <span className="hidden md:block">Login</span>
          </Link>
        )}

        <div className="relative cart-container">
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative focus:outline-none"
          >
            <i className="ri-shopping-cart-2-line text-2xl hover:text-green-300"></i>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full px-1.5">
                {cartItems.length}
              </span>
            )}
          </button>

          {showCart && (
            <div className="absolute right-0 mt-4 w-80 max-h-96 overflow-y-auto bg-white text-black rounded-lg shadow-xl border border-green-200 z-50">
              <div className="p-4">
                <h3 className="text-lg font-bold mb-3 text-green-700">🛒 Cart Items</h3>
                {cartItems.length === 0 ? (
                  <p className="text-sm text-gray-500">Your cart is empty.</p>
                ) : (
                  <ul className="space-y-3">
                    {cartItems.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-3 border-b pb-2"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-14 h-14 object-cover rounded border"
                        />
                        <div className="flex-grow">
                          <p className="font-medium text-sm">{item.title}</p>
                          <p className="text-sm text-gray-600">₹{item.price}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveFromCart(index)}
                          className="text-red-500 hover:text-red-700"
                          title="Remove"
                        >
                          <i className="ri-close-line text-xl"></i>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default UserNav;
