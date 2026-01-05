import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const fetchEnergyAlert = async (email) => {
  const response = await api.get(`/alerts/${email}`);
  return response.data;
};
