import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

// ── Color Theme ───────────────────────────────────────────────────────────────
const C = {
  NAVY: "#0F2540",
  TEAL: "#008C99",
  MUSTARD: "#FCC02E",
  RED: "#D63528",
  WHITE: "#FFFFFF",
  GRAY: "#F3F4F6",
};

// ── TypeScript Interfaces ─────────────────────────────────────────────────────
interface Stage {
  label: string;
  items: string[];
}
interface PricingRow {
  range: string;
  commission: string;
  dueDiligence: string;
}
interface TimelineRow {
  approval: string;
  std: string;
  ours: string;
  saved: string;
}
interface MetricItem {
  label: string;
  value: string;
}
interface InvestorProfile {
  type: string;
  returns: string;
  bg: string;
  color: string;
}
interface Service {
  id: number;
  icon: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  stages: Stage[];
  kpis: string[];
  badge: string;
  badgeColor?: string;
  pricing?: PricingRow[];
  timeline?: TimelineRow[];
  metrics?: MetricItem[];
  profiles?: InvestorProfile[];
}

// ── Service Data ──────────────────────────────────────────────────────────────
const services: Service[] = [
  {
    id: 1,
    icon: "🏠",
    badge: "Most Popular",
    badgeColor: C.TEAL,
    title: "Property Buying & Selling",
    shortDesc:
      "End-to-end transactions completed in 30–45 days with full legal security.",
    fullDesc:
      "We create a trusted bridge between buyers and sellers across Maharashtra. From market valuation to post-registration record updates — every step is handled by experts.",
    stages: [
      {
        label: "Pre-Purchase / Sale",
        items: [
          "Market Rate Analysis",
          "Property Shortlisting (5–8 options)",
          "Technical Inspection",
        ],
      },
      {
        label: "Due Diligence",
        items: [
          "30-year Title Chain Verification",
          "EC / Society NOC / Share Certificate",
          "RERA / OC / CC Check",
        ],
      },
      {
        label: "Documentation",
        items: [
          "Agreement to Sell / Sale Deed",
          "Stamp Duty Calculation",
          "TDS Section 194IA Compliance",
        ],
      },
    ],
    pricing: [
      { range: "Up to ₹25 Lakhs", commission: "2%", dueDiligence: "₹15,000" },
      { range: "₹25 – ₹50 Lakhs", commission: "1.5%", dueDiligence: "₹25,000" },
      { range: "₹50 Lakhs+", commission: "1%", dueDiligence: "0.1%" },
    ],
    kpis: [
      "25–30% Lead Conversion",
      "35–45 Day Cycle",
      "<5% Post-Sale Issues",
      "4.5★ Satisfaction",
    ],
  },
  {
    id: 2,
    icon: "📋",
    badge: "B2B Specialist",
    badgeColor: C.NAVY,
    title: "Liaisoning & Approvals",
    shortDesc: "40–50% faster government clearances with 100% compliance.",
    fullDesc:
      "We handle municipal, state, and special department approvals on your behalf — saving developers significant time and ensuring zero penalties.",
    stages: [
      {
        label: "Municipal Level",
        items: [
          "Plan Approval (DP, FSI, Coverage)",
          "Commencement Certificate (CC)",
          "Occupancy Certificate (OC)",
        ],
      },
      {
        label: "State Level",
        items: [
          "Environmental Clearance (EC)",
          "CRZ Clearance",
          "RERA Registration (15–20 days)",
        ],
      },
      {
        label: "Special Dept.",
        items: ["Fire NOC", "Aviation NOC", "Tree Authority Permission"],
      },
    ],
    timeline: [
      {
        approval: "Plan Approval",
        std: "45–60 days",
        ours: "25–35 days",
        saved: "40%",
      },
      { approval: "CC", std: "30–45 days", ours: "20–25 days", saved: "35%" },
      { approval: "OC", std: "60–90 days", ours: "35–45 days", saved: "45%" },
      { approval: "RERA", std: "30 days", ours: "15–20 days", saved: "40%" },
    ],
    kpis: [
      "100% Compliance",
      "40% Time Saved",
      "Zero Penalties",
      "All Maharashtra",
    ],
  },
  {
    id: 3,
    icon: "🤝",
    badge: "Developer Exclusive",
    badgeColor: C.MUSTARD,
    title: "Joint Venture & Partnership",
    shortDesc:
      "Win-win models for landowners and developers with 80%+ success rate.",
    fullDesc:
      "We structure transparent JV agreements that protect both parties — with proven models across area sharing, revenue sharing, and hybrid arrangements.",
    stages: [
      {
        label: "JV Models",
        items: [
          "Area Sharing: 40–50% / 50–60%",
          "Revenue Sharing: 30–40% / 60–70%",
          "Hybrid: Guaranteed Return + Bonus",
        ],
      },
      {
        label: "Process",
        items: [
          "Land Valuation & Feasibility Study",
          "Legal Agreement Structuring",
          "Revenue / Area Distribution",
        ],
      },
      {
        label: "Support",
        items: [
          "Dedicated JV Manager",
          "Milestone-based Monitoring",
          "Dispute Resolution Assistance",
        ],
      },
    ],
    kpis: [
      "80%+ Success Rate",
      "Transparent Splits",
      "Legal Safeguards",
      "Win-Win Model",
    ],
  },
  {
    id: 4,
    icon: "📢",
    badge: "360° Marketing",
    badgeColor: C.RED,
    title: "Project Marketing & Promotion",
    shortDesc: "360° digital + offline campaigns delivering 8:1 to 15:1 ROMI.",
    fullDesc:
      "We generate qualified leads at scale for developers using a performance-first approach — Google Ads, social media, SEO, property exhibitions, and WhatsApp campaigns.",
    stages: [
      {
        label: "Digital",
        items: [
          "Google Ads: ₹50K–₹2L/month",
          "Facebook & Instagram Campaigns",
          "SEO Blogs & YouTube Marketing",
        ],
      },
      {
        label: "Offline",
        items: [
          "Property Exhibitions",
          "Home Buyer Seminars",
          "Newspaper Ads & Hoardings",
        ],
      },
      {
        label: "Performance",
        items: [
          "1000 Leads / Month Target",
          "Lead Nurturing via WhatsApp CRM",
          "Monthly ROI Reporting",
        ],
      },
    ],
    metrics: [
      { label: "Cost Per Lead", value: "₹500–₹1,200" },
      { label: "Lead → Visit", value: "15–25%" },
      { label: "Visit → Booking", value: "12–20%" },
      { label: "ROMI", value: "8:1 – 15:1" },
    ],
    kpis: ["1000 Leads/Month", "CPL ₹500–₹1200", "ROMI 8–15×", "360° Coverage"],
  },
  {
    id: 5,
    icon: "🏗️",
    badge: "Developer Partner",
    badgeColor: C.NAVY,
    title: "Exclusive Sales (Sole Selling)",
    shortDesc: "85–95% of inventory sold within 18–24 months.",
    fullDesc:
      "As your exclusive sales partner, we deploy a structured funnel to convert leads into bookings — optimising developer cash flow and minimising unsold inventory.",
    stages: [
      {
        label: "Sales Funnel",
        items: [
          "1,000 Leads Generated / Month",
          "200–300 Qualified Leads Filtered",
          "60–100 Curated Site Visits",
        ],
      },
      {
        label: "Conversion",
        items: [
          "12–20 Confirmed Bookings / Month",
          "Negotiation & Price Optimisation",
          "Token & Agreement Management",
        ],
      },
      {
        label: "Reporting",
        items: [
          "Weekly Sales Dashboard",
          "Inventory Tracker",
          "Cash Flow Projection Reports",
        ],
      },
    ],
    kpis: [
      "85–95% Inventory Sold",
      "18–24 Month Target",
      "12–20 Bookings/Mo",
      "Optimised Cash Flow",
    ],
  },
  {
    id: 6,
    icon: "📈",
    badge: "High Returns",
    badgeColor: C.TEAL,
    title: "Investment Management",
    shortDesc: "12–18% annual returns on ₹50 Lakh to ₹50 Crore portfolios.",
    fullDesc:
      "We curate real estate investment portfolios tailored to your risk profile — residential, commercial, or development funding — with AI-backed due diligence.",
    stages: [
      {
        label: "Asset Classes",
        items: [
          "Residential: 3–6% Yield + 8–12% Appreciation",
          "Commercial: 6–10% Rental Yield",
          "Development Funding: IRR 18–25%",
        ],
      },
      {
        label: "Profiles",
        items: [
          "Conservative: 8–12% Returns",
          "Moderate: 12–15% Returns",
          "Aggressive: 18–25% Returns",
        ],
      },
      {
        label: "Support",
        items: [
          "AI-Powered Property Pricing",
          "Portfolio Review Quarterly",
          "Exit Strategy Planning",
        ],
      },
    ],
    profiles: [
      { type: "Conservative", returns: "8–12%", bg: "#E6F7F8", color: C.TEAL },
      { type: "Moderate", returns: "12–15%", bg: "#FFFBEB", color: "#B45309" },
      { type: "Aggressive", returns: "18–25%", bg: "#FEF2F2", color: C.RED },
    ],
    kpis: [
      "12–18% Avg Returns",
      "₹50L – ₹50Cr Range",
      "AI Pricing Engine",
      "Quarterly Reviews",
    ],
  },
];

