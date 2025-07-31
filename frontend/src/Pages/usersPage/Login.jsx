import React, { useState } from 'react';
import './Login.css';
import 'remixicon/fonts/remixicon.css';

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="plant-login-container">
      <div className="form-wrapper">
        <div className="toggle-buttons">
          <button
            className={isLogin ? 'active' : ''}
            onClick={() => setIsLogin(true)}
          >
            <i className="ri-login-circle-line"></i> Login
          </button>
          <button
            className={!isLogin ? 'active' : ''}
            onClick={() => setIsLogin(false)}
          >
            <i className="ri-user-add-line"></i> Sign Up
          </button>
        </div>

        <div className="form-content">
          {isLogin ? (
            <form className="form-box">
              <h2 className="form-title">Welcome Back 🌿</h2>
              <input type="text" placeholder="Username" required />
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <a href="/" className="forgot-link">Forgot Password?</a>
              <button type="submit" className="submit-btn">Login</button>
              <p className="form-footer">
                Not a member?{' '}
                <span onClick={() => setIsLogin(false)} className="link-text">
                  Sign Up Now
                </span>
              </p>
            </form>
          ) : (
            <form className="form-box">
              <h2 className="form-title">Join Green Roots 🌱</h2>
              <input type="text" placeholder="Create Username" required />
              <input type="email" placeholder="Email Address" required />
              <input type="password" placeholder="Password" required />
              <input type="password" placeholder="Confirm Password" required />
              <button type="submit" className="submit-btn">Sign Up</button>
              <p className="form-footer">
                Already have an account?{' '}
                <span onClick={() => setIsLogin(true)} className="link-text">
                  Login
                </span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

