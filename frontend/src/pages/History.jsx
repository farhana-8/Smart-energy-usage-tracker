import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistory } from "../store";
import { motion } from "framer-motion";
import {
  Calendar,
  Zap,
  DollarSign,
  Download,
  TrendingUp,
} from "lucide-react";

export default function History() {
  const dispatch = useDispatch();
  const history = useSelector((state) => state.energy.history);

  const [predictedBill, setPredictedBill] = useState(null);

  // 1️⃣ Fetch history
  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  // 2️⃣ Calculate predicted bill
  useEffect(() => {
    if (!history || history.length === 0) return;

    const totalUnits = history.reduce(
      (sum, record) => sum + record.unitsConsumed,
      0
    );

    const averageUnits = totalUnits / history.length;
    const RATE_PER_UNIT = 5;

    setPredictedBill(Math.round(averageUnits * RATE_PER_UNIT));
  }, [history]);

  // 3️⃣ SORT: Newest bills first (DESC by date)
  const sortedHistory = [...history].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors relative overflow-hidden">

      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-400 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-purple-400 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative max-w-6xl mx-auto p-6 text-gray-900 dark:text-white">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Calendar className="text-blue-500" size={40} />
            📜 My Energy History
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Track your energy usage and bills over time
          </p>
        </motion.div>

        {/* 🔮 Predicted Bill */}
        {predictedBill !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl text-center"
          >
            <TrendingUp className="mx-auto mb-2" size={32} />
            <strong className="text-xl">Predicted Next Bill</strong>
            <p className="text-3xl font-bold mt-2">₹{predictedBill}</p>
            <p className="text-sm opacity-80">Based on your average usage</p>
          </motion.div>
        )}

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="overflow-hidden rounded-2xl shadow-2xl bg-white dark:bg-gray-800"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                <tr>
                  <th className="p-4 text-left">
                    <Calendar size={18} className="inline mr-2" />
                    Date
                  </th>
                  <th className="p-4 text-center">
                    <Zap size={18} className="inline mr-2" />
                    Units (kWh)
                  </th>
                  <th className="p-4 text-center">
                    <DollarSign size={18} className="inline mr-2" />
                    Bill (₹)
                  </th>
                  <th className="p-4 text-center">
                    <Download size={18} className="inline mr-2" />
                    PDF
                  </th>
                </tr>
              </thead>

              <tbody>
                {sortedHistory.map((h, index) => (
                  <motion.tr
                    key={h.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="
                      border-b border-gray-200 dark:border-gray-700
                      hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50
                      dark:hover:from-gray-700 dark:hover:to-gray-600
                      transition-all
                    "
                  >
                    <td className="p-4 font-medium">{h.date}</td>
                    <td className="p-4 text-center font-semibold text-blue-600 dark:text-blue-400">
                      {h.unitsConsumed}
                    </td>
                    <td className="p-4 text-center font-semibold text-green-600 dark:text-green-400">
                      ₹{h.billAmount}
                    </td>
                    <td className="p-4 text-center">
                      <a
                        href={`http://localhost:8080/api/bill/download/${h.id}`}
                        className="
                          inline-flex items-center gap-2 px-4 py-2 rounded-lg
                          bg-gradient-to-r from-green-500 to-blue-500
                          text-white font-medium
                          hover:from-green-600 hover:to-blue-600
                          shadow-md hover:shadow-lg
                          transform hover:scale-105 transition-all
                        "
                      >
                        <Download size={16} />
                        Download
                      </a>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Empty State */}
        {sortedHistory.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Zap size={64} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No energy usage history yet.
            </p>
          </motion.div>
        )}

      </div>
    </div>
  );
}
