import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "remixicon/fonts/remixicon.css";

const UserNav = ({ searchQuery, setSearchQuery }) => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCart);
  }, []);

  const handleRemoveFromCart = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, i) => i !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  return (
    <nav className="bg-green-900 text-white px-6 py-4 flex flex-wrap justify-between items-center shadow-md relative z-50">
    
      <Link
        to="/"
        className="text-2xl font-bold tracking-wide hover:text-green-300 transition"
      >
        🌿 GreenRoots
      </Link>


      <div className="w-full md:w-1/3 mt-3 md:mt-0 md:mx-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search plants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-full text-black outline-none focus:ring-2 focus:ring-green-500"
          />
          <i className="ri-search-line absolute right-4 top-2.5 text-gray-600"></i>
        </div>
      </div>

    
      <div className="flex items-center gap-6 mt-3 md:mt-0">
        <Link to="/" className="hover:text-green-300 transition">Home</Link>
        <Link to="/about" className="hover:text-green-300 transition">About</Link>
        <Link to="/contact" className="hover:text-green-300 transition">Contact</Link>
        
        <Link to="/login" className="hover:text-green-300 transition">Login</Link>

        <div className="relative">
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
