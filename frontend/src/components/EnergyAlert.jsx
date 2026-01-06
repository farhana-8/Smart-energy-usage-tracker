import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { fetchEnergyAlert } from "../services/alertApi";
import { AuthContext } from "../context/AuthContext";

const EnergyAlert = ({ refresh }) => {
  const { email } = useContext(AuthContext);
  const [msg, setMsg] = useState("");
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!email) return;

    const getAlert = async () => {
      try {
        const data = await fetchEnergyAlert(email);
        setMsg(data);
        setDismissed(false);
      } catch (err) {
        console.error("Error fetching alerts:", err);
        setMsg(""); // clear on error
      }
    };

    getAlert();
  }, [email, refresh]);

  if (!msg || dismissed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-4 p-4 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg flex justify-between items-start"
    >
      <span>{typeof msg === "string" ? msg : msg.message}</span>
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
