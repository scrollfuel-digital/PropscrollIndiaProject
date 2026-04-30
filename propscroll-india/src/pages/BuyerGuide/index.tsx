import React from "react";

const BuyerGuide: React.FC = () => {
  const steps = [
    { icon: "🔍", title: "Research the Market", desc: "Study current property prices in your target area. Use our price trends tool to understand quarterly appreciation rates." },
    { icon: "💰", title: "Set Your Budget", desc: "Factor in stamp duty (5–7%), registration (1%), GST, and maintenance. Use our EMI calculator to plan finances." },
    { icon: "📋", title: "Legal Due Diligence", desc: "Verify 30-year title chain, encumbrance certificate, RERA registration, OC/CC, society NOC, and 7/12 extract." },
    { icon: "🤝", title: "Negotiate the Right Way", desc: "Compare 3–5 similar properties. Check circle rates. Negotiate payment schedule and possession date in writing." },
    { icon: "📝", title: "Documentation", desc: "Agreement to Sell → Sale Deed → Stamp Duty Payment → Registration. Ensure TDS compliance under Section 194IA." },
    { icon: "🏠", title: "Post-Registration", desc: "Update property card, transfer utility connections, apply for home loan transfer if applicable." },
  ];

  const stampDuty = [
    { city: "Mumbai", rate: "5%", extra: "+ 1% Metro Cess" },
    { city: "Pune", rate: "6%", extra: "+ 1% Local Body Tax" },
    { city: "Nagpur", rate: "5%", extra: "+ 1% Registration" },
    { city: "Other", rate: "3–7%", extra: "Varies by district" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 py-16 px-6 text-center">
        <span className="inline-block bg-white/20 text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
          Maharashtra · Legal Guide
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
          Buyer's <span className="text-amber-400">Guide</span>
        </h1>
        <p className="text-slate-300 max-w-xl mx-auto">
          Everything you need to know before buying property in Maharashtra — simplified.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 mb-6">6-Step Buying Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {steps.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-2xl shrink-0">
                  {s.icon}
                </div>
                <div>
                  <span className="text-xs font-extrabold text-teal-600">Step {i + 1}</span>
                  <h3 className="font-extrabold text-slate-800 mb-1">{s.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-extrabold text-slate-800">Stamp Duty Rates — Maharashtra</h2>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="text-left px-6 py-3 font-semibold">City</th>
                <th className="text-left px-6 py-3 font-semibold">Stamp Duty</th>
                <th className="text-left px-6 py-3 font-semibold">Additional</th>
              </tr>
            </thead>
            <tbody>
              {stampDuty.map((r, i) => (
                <tr key={r.city} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-6 py-3 font-semibold text-slate-700">{r.city}</td>
                  <td className="px-6 py-3 font-extrabold text-teal-600">{r.rate}</td>
                  <td className="px-6 py-3 text-slate-500">{r.extra}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
          <h2 className="font-extrabold text-slate-800 mb-4">⚠️ Critical Legal Checks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "7/12 Extract (Satbara Utara)", "Encumbrance Certificate (EC)",
              "RERA Registration Number", "Occupancy Certificate (OC)",
              "Commencement Certificate (CC)", "Society NOC / Share Certificate",
              "30-year Title Chain Verification", "TDS Compliance (Section 194IA)",
            ].map((c) => (
              <div key={c} className="flex items-center gap-2 text-sm text-slate-700">
                <span className="text-teal-600 font-extrabold">✓</span> {c}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerGuide;
