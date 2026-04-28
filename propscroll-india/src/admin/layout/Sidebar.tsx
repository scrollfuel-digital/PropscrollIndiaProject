import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  PlusSquare,
  Users,
  UserCheck,
  Tag,
  BarChart2,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/properties", label: "Properties", icon: Building2 },
  { to: "/admin/add-property", label: "Add Property", icon: PlusSquare },
  { to: "/admin/leads", label: "Leads", icon: Users },
  { to: "/admin/agents", label: "Agents", icon: UserCheck },
  { to: "/admin/categories", label: "Categories", icon: Tag },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart2 },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">
      <div className="px-6 py-5 border-b border-slate-700">
        <h2 className="text-xl font-bold text-teal-400">PropScroll</h2>
        <p className="text-xs text-slate-400 mt-0.5">Admin Panel</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-teal-600 text-white font-medium"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm text-slate-300 hover:bg-red-600 hover:text-white transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
