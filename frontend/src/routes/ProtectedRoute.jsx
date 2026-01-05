import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";

const ProtectedLayout = () => {
  const { logout } = useAuth();

  return (
    <>
      <Navbar />
      <main style={{ padding: "20px" }}>
        <button onClick={logout}>Logout</button>
        <Outlet />
      </main>
    </>
  );
};

export default ProtectedLayout;
