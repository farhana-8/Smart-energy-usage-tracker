// src/services/authService.js
import axios from "axios";

// Create Axios instance with base URL and default JSON headers
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401/403 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      localStorage.clear(); // clear token/email if unauthorized
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// LOGIN
export const login = async (data) => {
  // Trim fields before sending
  const payload = {
    email: data.email.trim(),
    password: data.password.trim(),
  };
  const response = await api.post("/api/auth/login", payload);
  return response.data;
};

// REGISTER
export const register = async (data) => {
  // Trim fields before sending
  const payload = {
    email: data.email.trim(),
    password: data.password.trim(),
  };
  const response = await api.post("/api/auth/register", payload);
  return response.data;
};

export default api;
