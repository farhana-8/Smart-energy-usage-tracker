import { useEffect, useState } from "react";
import { fetchTips } from "../services/tipService";
import { Lightbulb, Leaf, Zap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Tips() {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTips()
      .then(setTips)
      .catch(() => setTips([])) // ✅ NEW LOGIC (safe)
      .finally(() => setLoading(false));
  }, []);

  // ✅ NEW LOGIC (stable icons)
  const icons = [Zap, Leaf, Lightbulb];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-400 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-red-400 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-10 text-gray-900 dark:text-white">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full">
              <Sparkles className="text-white" size={40} />
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Lightbulb className="text-yellow-400" size={40} />
            Energy Saving Tips
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Small habits today save big energy tomorrow ⚡ Discover practical ways to reduce your energy consumption
          </p>
        </motion.div>

        {/* Loading Skeleton */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-48 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse shadow-lg"
              />
            ))}
          </motion.div>
        )}

        {/* Tips Cards */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {tips.map((tip, i) => {
              const Icon = icons[tip.id % icons.length]; // ✅ NEW LOGIC

              return (
                <motion.div
                  key={tip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="
                    bg-white dark:bg-gray-800
                    rounded-2xl shadow-xl p-6
                    hover:shadow-2xl transition-all duration-300
                    transform hover:scale-105 hover:-translate-y-2
                    border border-gray-100 dark:border-gray-700
                    relative overflow-hidden
                  "
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-10 -mr-10 -mt-10"></div>

                  <div className="relative">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
                        <Icon size={24} />
                      </div>
                      <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                        {tip.title}
                      </h3>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {tip.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {!loading && tips.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center py-16"
          >
            <Lightbulb size={64} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-xl">
              No tips available at the moment. Check back later!
            </p>
          </motion.div>
        )}

      </div>
    </div>
  );
}
