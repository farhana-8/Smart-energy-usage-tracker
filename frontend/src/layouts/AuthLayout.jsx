import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar variant="auth" />

      {/* Page Content */}
      <div className="flex-1">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
