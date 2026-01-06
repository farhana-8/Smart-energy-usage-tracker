import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [email, setEmail] = useState(localStorage.getItem("email"));

  // Login user
  const loginUser = (jwtToken, userEmail) => {
    localStorage.setItem("token", jwtToken);
    localStorage.setItem("email", userEmail);
    setToken(jwtToken);
    setEmail(userEmail);
  };

  // Logout user
  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setToken(null);
    setEmail(null);
    window.location.href = "/login"; // redirect
  };

  // Optional: auto-logout if token becomes invalid on mount
  useEffect(() => {
    if (!token) return;
    // could add token validation here if needed
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, email, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