// ── Styles ────────────────────────────────────────────────────────────────────
const globalStyles = `
  .svc-root { font-family: 'Plus Jakarta Sans', sans-serif; background: ${C.GRAY}; color: ${C.NAVY}; }

  .svc-card {
    background: ${C.WHITE};
    border: 2px solid transparent;
    border-radius: 16px;
    padding: 18px 20px;
    cursor: pointer;
    transition: all 0.18s ease;
    position: relative;
    overflow: hidden;
  }
  .svc-card::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 4px;
    background: transparent;
    transition: background 0.18s ease;
    border-radius: 16px 0 0 16px;
  }
  .svc-card:hover { border-color: #d0eef1; box-shadow: 0 6px 20px rgba(15,37,64,0.08); }
  .svc-card.active { border-color: ${C.TEAL}; background: #EEF9FA; box-shadow: 0 8px 24px rgba(0,140,153,0.15); }
  .svc-card.active::before { background: ${C.TEAL}; }

  .icon-box {
    width: 44px; height: 44px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; flex-shrink: 0;
    transition: background 0.18s;
  }

  .badge {
    font-size: 10px; font-weight: 800; letter-spacing: 0.06em;
    text-transform: uppercase; padding: 3px 10px;
    border-radius: 999px; color: ${C.WHITE};
    display: inline-block;
  }

  .arrow { font-size: 18px; transition: transform 0.2s ease; color: ${C.TEAL}; flex-shrink: 0; }
  .arrow.rotated { transform: rotate(90deg); }

  .detail-panel { background: ${C.WHITE}; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 24px rgba(15,37,64,0.08); }

  .detail-header {
    padding: 36px 36px 32px;
    background: linear-gradient(135deg, ${C.NAVY} 0%, #1a3a5c 100%);
    position: relative; overflow: hidden;
  }
  .detail-header::after {
    content: '';
    position: absolute; right: -60px; top: -60px;
    width: 220px; height: 220px; border-radius: 50%;
    background: ${C.TEAL}; opacity: 0.12;
  }
  .detail-header-accent {
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${C.RED}, ${C.MUSTARD}, ${C.TEAL});
  }

  .section-title {
    font-size: 15px; font-weight: 800; color: ${C.NAVY};
    margin-bottom: 14px; display: flex; align-items: center; gap: 8px;
  }
  .section-title::before {
    content: ''; display: inline-block;
    width: 4px; height: 16px; border-radius: 2px;
    background: ${C.MUSTARD};
  }

  .stage-card {
    background: ${C.GRAY}; border-radius: 16px; padding: 20px;
    border-top: 3px solid ${C.TEAL};
    flex: 1; min-width: 0;
  }
  .stage-num {
    width: 24px; height: 24px; border-radius: 50%;
    background: ${C.TEAL}; color: ${C.WHITE};
    font-size: 11px; font-weight: 800;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }

  .check-item { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 8px; }
  .check-icon { color: ${C.TEAL}; font-size: 12px; margin-top: 1px; flex-shrink: 0; font-weight: 800; }

  .data-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .data-table thead tr { background: ${C.NAVY}; }
  .data-table thead th { color: ${C.WHITE}; padding: 12px 16px; text-align: left; font-weight: 700; font-size: 12px; letter-spacing: 0.04em; }
  .data-table thead th:first-child { border-radius: 12px 0 0 0; }
  .data-table thead th:last-child { border-radius: 0 12px 0 0; }
  .data-table tbody tr:nth-child(even) { background: ${C.GRAY}; }
  .data-table tbody tr:nth-child(odd) { background: ${C.WHITE}; }
  .data-table tbody td { padding: 11px 16px; color: #374151; font-weight: 500; }
  .data-table .teal-val { color: ${C.TEAL}; font-weight: 800; }
  .data-table .muted { color: #9CA3AF; text-decoration: line-through; }
  .data-table .green-val { color: #059669; font-weight: 800; }

  .metric-card {
    background: ${C.GRAY}; border-radius: 14px; padding: 20px 16px;
    text-align: center; border: 2px solid #E5E7EB;
    transition: border-color 0.18s;
  }
  .metric-card:hover { border-color: ${C.TEAL}; }

  .kpi-pill {
    font-size: 12px; font-weight: 700; padding: 8px 16px;
    border-radius: 999px;
    border: 2px solid ${C.TEAL};
    color: ${C.TEAL}; background: #EEF9FA;
    display: inline-flex; align-items: center; gap: 6px;
  }

  .cta-bar {
    background: ${C.NAVY}; border-radius: 16px; padding: 22px 24px;
    display: flex; align-items: center; justify-content: space-between; gap: 16px;
    flex-wrap: wrap;
  }
  .cta-btn {
    background: ${C.MUSTARD}; color: ${C.NAVY};
    border: none; border-radius: 10px;
    padding: 12px 24px; font-weight: 800; font-size: 14px;
    cursor: pointer; white-space: nowrap;
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: opacity 0.15s;
    text-decoration: none;
    display: inline-block;
  }
  .cta-btn:hover { opacity: 0.88; }

  .stat-bar { background: ${C.WHITE}; border-bottom: 1px solid #E5E7EB; padding: 28px 24px; }

  @media (max-width: 768px) {
    .stages-grid { flex-direction: column !important; }
    .main-layout { grid-template-columns: 1fr !important; }
    .detail-header { padding: 24px 20px 20px; }
    .detail-body { padding: 20px !important; }
    .metrics-grid { grid-template-columns: 1fr 1fr !important; }
  }
`;

