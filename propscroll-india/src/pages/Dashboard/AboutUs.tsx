import React from "react";

const COLORS = {
  NAVY: "#0F2540",
  TEAL: "#008C99",
  MUSTARD: "#FCC02E",
  RED: "#D63528",
  WHITE: "#FFFFFF",
  GRAY: "#F3F4F6",
};

export default function AboutUs() {
  const stats = [
    { value: "200+", label: "Agent Network" },
    { value: "50+", label: "Legal Partners" },
    { value: "15+", label: "Bank Tie-Ups" },
    { value: "4.5★", label: "Customer Rating" },
    { value: "₹24Cr+", label: "Year-1 Revenue Target" },
    { value: "24×7", label: "Customer Support" },
  ];

  const values = [
    {
      icon: "🛡️",
      title: "Trust & Transparency",
      desc: "Every transaction is legally verified with a 30-year title chain check, RERA compliance, and full documentation support.",
    },
    {
      icon: "⚡",
      title: "Speed & Efficiency",
      desc: "We complete property transactions in 30–45 days and government approvals 40–50% faster than industry standard.",
    },
    {
      icon: "🤖",
      title: "PropTech Innovation",
      desc: "AI-powered pricing engine and CRM ensure data-driven decisions for buyers, sellers, and investors alike.",
    },
    {
      icon: "🤝",
      title: "Win-Win Partnerships",
      desc: "Our JV models — area sharing, revenue sharing, and hybrid — are designed for mutual prosperity with 80%+ success rate.",
    },
    {
      icon: "📍",
      title: "Maharashtra-Wide Reach",
      desc: "From remote villages to metro cities — our 200+ agent network covers every district across Maharashtra.",
    },
    {
      icon: "📈",
      title: "Investor-First Returns",
      desc: "We target 12–18% annual returns with portfolios built for conservative, moderate, and aggressive investor profiles.",
    },
  ];

  const team = [
    {
      name: "Smiit Pillewar",
      role: "Founder & CEO",
      exp: "9 yrs Real Estate",
      img: "/smit.jpg",
    },
    {
      name: "Akshay Zade",
      role: "Co-founder & MD",
      exp: "6 yrs Real Estate",
      img: "/founderimage.jpeg",
    },
  ];

  const milestones = [
    { year: "2020", event: "Founded in Nagpur, Maharashtra" },
    { year: "2021", event: "Expanded to 5 districts, 50+ agents onboarded" },
    { year: "2022", event: "Launched PropTech CRM & AI pricing engine" },
    { year: "2023", event: "Crossed ₹100 Crore in transactions facilitated" },
    { year: "2024", event: "Pan-Maharashtra coverage — all 36 districts" },
    { year: "2025", event: "Targeting ₹24 Crore revenue, 200+ agent network" },
  ];

  return (
    <div className="min-h-screen font-sans bg-white text-[#0F2540]">
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden px-6 py-24"
        style={{ background: `linear-gradient(135deg, ${COLORS.NAVY} 0%, #1a3a5c 60%, #1e4976 100%)` }}
      >
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-[0.08]" style={{ background: COLORS.MUSTARD }} />
        <div className="absolute -bottom-16 -left-16 w-60 h-60 rounded-full opacity-[0.12]" style={{ background: COLORS.TEAL }} />
        <div className="absolute top-0 left-0 right-0 h-[5px]" style={{ background: `linear-gradient(90deg, ${COLORS.RED} 0%, ${COLORS.MUSTARD} 50%, ${COLORS.TEAL} 100%)` }} />

        <div className="relative z-10 max-w-[860px] mx-auto text-center">
          <span className="inline-block px-[18px] py-[5px] rounded-full text-[11px] font-bold tracking-[0.1em] uppercase" style={{ background: "rgba(252,192,46,0.18)", color: COLORS.MUSTARD, border: "1px solid rgba(252,192,46,0.4)" }}>
            Maharashtra's Trusted Real Estate Partner
          </span>
          <h1 className="font-extrabold text-white leading-[1.08] tracking-tight my-6" style={{ fontSize: "clamp(42px, 6vw, 68px)" }}>
            About <span style={{ color: COLORS.MUSTARD }}>PropScroll</span>{" "}
            <span style={{ color: COLORS.TEAL }}>India</span>
          </h1>
          <p className="text-[rgba(255,255,255,0.72)] text-lg max-w-[580px] mx-auto leading-[1.65]">
            A tech-driven, end-to-end real estate solutions company serving buyers, sellers, developers, and investors across all 36 districts of Maharashtra — from village plots to metro skyscrapers.
          </p>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-white border-b border-gray-100 px-6 py-10 shadow-[0_4px_16px_rgba(15,37,64,0.06)]">
        <div className="max-w-[1100px] mx-auto grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-6 text-center">
          {stats.map((s, i) => (
            <div key={i} className="pt-3 border-t-[3px]" style={{ borderColor: COLORS.MUSTARD }}>
              <p className="text-3xl font-extrabold text-[#0F2540]">{s.value}</p>
              <p className="text-[11px] text-gray-500 mt-1 font-semibold tracking-[0.04em] uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Who We Are ── */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block w-9 h-1 rounded bg-[#FCC02E] mb-3" />
            <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#008C99] mb-2">Who We Are</p>
            <h2 className="font-extrabold text-[#0F2540] leading-[1.15] mb-5" style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}>
              Maharashtra's Most Complete<br />Real Estate Platform
            </h2>
            <p className="text-gray-600 leading-[1.75] mb-4 text-[15px]">
              PropScrollIndia Real Estate Global Mall is a B2B + B2C real estate solutions provider covering the entire state of Maharashtra — from remote villages to tier-1 metro cities like Mumbai, Pune, Nashik, and Nagpur.
            </p>
            <p className="text-gray-600 leading-[1.75] mb-7 text-[15px]">
              We operate across six core verticals: property buying & selling, government liaisoning & approvals, joint venture structuring, project marketing, exclusive sales management, and investment advisory — all powered by proprietary PropTech CRM and an AI-based pricing engine.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {["B2B + B2C", "36 Districts", "AI-Powered", "RERA Compliant", "24×7 Support"].map((tag) => (
                <span key={tag} className="inline-block px-[14px] py-[5px] rounded-full text-[11px] font-bold tracking-[0.04em] uppercase border-2" style={{ borderColor: COLORS.TEAL, color: COLORS.TEAL }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl p-9 text-white" style={{ background: COLORS.NAVY }}>
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-[0.15]" style={{ background: COLORS.TEAL }} />
            <p className="text-[11px] font-bold tracking-[0.1em] uppercase mb-7" style={{ color: COLORS.MUSTARD }}>Our Business Model</p>
            <div className="flex flex-col gap-[18px]">
              {[
                { label: "Property Buying & Selling", pct: 90 },
                { label: "Liaisoning & Approvals", pct: 75 },
                { label: "Investment Management", pct: 65 },
                { label: "Project Marketing", pct: 80 },
                { label: "Exclusive Sales", pct: 70 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[13px] mb-1.5">
                    <span className="text-white/75">{item.label}</span>
                    <span className="font-bold" style={{ color: COLORS.MUSTARD }}>{item.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden bg-white/10">
                    <div className="h-full rounded-full transition-[width] duration-700" style={{ width: `${item.pct}%`, background: `linear-gradient(90deg, ${COLORS.TEAL}, ${COLORS.MUSTARD})` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Values ── */}
      <section className="px-6 py-24 bg-gray-100">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block w-9 h-1 rounded bg-[#FCC02E] mb-3" />
            <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#008C99] mb-2">What Drives Us</p>
            <h2 className="font-extrabold text-[#0F2540]" style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}>Our Core Values</h2>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-white rounded-[20px] px-6 py-7 shadow-[0_2px_8px_rgba(15,37,64,0.06)] hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(15,37,64,0.1)] transition-all duration-200 border-t-4"
                style={{ borderColor: i % 3 === 0 ? COLORS.TEAL : i % 3 === 1 ? COLORS.MUSTARD : COLORS.RED }}
              >
                <span className="text-4xl block mb-4">{v.icon}</span>
                <h3 className="text-[17px] font-extrabold text-[#0F2540] mb-2.5">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-[1.7]">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-[680px] mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block w-9 h-1 rounded bg-[#FCC02E] mb-3" />
            <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#008C99] mb-2">Our Journey</p>
            <h2 className="font-extrabold text-[#0F2540]" style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}>Milestones</h2>
          </div>
          <div className="relative pl-10">
            <div className="absolute left-[14px] top-0 bottom-0 w-0.5 opacity-30" style={{ background: `linear-gradient(to bottom, ${COLORS.TEAL}, ${COLORS.MUSTARD})` }} />
            <div className="flex flex-col gap-7">
              {milestones.map((m, i) => (
                <div key={i} className="flex gap-5 items-start relative">
                  <div
                    className="absolute -left-[7px] top-[18px] w-3.5 h-3.5 rounded-full border-[3px] border-white z-10"
                    style={{ background: i === milestones.length - 1 ? COLORS.MUSTARD : COLORS.TEAL, boxShadow: `0 0 0 3px ${i === milestones.length - 1 ? COLORS.MUSTARD : COLORS.TEAL}33` }}
                  />
                  <div
                    className="min-w-[56px] h-10 rounded-[10px] flex items-center justify-center text-xs font-extrabold shrink-0"
                    style={{ background: i === milestones.length - 1 ? COLORS.NAVY : COLORS.GRAY, color: i === milestones.length - 1 ? COLORS.MUSTARD : COLORS.NAVY }}
                  >
                    {m.year}
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-[18px] py-2.5 flex-1">
                    <p className="text-sm font-semibold text-[#0F2540]">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="px-6 py-24" style={{ background: COLORS.NAVY }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block w-9 h-1 rounded mb-3" style={{ background: COLORS.MUSTARD }} />
            <p className="text-[11px] font-bold tracking-[0.12em] uppercase mb-2" style={{ color: COLORS.TEAL }}>The People Behind It</p>
            <h2 className="font-extrabold text-white" style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}>Our Leadership Founders</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {team.map((t, i) => (
              <div
                key={i}
                className="w-[260px] rounded-[24px] overflow-hidden text-center backdrop-blur-sm hover:-translate-y-2 hover:shadow-[0_20px_48px_rgba(0,0,0,0.35)] transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                {/* Photo */}
                <div className="relative w-full h-[220px] overflow-hidden" style={{ background: "linear-gradient(160deg,#1a3a5c,#0F2540)" }}>
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&size=260&background=0F2540&color=FCC02E&bold=true&font-size=0.4`;
                    }}
                  />
                  {/* gradient overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: "linear-gradient(to top, rgba(15,37,64,0.9), transparent)" }} />
                </div>

                {/* Info */}
                <div className="px-6 py-5">
                  <h3 className="font-extrabold text-white text-[17px] mb-1">{t.name}</h3>
                  <p className="text-[12px] font-bold mb-2" style={{ color: COLORS.MUSTARD }}>{t.role}</p>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.06em] uppercase"
                    style={{ background: "rgba(0,140,153,0.2)", color: COLORS.TEAL, border: `1px solid ${COLORS.TEAL}44` }}
                  >
                    {t.exp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
