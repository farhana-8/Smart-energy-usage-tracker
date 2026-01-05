import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { Sun, Moon, Menu, X, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ variant = "protected" }) {
  const { logoutUser } = useContext(AuthContext);
  const { dark, setDark } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = () => {
    logoutUser();
    setOpen(false);
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg text-gray-900 dark:text-white px-6 py-4 flex justify-between items-center shadow-lg border-b border-gray-200 dark:border-gray-700"
    >

      {/* Brand */}
      <Link
        to={variant === "auth" ? "/login" : "/dashboard"}
        className="flex items-center gap-3 text-xl font-bold cursor-pointer hover:scale-105 transition-transform duration-300"
      >
        <div className="p-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg">
          <Zap className="text-white" size={20} />
        </div>
        <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          Smart Energy Usage Tracker 
        </span>
      </Link>

      <div className="flex items-center gap-4">

        {/* 🌙 Dark Mode Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setDark(!dark)}
          className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 shadow-md"
          title="Toggle theme"
        >
          <AnimatePresence mode="wait">
            {dark ? (
              <motion.div
                key="sun"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Sun size={20} className="text-yellow-500" />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Moon size={20} className="text-blue-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Menu */}
        {variant === "protected" && (
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpen(!open)}
              className="p-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <AnimatePresence mode="wait">
                {open ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl shadow-2xl w-52 z-50 border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  {[
                    { to: "/dashboard", label: "Dashboard", icon: "📊" },
                    { to: "/history", label: "History", icon: "📜" },
                    { to: "/rewards", label: "Rewards", icon: "🎁" },
                    { to: "/tips", label: "Tips", icon: "💡" }
                  ].map((item, index) => (
                    <motion.div
                      key={item.to}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.to}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                        onClick={() => setOpen(false)}
                      >
                        <span>{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 font-medium"
                    >
                      <span>🚪</span>
                      <span>Logout</span>
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.nav>
  );
}
