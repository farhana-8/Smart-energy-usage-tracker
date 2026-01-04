import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistory, fetchRewards, submitUnits } from "../store";

import DailyTipBanner from "../components/DailyTipBanner";
import EnergyAlert from "../components/EnergyAlert";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Zap, TrendingUp, Award, BarChart3, Plus } from "lucide-react";
import CountUp from "react-countup";
import { motion } from "framer-motion";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { history, rewards } = useSelector((state) => state.energy);

  const [units, setUnits] = useState("");
  const [msg, setMsg] = useState("");
  const [alertKey, setAlertKey] = useState(0);
  const [predictedBill, setPredictedBill] = useState(0);
  const [totalUnits, setTotalUnits] = useState(0);
  const [totalBill, setTotalBill] = useState(0);

  const email = localStorage.getItem("email");

  // 🔹 Fetch history & rewards
  useEffect(() => {
    dispatch(fetchHistory());
    dispatch(fetchRewards());
  }, [dispatch]);

  // 🔮 Predict next month bill & calculate totals
useEffect(() => {
  if (!history || history.length === 0) {
    setPredictedBill(0);
    setTotalUnits(0);
    setTotalBill(0);
    return;
  }

  const totalU = history.reduce((sum, h) => sum + Number(h.unitsConsumed), 0);
  const totalB = history.reduce((sum, h) => sum + Number(h.billAmount), 0);
  setTotalUnits(totalU);
  setTotalBill(totalB);

  if (history.length < 2) {
    setPredictedBill(0);
    return;
  }

  const last = history[history.length - 1];
  const previous = history[history.length - 2];

  const avgUnits =
    (Number(last.unitsConsumed) + Number(previous.unitsConsumed)) / 2;

  const RATE_PER_UNIT = 4;

  setPredictedBill(Math.round(avgUnits * RATE_PER_UNIT));
}, [history]);


  // 🔹 Submit usage
  const submit = async (e) => {
    e.preventDefault();

    await dispatch(submitUnits(units));

    setMsg("✅ Units submitted successfully!");
    setUnits("");
    setAlertKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-green-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-purple-400 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-6 text-gray-900 dark:text-white">

        {/* 🌱 Daily Tip */}
        <DailyTipBanner />

        {/* ⚠️ Energy Alert */}
        <EnergyAlert email={email} refresh={alertKey} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <BarChart3 className="text-green-500" size={40} />
            Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Monitor your energy usage and rewards
          </p>
        </motion.div>

        {/* ===== Usage Chart ===== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl mb-8 border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="text-blue-500" size={24} />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              📈 Usage History
            </h3>
          </div>

          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}
              />
              <Line
                type="monotone"
                dataKey="unitsConsumed"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 4 }}
                name="Units"
                animationDuration={1500}
                animationEasing="ease-in-out"
                activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2, fill: '#fff' }}
              />
              <Line
                type="monotone"
                dataKey="billAmount"
                stroke="#22c55e"
                strokeWidth={3}
                dot={{ r: 4 }}
                name="Bill"
                animationDuration={1500}
                animationEasing="ease-in-out"
                activeDot={{ r: 8, stroke: '#22c55e', strokeWidth: 2, fill: '#fff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ===== Top Section ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

          {/* ===== Energy Input Card ===== */}
          <form
            onSubmit={submit}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 space-y-4"
          >
            <h3 className="text-base font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-200">
              <Zap size={18} className="text-green-500" />
              Enter Energy Usage
            </h3>

            <div>
              <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">
                Units Consumed (kWh)
              </label>
              <input
                type="number"
                placeholder="120"
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                required
                className="
                  w-full h-10 rounded-md px-3 text-sm
                  bg-gray-50 dark:bg-gray-700
                  border border-gray-300 dark:border-gray-600
                  focus:outline-none focus:ring-2 focus:ring-green-500
                "
              />
            </div>

            <button
              type="submit"
              className="
                w-full h-12 rounded-xl font-semibold text-white text-lg
                bg-gradient-to-r from-green-500 to-emerald-500
                hover:from-green-600 hover:to-emerald-600
                transition-all duration-300 shadow-lg hover:shadow-xl
                transform hover:scale-105 flex items-center justify-center gap-2
              "
            >
              <Plus size={20} />
              Submit Usage
            </button>

            {msg && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-green-600 dark:text-green-400 font-semibold text-center bg-green-50 dark:bg-green-900/30 rounded-lg p-3"
              >
                {msg}
              </motion.p>
            )}
          </form>

          {/* ===== Rewards Card ===== */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="
              rounded-2xl shadow-xl p-8 flex flex-col justify-center items-center
              bg-gradient-to-br from-green-400 via-blue-500 to-purple-600
              dark:from-gray-800 dark:via-gray-900 dark:to-gray-900
              text-white relative overflow-hidden
            "
          >
            <div className="absolute inset-0 bg-white opacity-10 rounded-2xl"></div>
            <div className="relative text-center">
              <Award className="mx-auto mb-4" size={48} />
              <p className="text-lg opacity-90 mb-2">🎁 Reward Points</p>

              <h1 className="text-5xl font-extrabold mb-4">
                <CountUp end={rewards || 0} duration={1.5} />
              </h1>

              <p className="text-sm opacity-80">
                Earn more by saving energy 🌱
              </p>
            </div>
          </motion.div>
        </div>

        {/* ===== Stats Section ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Total Units */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 text-center border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="flex justify-center mb-3">
              <Zap className="text-blue-500" size={32} />
            </div>
            <h4 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">Total Units</h4>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{totalUnits}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">kWh consumed</p>
          </div>

          {/* Total Bill */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 text-center border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="flex justify-center mb-3">
              <TrendingUp className="text-green-500" size={32} />
            </div>
            <h4 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">Total Bill</h4>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">₹{totalBill}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Paid so far</p>
          </div>

          {/* Predicted Bill */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 text-center border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="flex justify-center mb-3">
              <BarChart3 className="text-orange-500" size={32} />
            </div>
            <h4 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">Predicted Bill</h4>
            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">₹{predictedBill}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Next month</p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
