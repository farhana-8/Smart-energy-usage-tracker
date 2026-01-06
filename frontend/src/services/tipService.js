import api from "./api";

export const fetchTips = () =>
  api.get("/api/tips").then(res => res.data);

export const fetchTipOfTheDay = () =>
  api.get("/api/tips/today").then(res => res.data);
