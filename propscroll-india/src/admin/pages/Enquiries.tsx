import React from "react";
import { MessageSquare, Phone, RefreshCw, Search } from "lucide-react";
import { getAllEnquiriesApi, EnquiryRecord } from "@/src/api/propertyApi";
import PagePath from "../components/PagePath";
import Table, { TableColumn } from "../components/Table";

export default function Enquiries() {
  const [enquiries, setEnquiries] = React.useState<EnquiryRecord[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const { data } = await getAllEnquiriesApi();
      if (data.success) setEnquiries(data.data);
    } catch { /* silent */ }
    finally { setLoading(false); }
  };

  React.useEffect(() => { fetchEnquiries(); }, []);

  const filtered = enquiries.filter((e) =>
    [e.name, e.phone, e.details].some((v) =>
      v?.toLowerCase().includes(search.toLowerCase())
    )
  );

  const columns: TableColumn<EnquiryRecord>[] = [
    {
      key: "no", header: "#", width: "48px",
      render: (_, i) => <span className="text-slate-400 text-xs">{i + 1}</span>,
    },
    {
      key: "name", header: "Name",
      render: (e) => <p className="font-semibold text-slate-800 text-sm">{e.name}</p>,
    },
    {
      key: "phone", header: "Phone",
      render: (e) => (
        <a href={`tel:${e.phone}`} className="flex items-center gap-1 text-slate-600 text-xs hover:text-[#008C99] transition-colors">
          <Phone size={11} /> {e.phone}
        </a>
      ),
    },
    {
      key: "details", header: "Details",
      render: (e) => {
        // Parse "Property: X | Location: Y | Message: Z"
        const parts: Record<string, string> = {};
        e.details?.split("|").forEach((seg) => {
          const [k, ...v] = seg.split(":");
          if (k && v.length) parts[k.trim()] = v.join(":").trim();
        });
        return (
          <div className="space-y-0.5 max-w-xs">
            {parts["Property"] && (
              <p className="text-xs font-semibold text-slate-700 truncate">{parts["Property"]}</p>
            )}
            {parts["Location"] && (
              <p className="text-xs text-slate-400 truncate">{parts["Location"]}</p>
            )}
            {parts["Message"] && (
              <p className="text-xs text-slate-500 truncate italic">{parts["Message"]}</p>
            )}
            {!parts["Property"] && (
              <p className="text-xs text-slate-400 truncate max-w-[200px]">{e.details}</p>
            )}
          </div>
        );
      },
    },
    {
      key: "action", header: "Action",
      render: (e) => (
        <a
          href={`tel:${e.phone}`}
          className="inline-flex items-center gap-1 text-xs text-[#008C99] border border-[#008C99]/30 px-2.5 py-1 rounded-lg hover:bg-[#008C99]/5 transition-colors"
        >
          <Phone size={11} /> Call
        </a>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PagePath
        title="Enquiries"
        subtitle={`${enquiries.length} total enquiries from properties`}
        breadcrumbs={[{ label: "Enquiries" }]}
        action={
          <button
            onClick={fetchEnquiries}
            disabled={loading}
            className="flex items-center gap-1.5 text-sm text-[#008C99] border border-[#008C99] px-3 py-1.5 rounded-lg hover:bg-[#008C99]/5 transition-colors disabled:opacity-50"
          >
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Enquiries", value: enquiries.length, color: "text-[#008C99]" },
          { label: "Filtered", value: filtered.length, color: "text-[#0F2540]" },
          { label: "This Session", value: enquiries.length, color: "text-green-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-slate-400 font-medium">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2 mr-auto">
            <MessageSquare size={16} className="text-[#008C99]" /> All Enquiries
          </h2>
          <div className="relative min-w-[240px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, phone, details…"
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#008C99] focus:border-transparent placeholder:text-gray-400 transition-all"
            />
          </div>
        </div>

        <Table
          columns={columns}
          data={filtered}
          loading={loading}
          keyExtractor={(e) => e._id}
          emptyIcon={<MessageSquare size={40} />}
          emptyText={search ? "No enquiries match your search." : "No enquiries yet."}
          pageSize={10}
        />
      </div>
    </div>
  );
}
