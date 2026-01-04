export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const loginUser = () => {
  localStorage.setItem("token", "dummy-token");
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};
