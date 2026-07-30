import React from "react";
import {
  Search,
  MapPin,
  Home,
  Landmark,
  ChevronDown,
  ArrowUpRight,
  X,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";
import { PropertyType } from "@/src/types";
import { api } from "@/src/api/axios";

interface HeroProps {
  onSearch?: (query: string, type: PropertyType) => void;
  onAiRequest?: () => void;
}

const PROPERTY_TYPES = [
  "Apartment",
  "Villa",
  "Independent House",
  "Plot",
  "Studio",
  "Penthouse",
  "Builder Floor",
  "Farm House",
];
const LOCATIONS = [
  "Mumbai",
  "Delhi NCR",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Surat",
];
const BUDGETS_BUY = [
  "Under ₹30 L",
  "₹30 L – 60 L",
  "₹60 L – 1 Cr",
  "₹1 Cr – 2 Cr",
  "₹2 Cr – 5 Cr",
  "Above ₹5 Cr",
];
const BUDGETS_RENT = [
  "Under ₹10K",
  "₹10K – 20K",
  "₹20K – 40K",
  "₹40K – 70K",
  "₹70K – 1 L",
  "Above ₹1 L",
];

const SLIDES = [
  {
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2400",
    h1: "Invest Today in",
    h2: "Your Dream Home",
    sub: "Discover premium properties across India's most coveted addresses. Verified listings, direct owners, zero brokerage.",
  },
  {
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=2400",
    h1: "Luxury Living",
    h2: "Redefined for You",
    sub: "From serene villas to sky-high penthouses — find the home that matches your lifestyle and budget.",
  },
  {
    img: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=2400",
    h1: "Your Perfect Space",
    h2: "Starts Right Here",
    sub: "50,000+ verified listings across 120 Indian cities with AI-powered recommendations built just for you.",
  },
];

// ── Dropdown ──────────────────────────────────────────────────────────────────
const Dropdown: React.FC<{
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}> = ({ label, options, value, onChange, icon, isOpen, onToggle, onClose }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    if (isOpen) document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [isOpen, onClose]);

  return (
    <div ref={ref} className="relative flex-1 h-full">
      <button
        onClick={onToggle}
        className="w-full h-full flex items-center gap-2 px-[18px] bg-transparent border-0 border-r border-r-[rgba(0,140,153,.15)] cursor-pointer hover:bg-[rgba(0,140,153,.04)] transition-colors min-w-0"
      >
        <span className="text-[#008C99] shrink-0">{icon}</span>
        <span
          className={`flex-1 text-left text-[13px] truncate ${value === label ? "text-gray-400 font-normal" : "text-gray-800 font-semibold"}`}
        >
          {value === label ? label : value}
        </span>
        <ChevronDown
          size={13}
          className={`text-gray-400 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute bottom-[calc(100%+8px)] left-0 bg-white rounded-xl overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,.18)] border border-[rgba(0,140,153,.12)] z-[100] min-w-[200px] max-h-[280px] overflow-y-auto">
          <div className="px-[14px] py-[10px] border-b border-[rgba(0,140,153,.08)]">
            <p className="text-[10px] font-bold tracking-[.12em] uppercase text-[#008C99]">
              {label}
            </p>
          </div>
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                onClose();
              }}
              className={`w-full px-4 py-[11px] text-left text-[13px] flex items-center justify-between border-none cursor-pointer transition-colors ${value === opt ? "bg-[rgba(0,140,153,.08)] text-[#008C99] font-semibold" : "bg-transparent text-gray-700 hover:bg-[rgba(0,140,153,.05)]"}`}
            >
              {opt}
              {value === opt && (
                <span className="text-[#008C99] text-base">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Contact Modal ─────────────────────────────────────────────────────────────
const ContactModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [form, setForm] = React.useState({ name: "", phone: "", details: "" });
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrMsg("");
    try {
      const { data } = await api.post("/form/enquiries", form);
      if (!data.success) throw new Error(data.message ?? "Submission failed");
      setStatus("success");
      setForm({ name: "", phone: "", details: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err: any) {
      setStatus("error");
      setErrMsg(err.response?.data?.message ?? err.message ?? "Something went wrong");
    }
  };

  return (
  <div
    onClick={onClose}
    className="fixed inset-0 z-[1000] bg-black/65 backdrop-blur-md flex items-center justify-center pt-25 px-4"
    style={{ animation: "fadeInBg .25s ease" }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white rounded-[20px] w-full max-w-[480px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,.25)]"
      style={{ animation: "slideUpModal .3s cubic-bezier(.16,1,.3,1)" }}
    >
      <div
        className="relative px-8 pt-7 pb-6"
        style={{ background: "linear-gradient(135deg,#008C99,#005f68)" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/15 border-none flex items-center justify-center text-white cursor-pointer"
        >
          <X size={16} />
        </button>
        <h2 className="text-[26px] font-bold text-white mb-1.5">Contact Us</h2>
        <p className="text-[13px] text-white/75 leading-relaxed">
          We're here to help you find your perfect home. Reach out anytime.
        </p>
      </div>

      <div className="px-8 py-4">
        {[
          {
            icon: <Phone size={18} />,
            label: "Call Us",
            value: "+91 98765 43210",
            sub: "Mon – Sat, 9am – 7pm",
            color: "#008C99",
          },
          {
            icon: <Mail size={18} />,
            label: "Email Us",
            value: "hello@propscroll.in",
            sub: "We reply within 24 hours",
            color: "#008C99",
          },
          {
            icon: <MessageCircle size={18} />,
            label: "WhatsApp",
            value: "+91 80870 92777",
            sub: "Quick responses on WhatsApp",
            color: "#25D366",
          },
        ].map(({ icon, label, value, sub, color }) => (
          <div
            key={label}
            className="flex items-center gap-4 px-4 py-[14px] rounded-xl mb-2.5 border border-[rgba(0,140,153,.1)] hover:bg-[rgba(0,140,153,.05)] hover:border-[rgba(0,140,153,.25)] transition-all cursor-pointer"
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `${color}15`, color }}
            >
              {icon}
            </div>
            <div>
              <p className="text-[11px] font-bold tracking-[.1em] uppercase text-gray-400 mb-0.5">
                {label}
              </p>
              <p className="text-[14px] font-bold text-[#0a2a2e]">{value}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>
            </div>
          </div>
        ))}

        <div className="mt-2 p-5 bg-[rgba(0,140,153,.04)] rounded-xl border border-[rgba(0,140,153,.12)] max-h-[320px] overflow-y-auto">
          <p className="text-[12px] font-bold tracking-[.1em] uppercase text-[#008C99] mb-4">
            Quick Enquiry
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            {/* Name + Phone Row */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder=" "
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="peer w-full px-4 pt-5 pb-2 border border-[rgba(0,140,153,.18)] rounded-lg text-[13px] outline-none text-gray-800 focus:border-[#008C99]"
                />
                <label className="absolute left-3 top-2 text-gray-500 text-[12px] transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-[13px] peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-[#008C99]">
                  Your Name
                </label>
              </div>
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder=" "
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                  className="peer w-full px-4 pt-5 pb-2 border border-[rgba(0,140,153,.18)] rounded-lg text-[13px] outline-none text-gray-800 focus:border-[#008C99]"
                />
                <label className="absolute left-3 top-2 text-gray-500 text-[12px] transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-[13px] peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-[#008C99]">
                  Phone Number
                </label>
              </div>
            </div>

            {/* Message */}
            <div className="relative">
              <textarea
                rows={2}
                placeholder=" "
                value={form.details}
                onChange={(e) => setForm({ ...form, details: e.target.value })}
                required
                className="peer w-full px-4 pt-5 pb-2 border border-[rgba(0,140,153,.18)] rounded-lg text-[13px] outline-none text-gray-800 resize-none focus:border-[#008C99]"
              />
              <label className="absolute left-3 top-2 text-gray-500 text-[12px] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-[13px] peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-[#008C99]">
                Tell us what you're looking for…
              </label>
            </div>

            {/* Error message */}
            {status === "error" && (
              <p className="text-[12px] text-red-500 font-medium">{errMsg}</p>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="w-full py-2 bg-[#008C99] rounded-lg text-[13px] font-bold text-white flex items-center justify-center gap-2 hover:bg-[#006e79] transition-all disabled:opacity-70"
            >
              {status === "loading" && <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
              {status === "success" ? "Enquiry Sent ✓" : status === "loading" ? "Sending…" : <><ArrowUpRight size={15} /> Send Enquiry</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
};

// ── Hero ──────────────────────────────────────────────────────────────────────
const Hero: React.FC<HeroProps> = ({ onSearch, onAiRequest }) => {
  const [activeTab, setActiveTab] = React.useState<PropertyType>(
    PropertyType.BUY,
  );
  const [query, setQuery] = React.useState("");
  const [propType, setPropType] = React.useState("Property Type");
  const [location, setLocation] = React.useState("Location");
  const [budget, setBudget] = React.useState("Budget");
  const [cur, setCur] = React.useState(0);
  const [prev, setPrev] = React.useState<number | null>(null);
  const [dir, setDir] = React.useState<"left" | "right">("right");
  const [animating, setAnimating] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [mx, setMx] = React.useState(0);
  const [my, setMy] = React.useState(0);
  const [showContact, setShowContact] = React.useState(false);
  const [openDrop, setOpenDrop] = React.useState<string | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const goTo = (idx: number) => {
    if (animating || idx === cur) return;
    setDir(idx > cur ? "right" : "left");
    setPrev(cur);
    setCur(idx);
    setAnimating(true);
    setTimeout(() => {
      setPrev(null);
      setAnimating(false);
    }, 1000);
  };

  React.useEffect(() => {
    setLoaded(true);
    const t = setInterval(() => {
      setCur((p) => {
        const next = (p + 1) % SLIDES.length;
        setDir("right");
        setPrev(p);
        setAnimating(true);
        setTimeout(() => {
          setPrev(null);
          setAnimating(false);
        }, 1000);
        return next;
      });
    }, 6000);
    return () => clearInterval(t);
  }, []);

  React.useEffect(() => {
    setBudget("Budget");
  }, [activeTab]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const r = containerRef.current?.getBoundingClientRect();
    if (!r) return;
    setMx((e.clientX - r.left) / r.width - 0.5);
    setMy((e.clientY - r.top) / r.height - 0.5);
  };

  const parallax = {
    transform: `translate(${mx * -18}px,${my * -12}px) scale(1.12)`,
    transition: "transform .12s linear",
  };
  const budgetOptions =
    activeTab === PropertyType.RENT ? BUDGETS_RENT : BUDGETS_BUY;
  const saleLabel =
    activeTab === PropertyType.BUY
      ? "For Sale"
      : activeTab === PropertyType.RENT
        ? "For Rent"
        : "Commercial";
  const fadeUp = (delay: string) =>
    `transition-all duration-700 ${delay} ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`;

  return (
    <>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative w-full min-h-screen overflow-hidden font-sans flex flex-col"
      >
        {/* BG Images */}
        <div className="absolute inset-0 z-0">
          {prev !== null && (
            <div
              className={dir === "right" ? "swOR" : "swOL"}
              style={{ position: "absolute", inset: 0 }}
            >
              <img
                src={SLIDES[prev].img}
                alt=""
                className="w-full h-full object-cover block"
                style={parallax}
              />
            </div>
          )}
          <div
            className={animating ? (dir === "right" ? "swIR" : "swIL") : ""}
            style={{ position: "absolute", inset: 0 }}
          >
            <img
              src={SLIDES[cur].img}
              alt=""
              className="bgzoom w-full h-full object-cover block"
              style={parallax}
            />
          </div>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom,rgba(0,0,0,.52) 0%,rgba(0,0,0,.22) 40%,rgba(0,0,0,.55) 75%,rgba(0,0,0,.84) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 45%,rgba(0,0,0,.12) 0%,rgba(0,0,0,.52) 100%)",
            }}
          />
        </div>

        {/* Center Text */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-5 sm:px-10 md:px-16 pb-[320px] sm:pb-[260px] md:pb-[240px] lg:pb-[220px] pt-10">
          <div key={cur} className="txt-in mb-[18px]">
            <h1
              className="font-semibold text-white leading-[1.08] tracking-[-0.03em] drop-shadow-[0_4px_32px_rgba(0,0,0,.4)]"
              style={{ fontSize: "clamp(28px,6.5vw,82px)" }}
            >
              {SLIDES[cur].h1}
              <br />
              <span className="text-[#008C99]">{SLIDES[cur].h2}</span>
            </h1>
          </div>

          <p
            key={`s-${cur}`}
            className="txt-in text-[14px] md:text-[16px] text-white/70 max-w-[520px] leading-[1.75] mb-6 md:mb-8 px-2"
            style={{ animationDelay: ".1s" }}
          >
            {SLIDES[cur].sub}
          </p>

          <div
            className={`flex flex-wrap justify-center gap-3 ${fadeUp("delay-[420ms]")}`}
          >
            <button
              onClick={() => onSearch?.(query, activeTab)}
              className="flex items-center gap-2 px-5 sm:px-7 py-[11px] sm:py-[13px] bg-[#008C99] border-2 border-[#008C99] text-white rounded-lg text-[13px] sm:text-[14px] font-bold tracking-[.02em] hover:bg-[#006e79] hover:border-[#006e79] hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(0,140,153,.4)] transition-all"
            >
              View Property <ArrowUpRight size={16} />
            </button>
            <button
              onClick={() => setShowContact(true)}
              className="px-5 sm:px-7 py-[11px] sm:py-[13px] bg-transparent border-2 border-white/65 text-white rounded-lg text-[13px] sm:text-[14px] font-semibold tracking-[.02em] hover:border-white hover:bg-white/12 transition-all"
            >
              Contact Now
            </button>
          </div>

        </div>

        {/* Bottom Search Bar */}
        <div
          className={`absolute bottom-0 left-0 right-0 z-20 px-4 sm:px-8 md:px-12 lg:px-16 pb-5 sm:pb-7 md:pb-9 lg:pb-11 ${fadeUp("delay-[560ms]")}`}
        >
          {/* Tabs */}
          <div className="inline-flex bg-black/55 backdrop-blur-xl rounded-t-[10px] overflow-hidden border border-white/10 border-b-0">
            {(
              [
                { type: PropertyType.BUY, label: "Buy", icon: <Home size={13} /> },
                { type: PropertyType.RENT, label: "Rent", icon: <MapPin size={13} /> },
                { type: PropertyType.COMMERCIAL, label: "Commercial", icon: <Landmark size={13} /> },
              ] as const
            ).map(({ type, label, icon }) => (
              <button
                key={type}
                onClick={() => setActiveTab(type)}
                className={`relative px-[14px] sm:px-[22px] py-[9px] sm:py-[10px] bg-transparent border-none cursor-pointer text-[11px] sm:text-[12px] font-semibold tracking-[.04em] transition-all flex items-center gap-[5px] after:absolute after:bottom-0 after:h-[2px] after:bg-[#008C99] after:rounded-t after:transition-all after:duration-300 ${activeTab === type ? "text-white after:left-3 after:right-3" : "text-white/60 hover:text-white/90 after:left-1/2 after:right-1/2"}`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>

          {/* Search bar — stacked on mobile, row on md+ */}
          <div className="bg-white rounded-[0_12px_12px_12px] shadow-[0_20px_60px_rgba(0,0,0,.35),0_4px_16px_rgba(0,140,153,.15)] border border-[rgba(0,140,153,.15)] overflow-visible">
            {/* Mobile/Tablet stacked layout */}
            <div className="flex flex-col md:hidden">
              <div className="flex items-center gap-2.5 px-4 py-3 border-b border-[rgba(0,140,153,.1)]">
                <Search
                  size={16}
                  className="text-[rgba(0,140,153,.7)] shrink-0"
                />
                <input
                  className="flex-1 bg-transparent border-none outline-none text-[13px] text-gray-800 placeholder:text-gray-400"
                  placeholder="Enter keywords, landmark, area…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && onSearch?.(query, activeTab)
                  }
                />
              </div>
              <div className="grid grid-cols-3 border-b border-[rgba(0,140,153,.1)]">
                <div className="flex items-center gap-1.5 px-3 py-2.5 border-r border-[rgba(0,140,153,.1)]">
                  <Home size={13} className="text-[#008C99] shrink-0" />
                  <span className="text-[12px] text-gray-700 font-semibold truncate">
                    {saleLabel}
                  </span>
                </div>
                <button
                  onClick={() =>
                    setOpenDrop(openDrop === "propType" ? null : "propType")
                  }
                  className="relative flex items-center gap-1 px-3 py-2.5 border-r border-[rgba(0,140,153,.1)] bg-transparent border-none cursor-pointer"
                >
                  <Landmark size={13} className="text-[#008C99] shrink-0" />
                  <span
                    className={`flex-1 text-left text-[12px] truncate ${propType === "Property Type" ? "text-gray-400" : "text-gray-800 font-semibold"}`}
                  >
                    {propType === "Property Type" ? "Type" : propType}
                  </span>
                  <ChevronDown size={11} className="text-gray-400 shrink-0" />
                  {openDrop === "propType" && (
                    <div className="absolute bottom-[calc(100%+4px)] left-0 bg-white rounded-xl overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,.18)] border border-[rgba(0,140,153,.12)] z-[100] min-w-[160px] max-h-[220px] overflow-y-auto">
                      {PROPERTY_TYPES.map((opt) => (
                        <button
                          key={opt}
                          onClick={(e) => {
                            e.stopPropagation();
                            setPropType(opt);
                            setOpenDrop(null);
                          }}
                          className={`w-full px-3 py-2.5 text-left text-[12px] border-none cursor-pointer ${propType === opt ? "bg-[rgba(0,140,153,.08)] text-[#008C99] font-semibold" : "bg-transparent text-gray-700 hover:bg-[rgba(0,140,153,.05)]"}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </button>
                <button
                  onClick={() =>
                    setOpenDrop(openDrop === "budget" ? null : "budget")
                  }
                  className="relative flex items-center gap-1 px-3 py-2.5 bg-transparent border-none cursor-pointer"
                >
                  <span className="text-[#008C99] text-[13px] font-bold shrink-0">
                    ₹
                  </span>
                  <span
                    className={`flex-1 text-left text-[12px] truncate ${budget === "Budget" ? "text-gray-400" : "text-gray-800 font-semibold"}`}
                  >
                    {budget === "Budget" ? "Budget" : budget}
                  </span>
                  <ChevronDown size={11} className="text-gray-400 shrink-0" />
                  {openDrop === "budget" && (
                    <div className="absolute bottom-[calc(100%+4px)] right-0 bg-white rounded-xl overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,.18)] border border-[rgba(0,140,153,.12)] z-[100] min-w-[160px] max-h-[220px] overflow-y-auto">
                      {budgetOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={(e) => {
                            e.stopPropagation();
                            setBudget(opt);
                            setOpenDrop(null);
                          }}
                          className={`w-full px-3 py-2.5 text-left text-[12px] border-none cursor-pointer ${budget === opt ? "bg-[rgba(0,140,153,.08)] text-[#008C99] font-semibold" : "bg-transparent text-gray-700 hover:bg-[rgba(0,140,153,.05)]"}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </button>
              </div>
              <button
                onClick={() => onSearch?.(query, activeTab)}
                className="flex items-center justify-center gap-2 w-full py-3 bg-[#008C99] hover:bg-[#006e79] text-white text-[13px] font-bold rounded-b-[12px] border-none cursor-pointer transition-colors"
              >
                <Search size={15} /> Search Properties
              </button>
            </div>

            {/* Desktop row layout */}
            <div className="hidden md:flex items-center h-16 relative">
              <div className="flex-[1.4] flex items-center gap-2.5 px-[22px] border-r border-r-[rgba(0,140,153,.12)] h-full min-w-0">
                <Search
                  size={17}
                  className="text-[rgba(0,140,153,.7)] shrink-0"
                />
                <input
                  className="flex-1 bg-transparent border-none outline-none text-[13px] text-gray-800 placeholder:text-gray-400"
                  placeholder="Enter keywords, landmark, area…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && onSearch?.(query, activeTab)
                  }
                />
              </div>
              <div className="flex-1 flex items-center gap-2 px-[18px] border-r border-r-[rgba(0,140,153,.12)] h-full min-w-0">
                <Home size={14} className="text-[#008C99] shrink-0" />
                <span className="flex-1 text-[13px] text-gray-700 font-semibold truncate">
                  {saleLabel}
                </span>
              </div>
              <Dropdown
                label="Property Type"
                options={PROPERTY_TYPES}
                value={propType}
                onChange={setPropType}
                icon={<Landmark size={14} />}
                isOpen={openDrop === "propType"}
                onToggle={() =>
                  setOpenDrop(openDrop === "propType" ? null : "propType")
                }
                onClose={() => setOpenDrop(null)}
              />
              <Dropdown
                label="Location"
                options={LOCATIONS}
                value={location}
                onChange={setLocation}
                icon={<MapPin size={14} />}
                isOpen={openDrop === "location"}
                onToggle={() =>
                  setOpenDrop(openDrop === "location" ? null : "location")
                }
                onClose={() => setOpenDrop(null)}
              />
              <Dropdown
                label="Budget"
                options={budgetOptions}
                value={budget}
                onChange={setBudget}
                icon={<span className="text-[14px] font-bold">₹</span>}
                isOpen={openDrop === "budget"}
                onToggle={() =>
                  setOpenDrop(openDrop === "budget" ? null : "budget")
                }
                onClose={() => setOpenDrop(null)}
              />
              <button
                onClick={() => onSearch?.(query, activeTab)}
                className="flex items-center gap-2 px-8 h-full bg-[#008C99] hover:bg-[#006e79] text-white text-[14px] font-bold rounded-r-xl border-none cursor-pointer shrink-0 transition-colors whitespace-nowrap"
              >
                <Search size={16} /> Search
              </button>
            </div>
          </div>

          {/* Popular + dots */}
          <div className="flex items-center justify-between mt-2.5 gap-2">
            <div className="hidden sm:flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-medium text-white/45">
                Popular:
              </span>
              {[
                "Worli, Mumbai",
                "Bandra West",
                "Indiranagar",
                "Banjara Hills",
              ].map((loc) => (
                <button
                  key={loc}
                  onClick={() => setQuery(loc)}
                  className="bg-white/10 border border-white/20 rounded-full px-3 py-1 text-[11px] font-medium text-white/70 cursor-pointer hover:bg-[rgba(0,140,153,.3)] hover:text-white transition-all"
                >
                  {loc}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-[7px] ml-auto">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-[7px] rounded-full border-none cursor-pointer transition-all duration-300 ${i === cur ? "w-7 bg-[#008C99]" : "w-[7px] bg-white/40"}`}
                />
              ))}
              <span className="text-[11px] font-semibold text-white/40 ml-1.5">
                {String(cur + 1).padStart(2, "0")} /{" "}
                {String(SLIDES.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        {/* Stats — hidden on mobile, shown md+ */}
        <div
          className={`hidden md:flex absolute top-24 right-8 lg:right-16 z-[15] flex-col gap-2.5 ${fadeUp("delay-[280ms]")}`}
        >
          {[
            { v: "50K+", l: "Listings" },
            { v: "120+", l: "Cities" },
            { v: "₹0", l: "Brokerage" },
          ].map(({ v, l }) => (
            <div
              key={l}
              className="bg-black/45 backdrop-blur-2xl border border-white/12 rounded-xl px-[18px] py-2.5 text-center min-w-[90px]"
            >
              <p className="text-[22px] font-bold text-[#008C99] leading-none">
                {v}
              </p>
              <p className="text-[10px] font-semibold text-white/50 mt-[3px] tracking-[.1em] uppercase">
                {l}
              </p>
            </div>
          ))}
        </div>
      </div>

      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
    </>
  );
};

export default Hero;
