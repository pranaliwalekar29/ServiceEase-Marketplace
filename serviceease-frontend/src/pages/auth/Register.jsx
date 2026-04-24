import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { User, Mail, Lock, Eye, EyeOff, Users, Briefcase, ArrowRight } from "lucide-react";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "CUSTOMER",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .role-card {
          transition: all 0.3s ease;
        }
        .role-card:hover {
          transform: translateY(-4px);
        }
        .role-card.selected {
          transform: scale(1.05);
        }
      `}</style>

      <div className="w-full max-w-md">
        {/* Welcome Text */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-48 h-16 bg-gradient-to-br from-green-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <span className="text-lg font-bold text-white">ServiceEase</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join ServiceEase</h1>
          <p className="text-gray-600">Create your account and get started today</p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 transition-all duration-300"
        >
          {error && (
            <div className="bg-red-50 text-red-700 border-l-4 border-red-500 rounded-lg p-4 mb-6 text-sm font-semibold flex items-center gap-2 animate-pulse">
              <span>⚠️</span>
              {error}
            </div>
          )}

          {/* Name Input */}
          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 w-5 h-5 text-indigo-500" />
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-5 h-5 text-indigo-500" />
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-5 h-5 text-indigo-500" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-500 hover:text-indigo-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-3 text-sm">Choose Your Role</label>
            <div className="grid grid-cols-2 gap-3">
              {/* Customer Option */}
              <button
                type="button"
                onClick={() => setForm({ ...form, role: "CUSTOMER" })}
                className={`role-card p-4 rounded-lg border-2 transition-all ${form.role === "CUSTOMER" ? "border-blue-500 bg-blue-50 shadow-md" : "border-gray-200 bg-white hover:border-blue-300"}`}
              >
                <Users className={`w-6 h-6 mx-auto mb-2 ${form.role === "CUSTOMER" ? "text-blue-600" : "text-gray-600"}`} />
                <div className="font-semibold text-sm">Customer</div>
                <div className="text-xs text-gray-500">Find services</div>
              </button>

              {/* Provider Option */}
              <button
                type="button"
                onClick={() => setForm({ ...form, role: "PROVIDER" })}
                className={`role-card p-4 rounded-lg border-2 transition-all ${form.role === "PROVIDER" ? "border-green-500 bg-green-50 shadow-md" : "border-gray-200 bg-white hover:border-green-300"}`}
              >
                <Briefcase className={`w-6 h-6 mx-auto mb-2 ${form.role === "PROVIDER" ? "text-green-600" : "text-gray-600"}`} />
                <div className="font-semibold text-sm">Provider</div>
                <div className="text-xs text-gray-500">Offer services</div>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="inline-block animate-spin">⌛</span>
                Creating account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Login Link */}
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors cursor-pointer"
              >
                Login Here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
