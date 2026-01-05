import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Rewards from "./pages/Rewards";
import Tips from "./pages/Tips";
import MainLayout from "./layouts/MainLayout"
import AuthLayout from "./layouts/AuthLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import { AuthProvider, AuthContext } from "./context/AuthContext";

/* ---------- Private Route ---------- */
function PrivateRoute() {
  const { token } = useContext(AuthContext);
  return token ? <ProtectedLayout /> : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ---------- Auth Pages ---------- */}
          <Route element={<AuthLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* ---------- Protected Pages ---------- */}
          <Route element={<MainLayout/>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/tips" element={<Tips />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
