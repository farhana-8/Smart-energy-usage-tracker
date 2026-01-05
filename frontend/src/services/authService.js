import api from "./api";

export const login = async (data) => {
  const response = await api.post("/api/auth/login", data);
  return response.data;
};


export const register = (data) => {
  return api.post("/api/auth/register", data).then(res => res.data);
};
