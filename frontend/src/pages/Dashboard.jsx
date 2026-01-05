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

import { Zap } from "lucide-react";
import CountUp from "react-countup";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { history, rewards } = useSelector((state) => state.energy);

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

  // 🔮 Predict next month bill & calculate totals
  useEffect(() => {
    if (!history || history.length === 0) {
      setPredictedBill(0);
      setTotalUnits(0);
      setTotalBill(0);
      return;
    }

    const totalU = history.reduce(
      (sum, h) => sum + Number(h.unitsConsumed),
      0
    );
    const totalB = history.reduce(
      (sum, h) => sum + Number(h.billAmount),
      0
    );

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
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-6 text-gray-900 dark:text-white">

        {/* 🌱 Daily Tip */}
        <DailyTipBanner />

        <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

        {/* ===== Usage Chart ===== */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
            📈 Usage History
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="unitsConsumed"
                stroke="#3b82f6"
                strokeWidth={2.5}
                dot={{ r: 3 }}
                name="Units"
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
              <Line
                type="monotone"
                dataKey="billAmount"
                stroke="#22c55e"
                strokeWidth={2.5}
                dot={{ r: 3 }}
                name="Bill"
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ===== Top Section ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

          {/* Energy Input */}
          <form
            onSubmit={submit}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 space-y-4"
          >
            <h3 className="text-base font-semibold flex items-center gap-2">
              <Zap size={18} className="text-green-500" />
              Enter Energy Usage
            </h3>

            <input
              type="number"
              placeholder="120"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              required
              className="w-full h-10 rounded-md px-3 text-sm bg-gray-50 dark:bg-gray-700 border"
            />

            <button className="w-full h-10 rounded-md bg-gradient-to-r from-green-600 to-emerald-500 text-white">
              Submit Usage
            </button>

            {msg && <p className="text-xs text-green-500">{msg}</p>}
          </form>

          {/* Rewards */}
          <div className="rounded-lg shadow p-6 flex flex-col items-center bg-gradient-to-br from-green-500 to-blue-500 text-white">
            <p className="text-sm">🎁 Reward Points</p>
            <h1 className="text-4xl font-bold">
              <CountUp end={rewards || 0} duration={1.2} />
            </h1>
            <p className="text-xs">Earn more by saving energy</p>
          </div>
        </div>

        {/* ===== Stats Section ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center">
            <h4>Total Units</h4>
            <p className="text-2xl text-blue-600">{totalUnits}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center">
            <h4>Total Bill</h4>
            <p className="text-2xl text-green-600">₹{totalBill}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center">
            <h4>Predicted Bill</h4>
            <p className="text-2xl text-orange-600">₹{predictedBill}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
