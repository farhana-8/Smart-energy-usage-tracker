import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function ProtectedLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar variant="protected" />

      {/* Page Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
