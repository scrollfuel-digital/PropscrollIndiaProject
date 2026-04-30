import React from "react";
import { PlusCircle, X, CheckCircle2, RefreshCw, Phone, MessageSquare, Search, Mail, Users, Wallet, MapPin } from "lucide-react";
import { submitPropertyApi, getAllEnquiriesApi, EnquiryRecord, PropertyPayload, ContactRecord, getAllContactsApi } from "@/src/api/propertyApi";
import PagePath from "../components/PagePath";
import Table, { TableColumn } from "../components/Table";
import axios from "axios";

const propertyTypes = ["Apartment","Plot","Luxury Villa","Row House","Commercial","Warehouse","Industrial","Farm House"];
const cities = ["Nagpur","Mumbai","Pune","Wardha","Amravati","Chandrapur","Akola","Other"];
const EMPTY: PropertyPayload = { name:"", phone:"", email:"", city:"", area:"", type:"", price:"", size:"", description:"" };
const inputCls = "border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#008C99] focus:border-transparent placeholder:text-gray-400 transition-all w-full";

// ── Modal ─────────────────────────────────────────────────────────────────────
function PostPropertyModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [form, setForm] = React.useState<PropertyPayload>(EMPTY);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await submitPropertyApi(form);
      if (data.success) {
        setSuccess(true);
        setTimeout(() => { onSuccess(); onClose(); }, 1500);
      } else setError(data.message);
    } catch (err) {
      setError(axios.isAxiosError(err) ? err.response?.data?.message ?? "Submission failed." : "Something went wrong.");
    } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Add New Property</h2>
            <p className="text-xs text-slate-400">Fill in the details to submit a listing</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5">
          {success && (
            <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-5">
              <CheckCircle2 size={18} className="text-green-600 flex-shrink-0" />
              <p className="text-green-700 text-sm font-semibold">Property submitted successfully!</p>
            </div>
          )}
          {error && <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5"><p className="text-red-600 text-sm">{error}</p></div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <p className="text-xs font-black text-[#008C99] uppercase tracking-widest mb-3">Owner / Agent Info</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name:"name", label:"Full Name", placeholder:"Rajesh Patil", type:"text" },
                  { name:"phone", label:"Phone Number", placeholder:"+91 98765 43210", type:"tel" },
                  { name:"email", label:"Email Address", placeholder:"rajesh@example.com", type:"email" },
                ].map((f) => (
                  <div key={f.name} className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700">{f.label}</label>
                    <input required name={f.name} type={f.type} value={(form as any)[f.name]}
                      onChange={handleChange} placeholder={f.placeholder} className={inputCls} />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-black text-[#008C99] uppercase tracking-widest mb-3">Property Info</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-700">City</label>
                  <select required name="city" value={form.city} onChange={handleChange} className={inputCls}>
                    <option value="">Select city…</option>
                    {cities.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-700">Area / Locality</label>
                  <input required name="area" type="text" value={form.area} onChange={handleChange} placeholder="Wardha Road…" className={inputCls} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-700">Property Type</label>
                  <select required name="type" value={form.type} onChange={handleChange} className={inputCls}>
                    <option value="">Select type…</option>
                    {propertyTypes.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-700">Price (₹)</label>
                  <input required name="price" type="text" value={form.price} onChange={handleChange} placeholder="e.g. 45 Lakhs" className={inputCls} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-700">Size</label>
                  <input required name="size" type="text" value={form.size} onChange={handleChange} placeholder="e.g. 1200 sq.ft" className={inputCls} />
                </div>
              </div>
              <div className="flex flex-col gap-1.5 mt-4">
                <label className="text-sm font-semibold text-slate-700">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={3}
                  placeholder="Key highlights, amenities…" className={`${inputCls} resize-none`} />
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <button type="button" onClick={onClose}
                className="flex-1 py-2.5 border border-gray-200 text-slate-600 font-semibold text-sm rounded-xl hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={loading}
                className="flex-1 py-2.5 bg-[#008C99] hover:bg-[#006e78] disabled:opacity-60 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2">
                {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Submitting…</> : "Submit Listing"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function Leads() {
  const [contacts, setContacts] = React.useState<ContactRecord[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const { data } = await getAllContactsApi();
      if (data.success) setContacts(data.data);
    } catch { /* silent */ }
    finally { setLoading(false); }
  };

  React.useEffect(() => { fetchContacts(); }, []);

  const filtered = contacts.filter((c) =>
    [c.name, c.email, c.phone, c.service, c.location].some((v) =>
      v?.toLowerCase().includes(search.toLowerCase())
    )
  );

  const columns: TableColumn<ContactRecord>[] = [
    {
      key: "no", header: "#", width: "48px",
      render: (_, i) => <span className="text-slate-400 text-xs">{i + 1}</span>,
    },
    {
      key: "name", header: "Name",
      render: (c) => (
        <div>
          <p className="font-semibold text-slate-800">{c.name}</p>
          <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
            <Mail size={10} />{c.email}
          </p>
        </div>
      ),
    },
    {
      key: "phone", header: "Phone",
      render: (c) => (
        <a href={`tel:${c.phone}`} className="flex items-center gap-1 text-slate-600 text-xs hover:text-[#008C99] transition-colors">
          <Phone size={11} />{c.phone}
        </a>
      ),
    },
    {
      key: "service", header: "Service",
      render: (c) => (
        <span className="bg-[#008C99]/10 text-[#008C99] text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap">
          {c.service}
        </span>
      ),
    },
    {
      key: "location", header: "Location",
      render: (c) => (
        <span className="flex items-center gap-1 text-slate-500 text-xs">
          <MapPin size={11} />{c.location}
        </span>
      ),
    },
    {
      key: "budget", header: "Budget",
      render: (c) => (
        <span className="flex items-center gap-1 text-slate-500 text-xs">
          <Wallet size={11} />{c.budgetRange}
        </span>
      ),
    },
    {
      key: "message", header: "Message",
      render: (c) => <p className="text-slate-400 text-xs truncate max-w-[160px]">{c.message}</p>,
    },
    {
      key: "date", header: "Date",
      render: (c) => (
        <span className="text-slate-400 text-xs whitespace-nowrap">
          {c.createdAt ? new Date(c.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "2-digit" }) : "—"}
        </span>
      ),
    },
    {
      key: "action", header: "Action",
      render: (c) => (
        <div className="flex items-center gap-2">
          <a href={`tel:${c.phone}`}
            className="inline-flex items-center gap-1 text-xs text-[#008C99] border border-[#008C99]/30 px-2.5 py-1 rounded-lg hover:bg-[#008C99]/5 transition-colors">
            <Phone size={11} /> Call
          </a>
          <a href={`mailto:${c.email}`}
            className="inline-flex items-center gap-1 text-xs text-slate-500 border border-gray-200 px-2.5 py-1 rounded-lg hover:bg-gray-50 transition-colors">
            <Mail size={11} /> Mail
          </a>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PagePath
        title="Leads"
        subtitle={`${contacts.length} total leads from MongoDB`}
        breadcrumbs={[{ label: "Leads" }]}
        action={
          <button onClick={fetchContacts} disabled={loading}
            className="flex items-center gap-1.5 text-sm text-[#008C99] border border-[#008C99] px-3 py-1.5 rounded-lg hover:bg-[#008C99]/5 transition-colors disabled:opacity-50">
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Leads", value: contacts.length, color: "text-[#008C99]" },
          { label: "Filtered", value: filtered.length, color: "text-[#0F2540]" },
          { label: "Buy Property", value: contacts.filter(c => c.service === "Buy Property").length, color: "text-green-600" },
          { label: "Sell Property", value: contacts.filter(c => c.service === "Sell My Property").length, color: "text-amber-600" },
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
            <Users size={16} className="text-[#008C99]" /> All Leads
          </h2>
          <div className="relative min-w-[240px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, phone, service, location…"
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#008C99] focus:border-transparent placeholder:text-gray-400 transition-all"
            />
          </div>
        </div>

        <Table
          columns={columns}
          data={filtered}
          loading={loading}
          keyExtractor={(c) => c._id}
          emptyIcon={<Users size={40} />}
          emptyText={search ? "No leads match your search." : "No leads yet."}
          pageSize={10}
        />
      </div>
    </div>
  );
}
