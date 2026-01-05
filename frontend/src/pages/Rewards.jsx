import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRewards } from "../store";
import { motion } from "framer-motion";
import { Award, Star, Trophy, Gift } from "lucide-react";
import CountUp from "react-countup";

export default function Rewards() {
  const dispatch = useDispatch();
  const rewards = useSelector((state) => state.energy.rewards);

  useEffect(() => {
    dispatch(fetchRewards());
  }, [dispatch]);

  return (
    <div className="
      min-h-screen flex items-center justify-center p-6
      bg-gradient-to-br from-purple-400 via-pink-500 to-red-500
      dark:from-gray-900 dark:to-gray-800
      relative overflow-hidden
    ">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-300 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-300 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="
          bg-white dark:bg-gray-900
          rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center
          relative overflow-hidden border border-white/20
        "
      >
        {/* Decorative Elements */}
        <div className="absolute top-4 left-4">
          <Star className="text-yellow-400 w-6 h-6 animate-spin" style={{ animationDuration: '3s' }} />
        </div>
        <div className="absolute top-4 right-4">
          <Gift className="text-pink-400 w-6 h-6 animate-bounce" />
        </div>
        <div className="absolute bottom-4 left-4">
          <Trophy className="text-orange-400 w-6 h-6 animate-pulse" />
        </div>
        <div className="absolute bottom-4 right-4">
          <Award className="text-purple-400 w-6 h-6 animate-spin" style={{ animationDuration: '4s' }} />
        </div>

        <div className="relative">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-6"
          >
            <div className="inline-flex p-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4 shadow-lg">
              <Award className="text-white" size={48} />
            </div>
            <h2 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
              🎁 My Rewards
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Your energy-saving achievements
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, type: "spring", stiffness: 100 }}
            className="
              bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
              text-white rounded-3xl p-8 shadow-xl relative overflow-hidden
            "
          >
            <div className="absolute inset-0 bg-white opacity-10 rounded-3xl"></div>
            <div className="relative">
              <p className="text-lg opacity-90 mb-4">Total Reward Points</p>
              <h1 className="text-7xl font-extrabold mb-4 animate-pulse">
                <CountUp end={rewards || 0} duration={2} />
              </h1>
              <p className="text-sm opacity-80 flex items-center justify-center gap-2">
                <span>🌱</span>
                Saving energy saves the planet
                <span>🌍</span>
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-6 text-sm text-gray-500 dark:text-gray-400"
          >
            Keep tracking your usage to earn more points!
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
