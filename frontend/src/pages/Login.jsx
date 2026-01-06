import { useState, useContext } from "react";
import { login } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!validateEmail(trimmedEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    if (trimmedPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await login({ email: trimmedEmail, password: trimmedPassword });
      loginUser(res.token, trimmedEmail); // store token and email in context + localStorage
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err.response?.data || err);
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4
      bg-gradient-to-br from-blue-50 to-green-50
      dark:from-gray-900 dark:to-gray-800"
    >
      <div className="w-full max-w-lg bg-white dark:bg-gray-900
        rounded-2xl shadow-2xl p-8 md:p-10"
      >
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-800 dark:text-white">
          Welcome Back 👋
        </h2>

        <p className="text-center text-sm mb-8 text-gray-500 dark:text-gray-400">
          Login to Smart Energy Usage Tracker
        </p>

        {error && (
          <div className="mb-5 text-sm text-red-600 bg-red-50
            dark:bg-red-900/30 dark:text-red-400
            border border-red-200 dark:border-red-800
            rounded-lg p-3 text-center"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border
                bg-white dark:bg-gray-800
                text-gray-800 dark:text-white
                border-gray-300 dark:border-gray-700
                focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border
                bg-white dark:bg-gray-800
                text-gray-800 dark:text-white
                border-gray-300 dark:border-gray-700
                focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold text-white
              bg-gradient-to-r from-blue-600 to-green-600
              hover:opacity-90 transition shadow-lg"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-600 dark:text-gray-400">
          New user?{" "}
          <Link
            to="/register"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
