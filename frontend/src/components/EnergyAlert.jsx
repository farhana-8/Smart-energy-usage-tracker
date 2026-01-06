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
        setMsg(data || "No alerts available for you."); // show message if empty
        setDismissed(false);
      } catch (err) {
        if (err.response?.status === 403) {
          // Friendly message for 403
          setMsg("No alerts available for you.");
        } else {
          console.error("Error fetching alerts:", err);
          setMsg("Failed to load alerts.");
        }
        setDismissed(false);
      } finally {
        setLoading(false);
      }
    };

    getAlert();
  }, [email, refresh]);

  // Optionally, show a loading placeholder
  if (loading) return null;

  if (!msg || dismissed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`mb-4 p-4 rounded-lg shadow-lg flex justify-between items-start
        ${msg === "No alerts available for you." ? "bg-gray-200 text-gray-700" : "bg-gradient-to-r from-red-500 to-orange-500 text-white"}`}
    >
      <span>{msg}</span>
      {msg !== "No alerts available for you." && (
        <button
          onClick={() => setDismissed(true)}
          className="text-white hover:text-gray-200 text-xl font-bold ml-4"
        >
          ×
        </button>
      )}
    </motion.div>
  );
};

export default EnergyAlert;
