import { motion } from "framer-motion";
import { Heart, Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-8 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-700 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span>© 2025 Smart Energy Usage Tracker</span>
            <span className="text-red-500">♥</span>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <span className="flex items-center gap-1">
              Made with <Heart className="text-red-500 w-4 h-4" /> for a sustainable future
            </span>
          </div>

          <div className="flex items-center gap-4">
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
              title="GitHub"
            >
              <Github size={16} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
              title="Contact"
            >
              <Mail size={16} />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
