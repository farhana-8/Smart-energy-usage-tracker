import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchTipOfTheDay } from "../services/tipService";

export default function DailyTipBanner() {
  const [tip, setTip] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Show banner once per session
    const isDismissed = sessionStorage.getItem("tipDismissed");
    if (isDismissed) {
      setDismissed(true);
      return;
    }

    fetchTipOfTheDay().then(setTip);
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem("tipDismissed", "true");
    setDismissed(true);
  };

  if (!tip || dismissed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-4 rounded-lg shadow-lg flex justify-between items-start"
    >
      <div>
        <h3 className="font-semibold mb-1 text-lg">💡 Energy Tip of the Day</h3>
        <p className="text-sm">{tip.description}</p>
      </div>

      <button
        onClick={handleDismiss}
        className="text-lg font-bold text-white hover:text-gray-200 transition"
      >
        ✖
      </button>
    </motion.div>
  );
}
