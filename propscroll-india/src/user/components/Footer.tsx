import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MapPin, Phone, Mail, ArrowUpRight, Send,
  Facebook, Instagram, Linkedin, Youtube, ChevronRight,
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

const QUICK_LINKS = [
  { label: "Property Buying & Selling", to: "/services?service=1" },
  { label: "Liaisoning & Approvals",    to: "/services?service=2" },
  { label: "Joint Venture & JV Models", to: "/services?service=3" },
  { label: "Project Marketing",         to: "/services?service=4" },
  { label: "Exclusive Sales",           to: "/services?service=5" },
  { label: "Investment Management",     to: "/services?service=6" },
];

const COMPANY_LINKS = [
  { label: "About Us",       to: "/about-us" },
  { label: "Our Services",   to: "/services" },
  { label: "Buyer's Guide",  to: "/buyer-guide" },
  { label: "Post Property",  to: "/list-land" },
  { label: "Contact Us",     to: "/contact" },
  { label: "Area Converter", to: "/area-converter" },
];

const CITIES = ["Mumbai", "Pune", "Nagpur", "Navi Mumbai", "Nashik", "Gadchiroli"];

const SOCIALS = [
  { icon: <Facebook size={16} />,  label: "Facebook",  href: "https://www.facebook.com/propscrollindia",           hover: "hover:bg-[#D63528]" },
  { icon: <Instagram size={16} />, label: "Instagram", href: "https://www.instagram.com/propscrollindia/",         hover: "hover:bg-[#FCC02E]" },
  { icon: <Linkedin size={16} />,  label: "LinkedIn",  href: "https://www.linkedin.com/company/propscroll-india/", hover: "hover:bg-[#008C99]" },
  { icon: <Youtube size={16} />,   label: "YouTube",   href: "https://www.youtube.com/@PropScrollIndia",           hover: "hover:bg-[#0F2540]" },
];

const LEGAL_LINKS = ["Privacy Policy", "Terms of Service", "Cookie Policy", "Disclaimer"];

// ── Newsletter ────────────────────────────────────────────────────────────────

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  if (sent)
    return (
      <div className="flex items-center gap-3 bg-teal-600/20 border border-teal-500/40 rounded-2xl px-5 py-4">
        <span className="text-2xl">🎉</span>
        <div>
          <p className="text-white font-extrabold text-sm">You're subscribed!</p>
          <p className="text-slate-400 text-xs mt-0.5">Weekly market updates heading your way.</p>
        </div>
      </div>
    );

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (email) { setSent(true); setEmail(""); } }}
      className="flex gap-2"
    >
      <div className="relative flex-1">
        <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
        <input
          type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:bg-white/10 transition-all duration-200"
        />
      </div>
      <button
        type="submit"
        className="flex items-center gap-1.5 shrink-0 bg-teal-600 hover:bg-teal-500 text-white px-4 py-3 rounded-xl font-extrabold text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal-600/30"
      >
        <Send size={14} /> Subscribe
      </button>
    </form>
  );
};

// ── Footer Link ───────────────────────────────────────────────────────────────

const FooterLink: React.FC<{ label: string; to: string }> = ({ label, to }) => (
  <li>
    <Link
      to={to}
      className="group flex items-center gap-1.5 text-slate-400 hover:text-teal-300 text-sm font-medium transition-all duration-150 hover:translate-x-1"
    >
      <ChevronRight size={12} className="text-teal-600 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-150 shrink-0" />
      {label}
    </Link>
  </li>
);

