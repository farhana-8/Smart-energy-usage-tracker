import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const EnergyAlert = ({ email, refresh }) => {
  const [msg, setMsg] = useState("");
  const [dismissed, setDismissed] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!email || !token) {
      console.warn("Missing email or token");
      return;
    }

    fetch(`http://localhost:8080/api/alerts/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.text())
      .then((data) => {
        console.log("Alert message:", data);
        setMsg(data);
        setDismissed(false); // Reset dismissed when new msg
      })
      .catch((err) => console.error(err));
  }, [email, token, refresh]);

  if (!msg || dismissed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-4 p-4 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg flex justify-between items-start"
    >
      <span> {msg}</span>
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
