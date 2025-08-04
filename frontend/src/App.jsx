import React, { useState } from 'react';
import Navbar from './components/Navbar';
import 'remixicon/fonts/remixicon.css';
import AddProducts from "./Pages/AddProducts";
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import ProductDetail from './Pages/productDetail';
import UserHome from './Pages/usersPage/UserHome';
import UserProductDetail from './Pages/usersPage/UserProductDetail';
import UpdateProduct from './Pages/UpdateProduct';
import Login from './Pages/usersPage/Login'
import About from './Pages/usersPage/About';
import Contact from './Pages/usersPage/Contact';
import UserNav from './Pages/usersPage/UserNav';
import AdminDashboard from './Pages/AdminDashboard';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const AppContent = () => {
  const [cartItems, setCartItems] = useState([]);
  const location = useLocation();
  const { loading } = useAuth();

  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  // Check if current route is admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      {isAdminRoute ? <Navbar /> : <UserNav />}
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

        {/* Admin Side - Protected Routes with Admin Access */}
        <Route path="/admin" element={
          <ProtectedRoute requireAdmin={true}>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/products/add" element={
          <ProtectedRoute requireAdmin={true}>
            <AddProducts />
          </ProtectedRoute>
        } />
        <Route path="/admin/products/detail/:productId" element={
          <ProtectedRoute requireAdmin={true}>
            <ProductDetail />
          </ProtectedRoute>
        } />
        <Route path="/admin/products/update/:productId" element={
          <ProtectedRoute requireAdmin={true}>
            <UpdateProduct />
          </ProtectedRoute>
        } />

      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
