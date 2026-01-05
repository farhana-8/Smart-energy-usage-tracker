import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { fetchEnergyAlert } from "../services/alertApi";
import { AuthContext } from "../context/AuthContext";

const EnergyAlert = ({ refresh }) => {
  const { email } = useContext(AuthContext);
  const [msg, setMsg] = useState("");
  const [dismissed, setDismissed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) return;

    const getAlert = async () => {
      setLoading(true);
      try {
        const data = await fetchEnergyAlert(email);
        // If backend returns string, use it; if object, use data.message
        setMsg(typeof data === "string" ? data : data.message || "");
        setDismissed(false); // reset dismissed for new message
      } catch (err) {
        console.error("Failed to fetch alerts:", err.response || err);
        setMsg(""); // clear on error
      } finally {
        setLoading(false);
      }
    };

    getAlert();
  }, [email, refresh]);

  if (!msg || dismissed) return null;

  // Show red alert only if it’s a “real warning”; info messages could be lighter
  const isInfo = msg.startsWith("ℹ️");

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`mb-4 p-4 rounded-lg text-white shadow-lg flex justify-between items-start ${
        isInfo
          ? "bg-blue-500"
          : "bg-gradient-to-r from-red-500 to-orange-500"
      }`}
    >
      <span>{msg}</span>
      <button
        onClick={() => setDismissed(true)}
        className="text-white hover:text-gray-200 text-xl font-bold ml-4"
      >
        ×
      </button>
    </motion.div>
  );
};

export default EnergyAlert;
