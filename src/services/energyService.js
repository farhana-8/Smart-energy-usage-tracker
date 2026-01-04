export const getEnergyHistory = () =>
  api.get("/api/energy/history").then(res => res.data);
