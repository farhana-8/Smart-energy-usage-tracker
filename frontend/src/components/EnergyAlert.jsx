import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { fetchEnergyAlert } from "../services/alertApi"; // uses authService api
import { AuthContext } from "../context/AuthContext";

const EnergyAlert = ({ refresh }) => {
  const { email } = useContext(AuthContext); // get email from context
  const [msg, setMsg] = useState("");
  const [dismissed, setDismissed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) {
      console.warn("Missing email");
      return;
    }

    const getAlert = async () => {
      setLoading(true);
      try {
        const data = await fetchEnergyAlert(email); // calls backend via Axios with token
        setMsg(data); // assume backend returns { message: "..." } or a string
        setDismissed(false); // reset dismissed for new message
      } catch (err) {
        console.error("Failed to fetch alerts:", err.response || err);
        setMsg(""); // clear msg on error
      } finally {
        setLoading(false);
      }
    };

    getAlert();
  }, [email, refresh]); // refresh can be used to manually re-fetch

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

