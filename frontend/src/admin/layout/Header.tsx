import { useState, useRef, useEffect } from "react";
import { Bell, X, Mail, MessageSquare, LogOut, User, ChevronDown, Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "@/src/hooks/useNotifications";

interface HeaderProps {
  onMenuClick: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { notifications, unreadCount, markAllRead } = useNotifications();

  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const adminUser = (() => {
    try { return JSON.parse(localStorage.getItem("admin_user") || "{}"); } catch { return {}; }
  })();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleNotifOpen = () => {
    setNotifOpen((v) => !v);
    setProfileOpen(false);
    if (!notifOpen) markAllRead();
  };

  const handleProfileOpen = () => {
    setProfileOpen((v) => !v);
    setNotifOpen(false);
  };

  const handleLogout = () => { logout(); navigate("/admin/login"); };

  const formatTime = (time: string | null) => {
    if (!time) return "";
    return new Date(time).toLocaleDateString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 h-[60px] flex items-center justify-between sticky top-0 z-30 flex-shrink-0">
      {/* Left: hamburger (mobile) + title */}
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 text-slate-600 transition-colors"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="PropScroll" className="h-7 w-auto object-contain hidden sm:block" />
          <span className="text-sm font-semibold text-slate-400 hidden md:block">Admin Panel</span>
        </div>
      </div>

      {/* Right: notifications + profile */}
      <div className="flex items-center gap-2">
        {/* Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={handleNotifOpen}
            className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 text-slate-500 transition-colors"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#008C99] text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-11 w-[320px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <h3 className="font-semibold text-slate-800 text-sm">Notifications</h3>
                <button onClick={() => setNotifOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={15} />
                </button>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-gray-50">
                {notifications.length === 0 ? (
                  <p className="text-sm text-slate-400 text-center py-8">No notifications yet.</p>
                ) : notifications.map((n) => (
                  <div key={String(n._id)} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${n.type === "contact" ? "bg-[#008C99]/10 text-[#008C99]" : "bg-[#FCC02E]/10 text-[#FCC02E]"}`}>
                      {n.type === "contact" ? <Mail size={14} /> : <MessageSquare size={14} />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-slate-800 truncate">{n.title}</p>
                      <p className="text-xs text-slate-400 truncate">{n.subtitle}</p>
                      {n.time && <p className="text-[10px] text-slate-300 mt-0.5">{formatTime(n.time)}</p>}
                    </div>
                  </div>
                ))}
              </div>
              {notifications.length > 0 && (
                <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
                  <p className="text-xs text-center text-slate-400">{notifications.length} total</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={handleProfileOpen}
            className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#0F2540] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {adminUser?.username?.charAt(0)?.toUpperCase() || "A"}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-slate-800 leading-none">{adminUser?.username || "Admin"}</p>
              <p className="text-[11px] text-slate-400 leading-none mt-0.5 truncate max-w-[100px]">{adminUser?.email || ""}</p>
            </div>
            <ChevronDown size={13} className="text-slate-400 hidden sm:block" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-12 w-[260px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
              <div className="bg-[#0F2540] px-5 py-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#008C99] flex items-center justify-center text-white text-base font-bold flex-shrink-0">
                  {adminUser?.username?.charAt(0)?.toUpperCase() || "A"}
                </div>
                <div className="min-w-0">
                  <p className="text-white font-semibold text-sm truncate">{adminUser?.username || "Admin"}</p>
                  <p className="text-slate-300 text-xs truncate">{adminUser?.email || "—"}</p>
                  <span className="mt-1 inline-block bg-[#008C99]/30 text-[#008C99] text-[10px] px-2 py-0.5 rounded-full font-medium">
                    Administrator
                  </span>
                </div>
              </div>
              <div className="px-4 py-3 space-y-2.5">
                {[
                  { icon: <User size={14} />, label: "Username", value: adminUser?.username || "—" },
                  { icon: <Mail size={14} />, label: "Email", value: adminUser?.email || "—" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-2.5 text-sm">
                    <span className="text-slate-400 flex-shrink-0">{row.icon}</span>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400">{row.label}</p>
                      <p className="font-medium text-slate-700 truncate text-xs">{row.value}</p>
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-green-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-400">Status</p>
                    <p className="font-medium text-green-600 text-xs">Active</p>
                  </div>
                </div>
              </div>
              <div className="px-4 pb-4 border-t border-gray-100 pt-3">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium text-sm py-2.5 rounded-xl transition-colors"
                >
                  <LogOut size={14} /> Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
