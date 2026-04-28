import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const pageTitles: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/properties": "Properties",
  "/admin/add-property": "Add Property",
  "/admin/leads": "Leads",
  "/admin/agents": "Agents",
  "/admin/categories": "Categories",
  "/admin/analytics": "Analytics",
  "/admin/settings": "Settings",
};

export default function AdminLayout() {
  const { pathname } = useLocation();
  const title = pageTitles[pathname] ?? "Admin";

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
