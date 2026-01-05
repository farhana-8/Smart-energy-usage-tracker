// src/services/alertService.js
import api from "./authService"; // reuse the existing api instance with token

export const fetchEnergyAlert = async (email) => {
  const trimmedEmail = email.trim();
  const response = await api.get(`/alerts/${trimmedEmail}`);
  return response.data;
};
