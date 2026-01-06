import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

let logoutCallback = null;
export const registerLogoutCallback = (callback) => {
  logoutCallback = callback;
};

// Request interceptor: attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor: global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      // token invalid → logout
      if (logoutCallback) logoutCallback();
    }
    // 403 → do nothing (allow components to handle empty/permission)
    return Promise.reject(error);
  }
);

export default api;