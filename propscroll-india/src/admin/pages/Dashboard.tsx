import { Building2, Users, UserCheck, TrendingUp } from "lucide-react";
import StatCard from "../components/StatCard";

const recentLeads = [
  { name: "Rahul Sharma", phone: "98765XXXXX", property: "3BHK Pune", date: "Today" },
  { name: "Priya Mehta", phone: "91234XXXXX", property: "Plot Nashik", date: "Yesterday" },
  { name: "Amit Joshi", phone: "87654XXXXX", property: "2BHK Mumbai", date: "2 days ago" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Total Properties" value="120" icon={Building2} color="teal" />
        <StatCard title="Total Leads" value="45" icon={Users} color="blue" />
        <StatCard title="Agents" value="8" icon={UserCheck} color="purple" />
        <StatCard title="Sold This Month" value="12" icon={TrendingUp} color="orange" />
      </div>

      {/* Recent Leads Table */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="text-base font-semibold text-slate-700 mb-4">Recent Leads</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-slate-500 border-b">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Phone</th>
                <th className="pb-3 font-medium">Property</th>
                <th className="pb-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentLeads.map((lead, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="py-3 text-slate-800 font-medium">{lead.name}</td>
                  <td className="py-3 text-slate-500">{lead.phone}</td>
                  <td className="py-3 text-slate-600">{lead.property}</td>
                  <td className="py-3 text-slate-400">{lead.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
