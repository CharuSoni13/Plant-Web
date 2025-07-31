import React, { useState } from 'react';
import Navbar from './components/Navbar';
import 'remixicon/fonts/remixicon.css';
import AddProducts from "./Pages/AddProducts";
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import ProductDetail from './Pages/productDetail';
import UserHome from './Pages/usersPage/UserHome';
import UserProductDetail from './Pages/usersPage/UserProductDetail';
import UpdateProduct from './Pages/UpdateProduct';
import Login from './Pages/usersPage/Login'
import About from './Pages/usersPage/About';
import Contact from './Pages/usersPage/Contact';

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  return (
    <div>

      <Routes>
        <Route
          path="/"
          element={<UserHome cartCount={cartItems.length} />}
        />
        <Route
          path="/products/detail/:productId"
          element={<UserProductDetail onAddToCart={handleAddToCart} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin Side */}
        <Route path="/admin" element={<Home />} />
        <Route path="/admin/products/add" element={<AddProducts />} />
        <Route path="/admin/products/detail/:productId" element={<ProductDetail />} />
        <Route path="/admin/products/update/:productId" element={<UpdateProduct />} />

      </Routes>
    </div>
  );
};

export default App;
