import { useAtomValue } from "jotai";
import { PhoneCall, Mail, Users, MessageSquare, RefreshCw, MapPin, Wallet } from "lucide-react";
import { useDashboard } from "@/src/hooks/useDashboard";
import { dashboardLoadingAtom, dashboardErrorAtom } from "@/src/state/dashboardState";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  const { stats, fetchStats } = useDashboard();
  const isLoading = useAtomValue(dashboardLoadingAtom);
  const error = useAtomValue(dashboardErrorAtom);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-sm text-slate-500">Live data from MongoDB</p>
        </div>
        <button
          onClick={fetchStats}
          disabled={isLoading}
          className="flex items-center gap-2 text-sm text-[#008C99] border border-[#008C99] px-3 py-1.5 rounded-lg hover:bg-[#008C99]/5 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Contacts"
          value={isLoading ? "..." : stats?.totalContacts ?? 0}
          icon={Users}
          color="teal"
        />
        <StatCard
          title="Total Enquiries"
          value={isLoading ? "..." : stats?.totalEnquiries ?? 0}
          icon={MessageSquare}
          color="blue"
        />
        <StatCard
          title="This Month Contacts"
          value={isLoading ? "..." : stats?.recentContacts?.length ?? 0}
          icon={Mail}
          color="purple"
        />
        <StatCard
          title="Recent Enquiries"
          value={isLoading ? "..." : stats?.recentEnquiries?.length ?? 0}
          icon={PhoneCall}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contacts */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-base font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <Mail size={16} className="text-[#008C99]" /> Recent Contacts
          </h2>
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : !stats?.recentContacts?.length ? (
            <p className="text-sm text-slate-400 text-center py-6">No contacts yet.</p>
          ) : (
            <div className="overflow-x-auto -mx-5 px-5">
              <table className="w-full text-sm text-left min-w-[480px]">
                <thead>
                  <tr className="text-slate-400 border-b text-xs uppercase tracking-wide">
                    <th className="pb-3 pr-4 font-medium whitespace-nowrap">Name</th>
                    <th className="pb-3 pr-4 font-medium whitespace-nowrap">Phone</th>
                    <th className="pb-3 pr-4 font-medium whitespace-nowrap">Service</th>
                    <th className="pb-3 font-medium whitespace-nowrap">Budget</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {stats.recentContacts.map((c) => (
                    <tr key={c._id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 pr-4 whitespace-nowrap">
                        <p className="font-medium text-slate-800">{c.name}</p>
                        <p className="text-xs text-slate-400">{c.email}</p>
                      </td>
                      <td className="py-3 pr-4 text-slate-500 whitespace-nowrap">
                        <span className="flex items-center gap-1">
                          <PhoneCall size={12} /> {c.phone}
                        </span>
                      </td>
                      <td className="py-3 pr-4 whitespace-nowrap">
                        <span className="bg-[#008C99]/10 text-[#008C99] text-xs px-2 py-0.5 rounded-full">
                          {c.service}
                        </span>
                      </td>
                      <td className="py-3 whitespace-nowrap">
                        <span className="flex items-center gap-1 text-slate-500 text-xs">
                          <Wallet size={12} /> {c.budgetRange}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Enquiries */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-base font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <MessageSquare size={16} className="text-[#008C99]" /> Recent Enquiries
          </h2>
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : !stats?.recentEnquiries?.length ? (
            <p className="text-sm text-slate-400 text-center py-6">No enquiries yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.recentEnquiries.map((e) => (
                <div key={e._id} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-[#0F2540] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {e.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-slate-800 text-sm">{e.name}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <PhoneCall size={11} /> {e.phone}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">{e.details}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Location breakdown from contacts */}
      {stats?.recentContacts && stats.recentContacts.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-base font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <MapPin size={16} className="text-[#008C99]" /> Contact Locations
          </h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(
              stats.recentContacts.reduce<Record<string, number>>((acc, c) => {
                acc[c.location] = (acc[c.location] || 0) + 1;
                return acc;
              }, {})
            ).map(([loc, count]) => (
              <span key={loc} className="flex items-center gap-1.5 bg-[#0F2540]/5 text-[#0F2540] text-xs px-3 py-1.5 rounded-full font-medium">
                <MapPin size={11} /> {loc}
                <span className="bg-[#0F2540] text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">{count}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
