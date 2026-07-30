import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Building2, PlusCircle, Users, UserCheck, MessageSquare,
  Tag, BarChart2, Settings, LogOut, ChevronLeft, ChevronRight, X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { to: "/admin/dashboard",    label: "Dashboard",    icon: LayoutDashboard },
  { to: "/admin/leads",        label: "Leads",        icon: Users },
  { to: "/admin/enquiries",    label: "Enquiries",    icon: MessageSquare },
  { to: "/admin/properties",   label: "Properties",   icon: Building2 },
  { to: "/admin/categories",   label: "Categories",   icon: Tag },
  { to: "/admin/analytics",    label: "Analytics",    icon: BarChart2 },
  { to: "/admin/settings",     label: "Settings",     icon: Settings },
];

interface SidebarProps {
  sidebarOpen: boolean;
  collapsed: boolean;
  onClose: () => void;
  onToggleCollapse: () => void;
}

export default function Sidebar({ sidebarOpen, collapsed, onClose, onToggleCollapse }: SidebarProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate("/admin/login"); };

  return (
    <>
      {/* ── Sidebar panel ── */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-50 bg-[#0F2540] text-white flex flex-col
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:z-auto lg:flex-shrink-0
          ${collapsed ? "lg:w-[68px]" : "lg:w-64"}
          w-64
        `}
      >
        {/* Logo */}
        <div className={`flex items-center border-b border-slate-700 h-[60px] flex-shrink-0 ${collapsed ? "lg:justify-center px-0" : "px-5 gap-3"}`}>
          <div className="w-8 h-8 bg-[#008C99] rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-black text-sm">P</span>
          </div>
          <span className={`text-white font-extrabold text-base tracking-tight transition-all duration-200 ${collapsed ? "lg:hidden" : ""}`}>
            PropScroll
          </span>
          {/* Mobile close */}
          <button onClick={onClose} className="ml-auto lg:hidden text-slate-400 hover:text-white p-1">
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              title={collapsed ? label : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 group relative
                ${collapsed ? "lg:justify-center lg:px-0" : ""}
                ${isActive
                  ? "bg-[#008C99] text-white font-semibold shadow-lg shadow-[#008C99]/20"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={18} className="flex-shrink-0" />
                  <span className={`transition-all duration-200 ${collapsed ? "lg:hidden" : ""}`}>
                    {label}
                  </span>
                  {/* Tooltip on collapsed */}
                  {collapsed && (
                    <span className="hidden lg:block absolute left-full ml-3 px-2.5 py-1.5 bg-slate-800 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg">
                      {label}
                    </span>
                  )}
                  {isActive && !collapsed && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className={`px-2 py-3 border-t border-slate-700 space-y-1 flex-shrink-0`}>
          {/* Collapse toggle — desktop only */}
          <button
            onClick={onToggleCollapse}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={`hidden lg:flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition-colors ${collapsed ? "justify-center" : ""}`}
          >
            {collapsed ? <ChevronRight size={18} /> : <><ChevronLeft size={18} /><span>Collapse</span></>}
          </button>

          <button
            onClick={handleLogout}
            title={collapsed ? "Logout" : undefined}
            className={`flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm text-slate-400 hover:bg-red-600/80 hover:text-white transition-colors ${collapsed ? "lg:justify-center" : ""}`}
          >
            <LogOut size={18} className="flex-shrink-0" />
            <span className={collapsed ? "lg:hidden" : ""}>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
