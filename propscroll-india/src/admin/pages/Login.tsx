import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, MapPin, TrendingUp, ShieldCheck } from "lucide-react";

export default function Login() {
  const { login, isLoading, error: authError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/admin/dashboard";
  const [form, setForm] = useState({ email: "", password: "" });
  const [localError, setLocalError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const error = localError || authError;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    if (!form.email || !form.password) { setLocalError("Please fill all fields."); return; }
    const success = await login(form.email, form.password);
    if (success) navigate(from, { replace: true });
  };

  const features = [
    { icon: <MapPin size={18} />, text: "Manage Nagpur property listings" },
    { icon: <TrendingUp size={18} />, text: "Track leads & price trends" },
    { icon: <ShieldCheck size={18} />, text: "NMRDA verified dashboard" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0F2540] flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 20% 80%, #008C99 0%, transparent 50%), radial-gradient(circle at 80% 20%, #FCC02E 0%, transparent 50%)" }} />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-[#008C99] rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">P</span>
            </div>
            <span className="text-white font-extrabold text-xl tracking-tight">PropScroll</span>
          </div>
          <p className="text-[#008C99] text-xs font-medium tracking-widest uppercase">Admin Portal</p>
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
            Nagpur's Premier<br />
            <span className="text-[#FCC02E]">Land Intelligence</span><br />
            Platform
          </h2>
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">
            Manage listings, track enquiries, and grow your real estate business from one powerful dashboard.
          </p>
          <div className="space-y-3">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#008C99]/20 flex items-center justify-center text-[#008C99]">
                  {f.icon}
                </div>
                <span className="text-slate-300 text-sm">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-3 bg-white/5 rounded-2xl p-4 border border-white/10">
          <div className="w-10 h-10 rounded-full bg-[#FCC02E] flex items-center justify-center font-bold text-[#0F2540] text-sm">PS</div>
          <div>
            <p className="text-white text-sm font-semibold">PropScroll India</p>
            <p className="text-slate-400 text-xs">Trusted by 500+ Nagpur landowners</p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 px-6 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="w-8 h-8 bg-[#008C99] rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">P</span>
            </div>
            <span className="text-[#0F2540] font-extrabold text-xl">PropScroll</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-[#0F2540] mb-1">Welcome back</h1>
            <p className="text-slate-500 text-sm">Sign in to your admin account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email address</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="admin@propscroll.com"
                className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#008C99] focus:border-transparent transition-all placeholder:text-gray-400"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-semibold text-slate-700">Password</label>
                <span className="text-xs text-[#008C99] cursor-pointer hover:underline">Forgot password?</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-[#008C99] focus:border-transparent transition-all placeholder:text-gray-400"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#008C99] hover:bg-[#006e78] disabled:opacity-70 text-white font-semibold py-3 rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#008C99]/25"
            >
              {isLoading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</>
              ) : "Sign in to Dashboard"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-slate-500">
              Don't have an account?{" "}
              <Link to="/admin/signup" className="text-[#008C99] font-semibold hover:underline">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