// ── Footer ────────────────────────────────────────────────────────────────────

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const navigate = useNavigate();

  return (
    <footer className="relative bg-white overflow-hidden">
      {/* Glow orbs */}
      <div className="absolute -top-32 -left-20 w-[480px] h-[480px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(0,140,153,0.14)_0%,transparent_70%)]" />
      <div className="absolute bottom-16 -right-24 w-[360px] h-[360px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(0,140,153,0.09)_0%,transparent_70%)]" />

      {/* Shimmer top border */}
      <div className="h-[2px] w-full bg-[length:200%_100%] bg-[linear-gradient(90deg,transparent_0%,#008C99_20%,#00b4c6_50%,#008C99_80%,transparent_100%)] animate-shimmer" />

      {/* Main body */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Col 1 — Brand */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <button
              onClick={() => navigate("/")}
              className="border-none bg-transparent p-0 cursor-pointer shrink-0 self-start"
            >
              <img src="/logo.png" alt="PropScroll" className="w-40 h-14 object-contain block" />
            </button>
            <p className="text-slate-400 text-sm leading-relaxed">
              Maharashtra's most complete real estate platform. From village plots to metro
              skyscrapers — trusted B2B &amp; B2C solutions across all 36 districts.
            </p>
            <div className="flex flex-col gap-3">
              {[
                { icon: <MapPin size={14} />, text: "Maharashtra, India · All 36 Districts" },
                { icon: <Phone size={14} />,  text: "+91-80870 92777 · 24×7 Support" },
                { icon: <Mail size={14} />,   text: "info@propscrollindia.com" },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-slate-400">
                  <span className="text-teal-500 shrink-0">{c.icon}</span>
                  {c.text}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                  className={`w-9 h-9 rounded-xl bg-white/5 border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 hover:-translate-y-0.5 hover:scale-110 ${s.hover}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Our Services */}
          <div className="lg:col-span-2">
            <h3 className="text-[11px] font-extrabold text-teal-500 uppercase tracking-[0.2em] mb-5">
              Our Services
            </h3>
            <ul className="flex flex-col gap-3">
              {QUICK_LINKS.map((l) => <FooterLink key={l.label} label={l.label} to={l.to} />)}
            </ul>
          </div>

          {/* Col 3 — Company */}
          <div className="lg:col-span-2">
            <h3 className="text-[11px] font-extrabold text-teal-500 uppercase tracking-[0.2em] mb-5">
              Company
            </h3>
            <ul className="flex flex-col gap-3">
              {COMPANY_LINKS.map((l) => <FooterLink key={l.label} label={l.label} to={l.to} />)}
            </ul>
          </div>

          {/* Col 4 — Newsletter + Cities */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div>
              <h3 className="text-[11px] font-extrabold text-teal-500 uppercase tracking-[0.2em] mb-2">
                Market Updates
              </h3>
              <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                Weekly insights on Maharashtra property prices, RERA updates &amp; investment picks.
              </p>
              <Newsletter />
            </div>
            <div>
              <h3 className="text-[11px] font-extrabold text-teal-500 uppercase tracking-[0.2em] mb-4">
                We Operate In
              </h3>
              <div className="flex flex-wrap gap-2">
                {CITIES.map((city) => (
                  <button
                    key={city}
                    onClick={() => navigate(`/city/${city.toLowerCase().replace(/\s+/g, "-")}`)}
                    className="border border-white/[0.07] bg-white/[0.04] hover:bg-teal-600/20 hover:border-teal-600/50 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-teal-300 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <p className="text-xs text-slate-600 font-medium">
              © {year} PropScrollIndia Real Estate Global Mall. All rights reserved.
            </p>
            <span className="hidden md:block w-px h-3 bg-white/10" />
            <p className="text-xs text-slate-600">B2B + B2C · Maharashtra</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {LEGAL_LINKS.map((l, i) => (
              <React.Fragment key={l}>
                <span className="text-[11px] text-slate-600 hover:text-teal-400 transition-colors font-medium cursor-pointer">
                  {l}
                </span>
                {i < LEGAL_LINKS.length - 1 && (
                  <span className="text-white/10 text-xs select-none">·</span>
                )}
              </React.Fragment>
            ))}
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 bg-white/[0.06] hover:bg-teal-600 border border-white/10 hover:border-teal-600 rounded-xl px-4 py-2 text-xs font-extrabold text-slate-400 hover:text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,140,153,0.35)] cursor-pointer"
          >
            <ArrowUpRight size={13} /> Back to Top
          </button>
        </div>
        <div className="h-[3px] bg-gradient-to-r from-transparent via-teal-600/60 to-transparent" />
      </div>
    </footer>
  );
};

export default Footer;
