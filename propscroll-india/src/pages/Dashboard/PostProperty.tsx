import React from "react";
import { useNavigate } from "react-router-dom";

const PostProperty: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = React.useState({
    name: "", phone: "", email: "", city: "", area: "",
    type: "", price: "", size: "", description: "",
  });
  const [submitted, setSubmitted] = React.useState(false);

  const propertyTypes = [
    "Apartment", "Plot", "Luxury Villa", "Row House",
    "Commercial", "Warehouse", "Industrial", "Farm House",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  if (submitted)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-12 text-center max-w-md shadow-xl border border-gray-100">
          <span className="text-6xl block mb-4">🎉</span>
          <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Property Listed!</h2>
          <p className="text-slate-500 text-sm mb-6">
            Our team will review and publish your listing within 24 hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-teal-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-teal-700 transition-colors"
          >
            List Another Property
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 py-16 px-6 text-center">
        <span className="inline-block bg-white/20 text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
          Free Listing · No Commission
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
          Post Your <span className="text-amber-400">Property</span>
        </h1>
        <p className="text-slate-300 max-w-xl mx-auto">
          Reach 10,000+ verified buyers across Maharashtra. Free listing, zero brokerage.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-extrabold text-slate-800 mb-6">Property Details</h2>
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <div className="md:col-span-2">
              <p className="text-xs font-black text-teal-600 uppercase tracking-widest mb-3">Owner / Agent Info</p>
            </div>
            {[
              { name: "name", label: "Full Name", placeholder: "Rajesh Patil", type: "text" },
              { name: "phone", label: "Phone Number", placeholder: "+91 98765 43210", type: "tel" },
              { name: "email", label: "Email Address", placeholder: "rajesh@example.com", type: "email" },
            ].map((f) => (
              <div key={f.name} className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-slate-700">{f.label}</label>
                <input
                  required name={f.name} type={f.type}
                  value={(form as any)[f.name]} onChange={handleChange}
                  placeholder={f.placeholder}
                  className="border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-slate-400"
                />
              </div>
            ))}

            <div className="md:col-span-2 mt-2">
              <p className="text-xs font-black text-teal-600 uppercase tracking-widest mb-3">Property Info</p>
            </div>
            {[
              { name: "city", label: "City", placeholder: "Mumbai, Pune, Nagpur…" },
              { name: "area", label: "Area / Locality", placeholder: "Koregaon Park, Andheri…" },
              { name: "price", label: "Price (₹)", placeholder: "e.g. 45 Lakhs, 1.2 Crore" },
              { name: "size", label: "Size", placeholder: "e.g. 1200 sq.ft, 300 sq.yd" },
            ].map((f) => (
              <div key={f.name} className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-slate-700">{f.label}</label>
                <input
                  required name={f.name} type="text"
                  value={(form as any)[f.name]} onChange={handleChange}
                  placeholder={f.placeholder}
                  className="border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-slate-400"
                />
              </div>
            ))}

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-slate-700">Property Type</label>
              <select
                required name="type" value={form.type} onChange={handleChange}
                className="border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                <option value="">Select type…</option>
                {propertyTypes.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-sm font-semibold text-slate-700">Description</label>
              <textarea
                name="description" value={form.description} onChange={handleChange} rows={4}
                placeholder="Describe your property — key highlights, amenities, nearby landmarks…"
                className="border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none placeholder-slate-400"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-extrabold text-base rounded-xl hover:opacity-90 transition-opacity shadow-md"
              >
                🚀 Submit Free Listing
              </button>
              <p className="text-xs text-slate-400 text-center mt-2">No charges. No hidden fees. Published within 24 hrs.</p>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8">
          {[
            { icon: "🆓", title: "100% Free", desc: "No listing fee ever" },
            { icon: "👥", title: "10K+ Buyers", desc: "Verified audience" },
            { icon: "⚡", title: "24hr Review", desc: "Fast publishing" },
          ].map((b) => (
            <div key={b.title} className="bg-white rounded-2xl p-5 text-center border border-gray-100 shadow-sm">
              <span className="text-3xl block mb-2">{b.icon}</span>
              <p className="font-extrabold text-slate-800 text-sm">{b.title}</p>
              <p className="text-xs text-slate-400 mt-1">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostProperty;
