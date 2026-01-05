import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [email, setEmail] = useState(localStorage.getItem("email"));

  const loginUser = (jwtToken, userEmail) => {
    localStorage.setItem("token", jwtToken);
    localStorage.setItem("email", userEmail);

    setToken(jwtToken);
    setEmail(userEmail);
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");

    setToken(null);
    setEmail(null);
  };

  return (
    <AuthContext.Provider value={{ token, email, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
