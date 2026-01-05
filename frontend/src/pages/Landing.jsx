import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BarChart3, Award, Lightbulb, Zap, TrendingDown, Shield } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white relative overflow-hidden">

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-green-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-purple-400 rounded-full blur-2xl"></div>
      </div>

      {/* HERO SECTION */}
      <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex p-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-6 shadow-xl">
            <Zap className="text-white" size={48} />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400 bg-clip-text text-transparent"
        >
          ⚡ Smart Energy Usage Tracker
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed"
        >
          Track electricity usage, predict bills, earn rewards, and save energy with intelligent insights — all in one beautiful dashboard.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-center gap-6"
        >
          <Link
            to="/login"
            className="px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold text-lg hover:from-blue-700 hover:to-green-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            Get Started
          </Link>

          <Link
            to="/register"
            className="px-10 py-4 rounded-2xl border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            Create Account
          </Link>
        </motion.div>
      </div>

      {/* FEATURES SECTION */}
      <div className="relative max-w-7xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Why Choose Smart Energy?</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Discover the features that make energy management effortless and rewarding
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: BarChart3,
              title: "📊 Usage Analytics",
              desc: "Visualize daily energy consumption with interactive charts and detailed insights.",
              color: "from-blue-500 to-cyan-500"
            },
            {
              icon: Award,
              title: "🎁 Reward Points",
              desc: "Earn points for saving energy and consistent tracking. Redeem for exciting rewards!",
              color: "from-green-500 to-emerald-500"
            },
            {
              icon: Lightbulb,
              title: "💡 Smart Tips",
              desc: "Get daily energy-saving tips powered by AI insights tailored to your usage patterns.",
              color: "from-yellow-500 to-orange-500"
            },
            {
              icon: TrendingDown,
              title: "📉 Bill Prediction",
              desc: "Predict your next electricity bill based on historical data and usage trends.",
              color: "from-purple-500 to-pink-500"
            },
            {
              icon: Shield,
              title: "🔒 Secure & Private",
              desc: "Your energy data is encrypted and secure. We prioritize your privacy above all.",
              color: "from-red-500 to-rose-500"
            },
            {
              icon: Zap,
              title: "⚡ Real-time Monitoring",
              desc: "Monitor your energy usage in real-time with instant alerts and notifications.",
              color: "from-indigo-500 to-blue-500"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${item.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  {item.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
