// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useContext } from "react";
// import Landing from "./pages/Landing";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import History from "./pages/History";
// import Rewards from "./pages/Rewards";
// import Tips from "./pages/Tips";
// import MainLayout from "./layouts/MainLayout"
// import AuthLayout from "./layouts/AuthLayout";
// import ProtectedLayout from "./layouts/ProtectedLayout";
// import { AuthProvider, AuthContext } from "./context/AuthContext";

// /* ---------- Private Route ---------- */
// function PrivateRoute() {
//   const { token } = useContext(AuthContext);
//   return token ? <ProtectedLayout /> : <Navigate to="/login" />;
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>
//           {/* ---------- Auth Pages ---------- */}
//           <Route element={<AuthLayout />}>
//             <Route path="/" element={<Landing />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//           </Route>

//           {/* ---------- Protected Pages ---------- */}
//           <Route element={<MainLayout/>}>
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/history" element={<History />} />
//             <Route path="/rewards" element={<Rewards />} />
//             <Route path="/tips" element={<Tips />} />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Rewards from "./pages/Rewards";
import Tips from "./pages/Tips";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { registerLogoutCallback } from "./services/api";

/* ---------- Private Route ---------- */
function PrivateRoute() {
  const { token } = useContext(AuthContext);
  return token ? <ProtectedLayout /> : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      {/* Register global logout for Axios */}
      <AuthContext.Consumer>
        {({ logoutUser }) => {
          registerLogoutCallback(logoutUser);

          return (
            <BrowserRouter>
              <Routes>
                {/* ---------- Auth Pages ---------- */}
                <Route element={<AuthLayout />}>
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Route>

                {/* ---------- Protected Pages ---------- */}
                <Route element={<MainLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/history" element={<History />} />
                  <Route path="/rewards" element={<Rewards />} />
                  <Route path="/tips" element={<Tips />} />
                </Route>

                {/* Optional catch-all redirect to login */}
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </BrowserRouter>
          );
        }}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}
