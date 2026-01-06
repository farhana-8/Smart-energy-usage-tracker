// src/services/alertService.js
import api from "./authService"; // reuse the existing api instance with token

export const fetchEnergyAlert = async (email) => {
  try {
    const response = await api.get(`/alerts/${email.trim()}`);
    return response.data;
  } catch (err) {
    if (err.response?.status === 403) {
      console.log("No alerts available.");
      return ""; // empty state for 403
    }
    throw err; // other errors propagate
  }
};