// ── ServiceCard ───────────────────────────────────────────────────────────────
function ServiceCard({
  service,
  isActive,
  onClick,
}: {
  service: Service;
  isActive: boolean;
  onClick: () => any;
}) {
  return (
    <div className={`svc-card ${isActive ? "active" : ""}`} onClick={onClick}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        <div
          className="icon-box"
          style={{ background: isActive ? C.TEAL : "#E6F7F8" }}
        >
          {service.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 4,
            }}
          >
            <span
              style={{
                fontWeight: 800,
                fontSize: 14,
                color: C.NAVY,
                lineHeight: 1.3,
              }}
            >
              {service.title}
            </span>
            <span
              className="badge"
              style={{
                background: isActive ? C.TEAL : service.badgeColor || C.TEAL,
              }}
            >
              {service.badge}
            </span>
          </div>
          <p style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.55 }}>
            {service.shortDesc}
          </p>
        </div>
        <span className={`arrow ${isActive ? "rotated" : ""}`}>›</span>
      </div>
    </div>
  );
}

// ── ServiceDetail ─────────────────────────────────────────────────────────────
function ServiceDetail({ service }: { service: Service }) {
  const navigate = useNavigate();
  const handleConsultation = () => navigate("/contact");

  return (
    <div className="detail-panel">
      {/* Header */}
      <div className="detail-header">
        <div className="detail-header-accent" />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginBottom: 16,
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 18,
              background: "rgba(0,140,153,0.25)",
              border: `2px solid rgba(0,140,153,0.4)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              flexShrink: 0,
            }}
          >
            {service.icon}
          </div>
          <div>
            <span
              className="badge"
              style={{
                background: service.badgeColor || C.TEAL,
                marginBottom: 6,
              }}
            >
              {service.badge}
            </span>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 900,
                color: C.WHITE,
                lineHeight: 1.2,
              }}
            >
              {service.title}
            </h2>
          </div>
        </div>
        <p
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: 14,
            lineHeight: 1.7,
            position: "relative",
            zIndex: 1,
          }}
        >
          {service.fullDesc}
        </p>
      </div>

      {/* Body */}
      <div
        className="detail-body"
        style={{
          padding: "28px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        {/* How It Works */}
        <div>
          <p className="section-title">How It Works</p>
          <div className="stages-grid" style={{ display: "flex", gap: 12 }}>
            {service.stages.map((stage, i) => (
              <div
                key={i}
                className="stage-card"
                style={{
                  borderTopColor:
                    i === 0 ? C.TEAL : i === 1 ? C.MUSTARD : C.RED,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 12,
                  }}
                >
                  <div
                    className="stage-num"
                    style={{
                      background:
                        i === 0 ? C.TEAL : i === 1 ? C.MUSTARD : C.RED,
                      color: i === 1 ? C.NAVY : C.WHITE,
                    }}
                  >
                    {i + 1}
                  </div>
                  <span
                    style={{ fontSize: 12, fontWeight: 700, color: C.NAVY }}
                  >
                    {stage.label}
                  </span>
                </div>
                <div>
                  {stage.items.map((item, j) => (
                    <div key={j} className="check-item">
                      <span className="check-icon">✓</span>
                      <span
                        style={{
                          fontSize: 12,
                          color: "#4B5563",
                          lineHeight: 1.5,
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Table */}
        {service.pricing && (
          <div>
            <p className="section-title">Pricing Structure</p>
            <div
              style={{
                borderRadius: 14,
                overflow: "hidden",
                border: `1px solid #E5E7EB`,
              }}
            >
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Property Range</th>
                    <th>Commission</th>
                    <th>Due Diligence</th>
                  </tr>
                </thead>
                <tbody>
                  {service.pricing.map((p, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 700 }}>{p.range}</td>
                      <td className="teal-val">{p.commission}</td>
                      <td>{p.dueDiligence}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Timeline Table */}
        {service.timeline && (
          <div>
            <p className="section-title">Approval Timeline Comparison</p>
            <div
              style={{
                borderRadius: 14,
                overflow: "hidden",
                border: `1px solid #E5E7EB`,
              }}
            >
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Approval</th>
                    <th>Standard Time</th>
                    <th>Our Time</th>
                    <th>Time Saved</th>
                  </tr>
                </thead>
                <tbody>
                  {service.timeline.map((t, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 700 }}>{t.approval}</td>
                      <td className="muted">{t.std}</td>
                      <td>{t.ours}</td>
                      <td className="green-val">{t.saved}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Metrics */}
        {service.metrics && (
          <div>
            <p className="section-title">Performance Metrics</p>
            <div
              className="metrics-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 12,
              }}
            >
              {service.metrics.map((m, i) => (
                <div key={i} className="metric-card">
                  <p
                    style={{
                      fontSize: 20,
                      fontWeight: 900,
                      color: C.TEAL,
                      lineHeight: 1.2,
                    }}
                  >
                    {m.value}
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      color: "#6B7280",
                      marginTop: 5,
                      fontWeight: 600,
                    }}
                  >
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Investor Profiles */}
        {service.profiles && (
          <div>
            <p className="section-title">Investor Profiles</p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 12,
              }}
            >
              {service.profiles.map((p, i) => (
                <div
                  key={i}
                  style={{
                    background: p.bg,
                    border: `2px solid ${p.color}`,
                    borderRadius: 14,
                    padding: "20px 16px",
                    textAlign: "center",
                  }}
                >
                  <p style={{ fontSize: 22, fontWeight: 900, color: p.color }}>
                    {p.returns}
                  </p>
                  <p
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#6B7280",
                      marginTop: 4,
                    }}
                  >
                    {p.type} Investor
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* KPIs */}
        <div>
          <p className="section-title">Key Performance Indicators</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {service.kpis.map((k, i) => (
              <span key={i} className="kpi-pill">
                <span style={{ color: C.MUSTARD, fontWeight: 900 }}>✓</span> {k}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="cta-bar">
          <div>
            <p
              style={{
                fontWeight: 800,
                color: C.WHITE,
                fontSize: 15,
                marginBottom: 3,
              }}
            >
              Interested in {service.title}?
            </p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
              Get a free, no-obligation consultation from our experts.
            </p>
          </div>
          <button className="cta-btn" onClick={handleConsultation}>
            📞 Free Consultation
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
const getServiceIdFromHash = () => {
  const query = window.location.hash.split("?")[1];
  const id = query ? new URLSearchParams(query).get("service") : null;
  return id ? parseInt(id, 10) : 1;
};

export default function Services() {
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get("service");
  const [activeId, setActiveId] = useState(() => serviceParam ? parseInt(serviceParam, 10) : 1);
  const activeService = services.find((s) => s.id === activeId)!;
  const activeCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = searchParams.get("service");
    if (id) setActiveId(parseInt(id, 10));
  }, [searchParams]);

  useEffect(() => {
    activeCardRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [activeId]);

  return (
    <>
      <style>{globalStyles}</style>
      <div className="svc-root">
        {/* ── Page Header — matches BuyerGuide/PostProperty style ── */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 py-16 px-6 text-center">
          <span className="inline-block bg-white/20 text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            B2B + B2C Solutions · Maharashtra
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
            Our <span className="text-amber-400">Services</span>
          </h1>
          <p className="text-slate-300 max-w-xl mx-auto">
            Six specialised verticals designed to cover every real estate need — from a first-time buyer to a multi-crore developer.
          </p>
        </div>

        {/* ── Stats Bar ── */}
        <div className="stat-bar">
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 20,
              textAlign: "center",
            }}
          >
            {[
              { v: "6+", l: "Core Services" },
              { v: "36+", l: "Districts Covered" },
              { v: "30–45", l: "Days per Transaction" },
              { v: "₹24Cr+", l: "Year-1 Revenue" },
            ].map((s, i) => (
              <div key={i} style={{ borderTop: `3px solid ${i % 2 === 0 ? C.TEAL : C.MUSTARD}`, paddingTop: 12 }}>
                <p style={{ fontSize: 28, fontWeight: 900, color: C.NAVY }}>{s.v}</p>
                <p style={{ fontSize: 11, color: "#6B7280", marginTop: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Main Content ── */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "36px 24px 60px" }}>
          <div className="main-layout" style={{ display: "grid", gridTemplateColumns: "2fr 3fr", gap: 24 }}>
            {/* Sidebar */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: 14, paddingLeft: 4 }}>
                Select a Service
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {services.map((s) => (
                  <div key={s.id} ref={activeId === s.id ? activeCardRef : null}>
                    <ServiceCard service={s} isActive={activeId === s.id} onClick={() => setActiveId(s.id)} />
                  </div>
                ))}
              </div>
            </div>
            {/* Detail Panel */}
            <div>
              <ServiceDetail service={activeService} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
