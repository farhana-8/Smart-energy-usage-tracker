import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistory, fetchRewards, submitUnits } from "../store";

import DailyTipBanner from "../components/DailyTipBanner";

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
  const { history = [], rewards = 0 } = useSelector(
    (state) => state.energy || {}
  );

  const [units, setUnits] = useState("");
  const [msg, setMsg] = useState("");
  const [predictedBill, setPredictedBill] = useState(0);
  const [totalUnits, setTotalUnits] = useState(0);
  const [totalBill, setTotalBill] = useState(0);

  // 🔹 Fetch history & rewards
  useEffect(() => {
    dispatch(fetchHistory());
    dispatch(fetchRewards());
  }, [dispatch]);

  // 🔮 Calculate totals & prediction
  useEffect(() => {
    if (!history || history.length === 0) {
      setPredictedBill(0);
      setTotalUnits(0);
      setTotalBill(0);
      return;
    }

    const totalU = history.reduce(
      (sum, h) => sum + Number(h.unitsConsumed || 0),
      0
    );
    const totalB = history.reduce(
      (sum, h) => sum + Number(h.billAmount || 0),
      0
    );

    setTotalUnits(totalU);
    setTotalBill(totalB);

    if (history.length < 2) {
      setPredictedBill(0);
      return;
    }

    const last = history[history.length - 1];
    const prev = history[history.length - 2];

    const avgUnits =
      (Number(last.unitsConsumed) + Number(prev.unitsConsumed)) / 2;

    setPredictedBill(Math.round(avgUnits * 4));
  }, [history]);

  // 🔹 Submit usage
  const submit = async (e) => {
    e.preventDefault();
    await dispatch(submitUnits(units));
    setMsg("✅ Units submitted successfully!");
    setUnits("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-6">

        <DailyTipBanner />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold flex items-center justify-center gap-3">
            <BarChart3 className="text-green-500" />
            Dashboard
          </h2>
        </motion.div>

        {/* ===== Usage Chart ===== */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl mb-8">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="unitsConsumed"
                stroke="#3b82f6"
                strokeWidth={3}
              />
              <Line
                type="monotone"
                dataKey="billAmount"
                stroke="#22c55e"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ===== Input & Rewards ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <form
            onSubmit={submit}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 space-y-4"
          >
            <h3 className="font-semibold flex items-center gap-2">
              <Zap className="text-green-500" /> Enter Energy Usage
            </h3>

            <input
              type="number"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              required
              className="w-full h-10 rounded-md px-3 border"
            />

            <button
              type="submit"
              className="w-full h-12 bg-green-500 text-white rounded-lg"
            >
              <Plus className="inline mr-2" /> Submit
            </button>

            {msg && <p className="text-green-600 text-center">{msg}</p>}
          </form>

          <div className="rounded-xl shadow-xl p-8 text-center bg-gradient-to-br from-green-400 to-blue-500 text-white">
            <Award size={48} className="mx-auto mb-4" />
            <p className="text-lg">Reward Points</p>
            <h1 className="text-5xl font-bold">
              <CountUp end={rewards} />
            </h1>
          </div>
        </div>

        {/* ===== Stats ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Stat title="Total Units" value={totalUnits} />
          <Stat title="Total Bill" value={`₹${totalBill}`} />
          <Stat title="Predicted Bill" value={`₹${predictedBill}`} />
        </div>
      </div>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-center">
      <h4 className="text-gray-500">{title}</h4>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
