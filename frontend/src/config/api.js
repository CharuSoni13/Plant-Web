// API Configuration
export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'https://plant-web-backend.onrender.com';

// API endpoints
export const API_ENDPOINTS = {
  BASE: API_BASE_URL,
  PRODUCTS: `${API_BASE_URL}/product`,
  USERS: `${API_BASE_URL}/user`,
  AUTH: `${API_BASE_URL}/user`,
}; 