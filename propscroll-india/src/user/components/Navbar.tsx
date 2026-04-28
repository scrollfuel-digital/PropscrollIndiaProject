import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Menu, X, PlusCircle, Heart, GraduationCap, MapPin, ChevronDown,
  SlidersHorizontal, Repeat, Home, Building2, Trees, Warehouse, Store,
  Hotel, Factory, LandPlot, ChevronRight, TrendingUp, Sparkles, ArrowRight,
  Info, Briefcase,
} from "lucide-react";

// ── Routing helpers ───────────────────────────────────────────────────────────
const slug = (s: string) => s.toLowerCase().replace(/\s+/g, "-");
const buildRoute = (city: string, area?: string, cat?: string) => {
  let r = `/city/${slug(city)}`;
  if (area) r += `/${slug(area)}`;
  if (cat) r += `/${slug(cat)}`;
  return r;
};

// ── Data ──────────────────────────────────────────────────────────────────────
const PT = {
  plots: { icon: <LandPlot size={14} />, label: "Plots" },
  apts: { icon: <Building2 size={14} />, label: "Apartments" },
  luxury: { icon: <Hotel size={14} />, label: "Luxury Villas" },
  comm: { icon: <Store size={14} />, label: "Commercial" },
  farm: { icon: <Trees size={14} />, label: "Farm Houses" },
  ware: { icon: <Warehouse size={14} />, label: "Warehouses" },
  ind: { icon: <Factory size={14} />, label: "Industrial" },
  row: { icon: <Home size={14} />, label: "Row Houses" },
};
const mk = (label: string, color: string) => ({ tag: label, tagColor: color });

const CITY_DATA = [
  {
    name: "Nagpur",
    highlight: "Orange City",
    totalListings: "3,074+",
    areas: [
      {
        name: "Dharampeth",
        listings: "420+",
        ...mk("Premium", "#8B5CF6"),
        types: [
          { ...PT.luxury, count: "68+", ...mk("Hot", "#EF4444") },
          { ...PT.apts, count: "210+" },
          { ...PT.comm, count: "90+" },
          { ...PT.row, count: "52+" },
        ],
      },
      {
        name: "Wardha Road",
        listings: "680+",
        ...mk("Upcoming", "#F59E0B"),
        types: [
          { ...PT.plots, count: "380+", ...mk("Hot", "#EF4444") },
          { ...PT.apts, count: "180+" },
          { ...PT.comm, count: "80+" },
          { ...PT.ind, count: "40+" },
        ],
      },
      {
        name: "Sadar",
        listings: "310+",
        ...mk("Prime", "#008C99"),
        types: [
          { ...PT.apts, count: "140+" },
          { ...PT.comm, count: "120+", ...mk("Trending", "#F59E0B") },
          { ...PT.luxury, count: "30+" },
          { ...PT.row, count: "20+" },
        ],
      },
      {
        name: "Hingna",
        listings: "240+",
        ...mk("Industrial", "#64748B"),
        types: [
          { ...PT.ind, count: "90+" },
          { ...PT.plots, count: "100+", ...mk("New", "#008C99") },
          { ...PT.ware, count: "50+" },
        ],
      },
      {
        name: "Manish Nagar",
        listings: "190+",
        types: [
          { ...PT.plots, count: "80+" },
          { ...PT.row, count: "70+" },
          { ...PT.apts, count: "40+" },
        ],
      },
      {
        name: "Khamla",
        listings: "160+",
        types: [
          { ...PT.apts, count: "90+" },
          { ...PT.comm, count: "40+" },
          { ...PT.row, count: "30+" },
        ],
      },
    ],
  },
  {
    name: "Mumbai",
    highlight: "Financial Capital",
    totalListings: "5,980+",
    areas: [
      {
        name: "Worli",
        listings: "920+",
        ...mk("Premium", "#8B5CF6"),
        types: [
          { ...PT.luxury, count: "180+", ...mk("Hot", "#EF4444") },
          { ...PT.apts, count: "540+" },
          { ...PT.comm, count: "200+" },
        ],
      },
      {
        name: "Andheri",
        listings: "1,100+",
        ...mk("Trending", "#F59E0B"),
        types: [
          { ...PT.apts, count: "680+", ...mk("Hot", "#EF4444") },
          { ...PT.comm, count: "280+", ...mk("Trending", "#F59E0B") },
          { ...PT.ware, count: "140+" },
        ],
      },
      {
        name: "Bandra",
        listings: "760+",
        ...mk("Premium", "#8B5CF6"),
        types: [
          { ...PT.luxury, count: "120+" },
          { ...PT.apts, count: "440+" },
          { ...PT.comm, count: "200+" },
        ],
      },
      {
        name: "Thane",
        listings: "840+",
        ...mk("Affordable", "#22C55E"),
        types: [
          { ...PT.apts, count: "510+", ...mk("New", "#008C99") },
          { ...PT.plots, count: "180+" },
          { ...PT.row, count: "150+" },
        ],
      },
    ],
  },
  {
    name: "Navi Mumbai",
    highlight: "Planned Satellite City",
    totalListings: "1,750+",
    areas: [
      {
        name: "Vashi",
        listings: "420+",
        ...mk("Prime", "#008C99"),
        types: [
          { ...PT.apts, count: "240+" },
          { ...PT.comm, count: "120+" },
          { ...PT.plots, count: "60+" },
        ],
      },
      {
        name: "Kharghar",
        listings: "380+",
        ...mk("Premium", "#8B5CF6"),
        types: [
          { ...PT.apts, count: "220+" },
          { ...PT.luxury, count: "80+" },
          { ...PT.plots, count: "80+" },
        ],
      },
      {
        name: "Panvel",
        listings: "520+",
        ...mk("Upcoming", "#F59E0B"),
        types: [
          { ...PT.plots, count: "260+" },
          { ...PT.apts, count: "180+" },
          { ...PT.row, count: "80+" },
        ],
      },
      {
        name: "Airoli",
        listings: "430+",
        types: [
          { ...PT.apts, count: "250+" },
          { ...PT.comm, count: "120+" },
          { ...PT.ware, count: "60+" },
        ],
      },
    ],
  },
  {
    name: "Pune",
    highlight: "Oxford of the East",
    totalListings: "4,710+",
    areas: [
      {
        name: "Koregaon Park",
        listings: "640+",
        ...mk("Premium", "#8B5CF6"),
        types: [
          { ...PT.luxury, count: "140+", ...mk("Hot", "#EF4444") },
          { ...PT.apts, count: "360+" },
          { ...PT.comm, count: "140+" },
        ],
      },
      {
        name: "Hinjewadi",
        listings: "820+",
        ...mk("IT Hub", "#008C99"),
        types: [
          { ...PT.apts, count: "520+", ...mk("New", "#008C99") },
          { ...PT.comm, count: "200+" },
          { ...PT.plots, count: "100+" },
        ],
      },
      {
        name: "Kothrud",
        listings: "490+",
        ...mk("Affordable", "#22C55E"),
        types: [
          { ...PT.apts, count: "290+" },
          { ...PT.row, count: "120+" },
          { ...PT.comm, count: "80+" },
        ],
      },
      {
        name: "Wakad",
        listings: "560+",
        ...mk("Upcoming", "#F59E0B"),
        types: [
          { ...PT.plots, count: "220+", ...mk("Hot", "#EF4444") },
          { ...PT.apts, count: "240+" },
          { ...PT.farm, count: "100+" },
        ],
      },
    ],
  },
  {
    name: "Amravati",
    highlight: "Cotton City",
    totalListings: "960+",
    areas: [
      {
        name: "Rajapeth",
        listings: "320+",
        ...mk("Prime", "#008C99"),
        types: [
          { ...PT.apts, count: "160+" },
          { ...PT.comm, count: "100+" },
          { ...PT.plots, count: "60+" },
        ],
      },
      {
        name: "Badnera",
        listings: "280+",
        types: [
          { ...PT.ind, count: "100+" },
          { ...PT.plots, count: "120+" },
          { ...PT.ware, count: "60+" },
        ],
      },
      {
        name: "Morshi Road",
        listings: "200+",
        ...mk("Upcoming", "#F59E0B"),
        types: [
          { ...PT.farm, count: "100+" },
          { ...PT.plots, count: "100+" },
        ],
      },
    ],
  },
  {
    name: "Gadchiroli",
    highlight: "City of Forests",
    totalListings: "760+",
    areas: [
      {
        name: "Ballarpur",
        listings: "280+",
        ...mk("Industrial", "#64748B"),
        types: [
          { ...PT.ind, count: "90+" },
          { ...PT.plots, count: "120+", ...mk("New", "#008C99") },
          { ...PT.ware, count: "70+" },
        ],
      },
      {
        name: "Mul Road",
        listings: "240+",
        ...mk("Upcoming", "#F59E0B"),
        types: [
          { ...PT.farm, count: "140+", ...mk("Trending", "#F59E0B") },
          { ...PT.plots, count: "100+" },
        ],
      },
      {
        name: "Chandrapur City",
        listings: "240+",
        types: [
          { ...PT.apts, count: "100+" },
          { ...PT.comm, count: "80+" },
          { ...PT.plots, count: "60+" },
        ],
      },
    ],
  },
  {
    name: "Akola",
    highlight: "Cotton City",
    totalListings: "830+",
    areas: [
      {
        name: "Akola City",
        listings: "380+",
        types: [
          { ...PT.apts, count: "160+" },
          { ...PT.comm, count: "140+" },
          { ...PT.plots, count: "80+" },
        ],
      },
      {
        name: "Murtizapur",
        listings: "220+",
        ...mk("Upcoming", "#F59E0B"),
        types: [
          { ...PT.farm, count: "100+" },
          { ...PT.plots, count: "120+" },
        ],
      },
      {
        name: "Telhara",
        listings: "230+",
        types: [
          { ...PT.plots, count: "120+" },
          { ...PT.farm, count: "80+" },
          { ...PT.ind, count: "30+" },
        ],
      },
    ],
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
const TAG_BG: Record<string, string> = {
  "#8B5CF6": "bg-[#8B5CF6]",
  "#F59E0B": "bg-[#F59E0B]",
  "#008C99": "bg-[#008C99]",
  "#64748B": "bg-[#64748B]",
  "#EF4444": "bg-[#EF4444]",
  "#22C55E": "bg-[#22C55E]",
};

const Tag: React.FC<{ label?: string; color?: string; sm?: boolean }> = ({
  label,
  color,
  sm,
}) =>
  label ? (
    <span
      className={`font-black text-white ${sm ? "text-[9px] px-[7px] py-[2px] rounded-[5px]" : "text-[8px] px-[5px] py-[1px] rounded"} ${color ? (TAG_BG[color] ?? "bg-slate-500") : "bg-slate-500"}`}
    >
      {label}
    </span>
  ) : null;

const Chevron: React.FC<{ open: boolean; size?: number }> = ({
  open,
  size = 13,
}) => (
  <ChevronDown
    size={size}
    className={`text-slate-400 transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
  />
);

// ── Props ─────────────────────────────────────────────────────────────────────
interface NavbarProps {
  wishlistCount?: number;
  onCityChange?: (city: string) => void;
  onPriceRangeChange?: (min: number, max: number) => void;
  selectedCity?: string;
  onNavigate?: (route: string) => void;
  currentRoute?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────
const Navbar: React.FC<NavbarProps> = ({
  wishlistCount = 0,
  onCityChange,
  onPriceRangeChange,
  selectedCity = "Nagpur",
  onNavigate,
  currentRoute,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const activePath = currentRoute ?? location.pathname;
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [showMega, setShowMega] = React.useState(false);
  const [showFilt, setShowFilt] = React.useState(false);
  const [hovCity, setHovCity] = React.useState(selectedCity);
  const [hovArea, setHovArea] = React.useState<string | null>(null);
  const [mobCity, setMobCity] = React.useState<string | null>(null);
  const [mobArea, setMobArea] = React.useState<string | null>(null);

  const TIERS = [0, 25, 50, 75, 100, 150, 200, 300, 500];
  const pLabel = (v: number) => (v >= 100 ? `${v / 100}Cr` : `${v}L`);
  const [price, setPrice] = React.useState({ min: 0, max: 4 });

  const closeT = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const filtRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  React.useEffect(() => {
    setHovCity(selectedCity);
  }, [selectedCity]);

  React.useEffect(() => {
    const c = CITY_DATA.find((c) => c.name === hovCity);
    if (c) setHovArea(c.areas[0].name);
  }, [hovCity]);

  React.useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (filtRef.current && !filtRef.current.contains(e.target as Node))
        setShowFilt(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const openMega = () => {
    if (closeT.current) clearTimeout(closeT.current);
    setShowMega(true);
  };
  const closeMega = () => {
    closeT.current = setTimeout(() => setShowMega(false), 150);
  };

  const go = (route: string) => {
    navigate(route);
    setShowMega(false);
    setIsOpen(false);
  };
  const goCity = (city: string) => {
    onCityChange?.(city);
    go(buildRoute(city));
  };
  const goArea = (city: string, area: string) => {
    onCityChange?.(city);
    go(buildRoute(city, area));
  };
  const goCat = (city: string, area: string, cat: string) => {
    onCityChange?.(city);
    go(buildRoute(city, area, cat));
  };

  const handlePrice = (type: "min" | "max", val: number) => {
    const next = { ...price, [type]: val };
    if (type === "min" && val > next.max) next.max = val;
    if (type === "max" && val < next.min) next.min = val;
    setPrice(next);
    onPriceRangeChange?.(TIERS[next.min], TIERS[next.max]);
  };

  const cityData = CITY_DATA.find((c) => c.name === hovCity) ?? CITY_DATA[0];
  const areaData =
    cityData.areas.find((a) => a.name === hovArea) ?? cityData.areas[0];
  const isActive = (route: string) => activePath === route;
  const navLinkBase =
    "relative flex items-center gap-1 text-[12px] font-bold bg-transparent border-none cursor-pointer px-0 py-1 transition-colors duration-150";

  // ── Price sliders ─────────────────────────────────────────────────────────
  const PriceSliders = () => (
    <>
      {(["min", "max"] as const).map((type) => {
        const pct = Math.round((price[type] / (TIERS.length - 1)) * 100);
        const isTeal = type === "min";
        const color = isTeal ? "#008C99" : "#D63528";
        const id = `ps-range-${type}`;
        return (
          <div key={type} className="mb-3">
            <div className="flex justify-between mb-1.5">
              <span className="text-[12px] text-slate-500 font-semibold">
                {type === "min" ? "Minimum" : "Maximum"}
              </span>
              <span className="text-[14px] font-black text-slate-900">
                ₹{pLabel(TIERS[price[type]])}
              </span>
            </div>
            <style>{`#${id}{background:linear-gradient(to right,${color} ${pct}%,#E2E8F0 ${pct}%)}`}</style>
            <input
              id={id}
              type="range"
              min="0"
              max={TIERS.length - 1}
              step="1"
              value={price[type]}
              onChange={(e) => handlePrice(type, Number(e.target.value))}
              className={`w-full h-1 rounded-full outline-none cursor-pointer appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125 ${isTeal ? "[&::-webkit-slider-thumb]:bg-teal-600" : "[&::-webkit-slider-thumb]:bg-red-600"}`}
            />
            <div className="flex justify-between mt-1">
              {TIERS.map((t, i) => (
                <span
                  key={i}
                  className={`text-[7px] transition-colors font-medium ${price[type] === i ? (isTeal ? "text-teal-600 font-black" : "text-red-600 font-black") : "text-slate-300"}`}
                >
                  {t >= 100 ? `${t / 100}Cr` : `${t}`}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[9999] bg-white border-b border-slate-200 font-sans transition-shadow duration-300 ${
          scrolled
            ? "shadow-[0_2px_20px_rgba(0,0,0,0.07)] py-1"
            : "shadow-none py-2"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => go("/")}
              className="border-none bg-transparent p-0 cursor-pointer shrink-0"
            >
              <img
                src="/logo.png"
                alt="PropScroll"
                className="w-32 h-11 md:w-36 md:h-12 lg:w-40 lg:h-14 object-contain block"
              />
            </button>

            {/* ── DESKTOP (lg+) ── */}
            <div className="hidden lg:flex items-center gap-2.5">
              {/* City Mega dropdown */}
              <div
                className="relative"
                onMouseEnter={openMega}
                onMouseLeave={closeMega}
              >
                <button
                  onClick={() => setShowMega((v) => !v)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border font-bold text-[13px] cursor-pointer transition-all duration-200 text-slate-900 ${showMega ? "border-slate-300 bg-slate-50" : "border-slate-200 bg-white"}`}
                >
                  <MapPin size={14} className="text-red-600 shrink-0" />
                  <span>{selectedCity}</span>
                  <Chevron open={showMega} />
                </button>

                {showMega && (
                  <div
                    className="anim-mega absolute top-[calc(100%+10px)] left-0 w-[800px] bg-white rounded-[20px] border border-slate-200 z-[300] overflow-hidden flex min-h-[420px] shadow-[0_24px_64px_rgba(0,0,0,0.13)]"
                    onMouseEnter={openMega}
                    onMouseLeave={closeMega}
                  >
                    {/* Col 1 — Cities */}
                    <div className="w-[180px] shrink-0 bg-slate-50 border-r border-slate-200 overflow-y-auto">
                      <div className="px-3.5 pt-3.5 pb-1.5">
                        <p className="text-[9px] font-black tracking-[0.15em] text-slate-400 uppercase m-0">
                          City
                        </p>
                      </div>
                      {CITY_DATA.map((city) => (
                        <button
                          key={city.name}
                          onMouseEnter={() => setHovCity(city.name)}
                          onClick={() => goCity(city.name)}
                          className={`c1btn w-full flex items-center justify-between px-3.5 py-2.5 text-left border-none cursor-pointer transition-colors duration-150 ${hovCity === city.name ? "c1btn-on bg-slate-900 text-white" : "bg-transparent text-slate-900 hover:bg-slate-100"}`}
                        >
                          <div>
                            <div className="font-bold text-[13px]">
                              {city.name}
                            </div>
                            <div
                              className={`text-[11px] ${hovCity === city.name ? "text-white/40" : "text-slate-400"}`}
                            >
                              {city.totalListings}
                            </div>
                          </div>
                          <ChevronRight
                            size={12}
                            className="c1btn-arr text-slate-400"
                          />
                        </button>
                      ))}
                    </div>

                    {/* Col 2 — Areas */}
                    <div
                      className="anim-col2 w-[196px] shrink-0 border-r border-slate-200 overflow-y-auto"
                      key={`a-${hovCity}`}
                    >
                      <div className="px-3.5 pt-3.5 pb-1.5">
                        <p className="text-[9px] font-black tracking-[0.15em] text-slate-400 uppercase m-0">
                          Area / Locality
                        </p>
                      </div>
                      {cityData.areas.map((area) => (
                        <button
                          key={area.name}
                          onMouseEnter={() => setHovArea(area.name)}
                          onClick={() => goArea(hovCity, area.name)}
                          className={`c2btn w-full flex items-center justify-between px-3.5 py-2.5 text-left border-none cursor-pointer transition-colors duration-150 ${hovArea === area.name ? "c2btn-on bg-teal-50 text-teal-700 border-l-[3px] border-l-teal-600" : "bg-transparent text-slate-900 hover:bg-slate-100 border-l-[3px] border-l-transparent"}`}
                        >
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-[13px]">
                                {area.name}
                              </span>
                              <Tag
                                label={(area as any).tag}
                                color={(area as any).tagColor}
                              />
                            </div>
                            <div
                              className={`text-[11px] ${hovArea === area.name ? "text-slate-500" : "text-slate-400"}`}
                            >
                              {area.listings} listings
                            </div>
                          </div>
                          <ChevronRight
                            size={12}
                            className="c2btn-arr text-slate-400"
                          />
                        </button>
                      ))}
                    </div>

                    {/* Col 3 — Property Types */}
                    <div
                      className="flex-1 p-[18px] flex flex-col"
                      key={`t-${hovCity}-${hovArea}`}
                    >
                      <div className="flex items-start justify-between mb-3.5">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="m-0 font-black text-[17px] text-slate-900">
                              {areaData.name}
                            </h3>
                            <Tag
                              label={(areaData as any).tag}
                              color={(areaData as any).tagColor}
                              sm
                            />
                          </div>
                          <p className="mt-0.5 mb-0 text-[11px] text-slate-500">
                            {cityData.name} · {areaData.listings} listings
                          </p>
                        </div>
                        <div className="flex flex-col gap-1.5 items-end">
                          {[
                            {
                              label: `All in ${areaData.name}`,
                              cls: "bg-gradient-to-br from-slate-900 to-[#1E3A5F]",
                              fn: () => goArea(hovCity, areaData.name),
                            },
                            {
                              label: `All in ${cityData.name}`,
                              cls: "bg-gradient-to-br from-teal-600 to-[#006e78]",
                              fn: () => goCity(hovCity),
                            },
                          ].map((b) => (
                            <button
                              key={b.label}
                              onClick={b.fn}
                              className={`ps-cta flex items-center gap-1 px-3 py-1.5 rounded-[9px] text-white font-black text-[10px] uppercase tracking-[0.05em] border-none cursor-pointer ${b.cls}`}
                            >
                              {b.label} <ArrowRight size={11} />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 flex-1">
                        {areaData.types.map((pt, i) => (
                          <button
                            key={pt.label}
                            onClick={() =>
                              goCat(hovCity, areaData.name, pt.label)
                            }
                            className={`pcard flex items-center gap-2.5 p-[11px_13px] rounded-xl bg-slate-50 text-left border border-slate-100 cursor-pointer transition-all duration-150 anim-card-${i}`}
                          >
                            <div className="picon w-[34px] h-[34px] rounded-[9px] bg-blue-50 text-teal-600 flex items-center justify-center shrink-0 transition-colors duration-150">
                              {pt.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1 flex-wrap">
                                <span className="font-bold text-[13px] text-slate-900">
                                  {pt.label}
                                </span>
                                <Tag
                                  label={(pt as any).tag}
                                  color={(pt as any).tagColor}
                                  sm
                                />
                              </div>
                              <div className="text-[11px] text-slate-400 mt-px">
                                {pt.count} listings
                              </div>
                            </div>
                            <ChevronRight
                              size={12}
                              className="text-slate-300 shrink-0"
                            />
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100">
                        {[
                          {
                            icon: (
                              <TrendingUp size={11} className="text-teal-600" />
                            ),
                            text: "Prices up 12% this quarter",
                          },
                          {
                            icon: (
                              <Sparkles size={11} className="text-amber-400" />
                            ),
                            text: "RERA verified",
                          },
                        ].map(({ icon, text }) => (
                          <div
                            key={text}
                            className="flex items-center gap-1 text-[11px] text-slate-500"
                          >
                            {icon}
                            <span>{text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Price filter */}
              <div className="relative" ref={filtRef}>
                <button
                  onClick={() => setShowFilt((v) => !v)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border font-bold text-[13px] cursor-pointer transition-all duration-200 text-slate-900 ${showFilt ? "border-slate-300 bg-slate-50" : "border-slate-200 bg-white"}`}
                >
                  <SlidersHorizontal size={14} className="text-teal-600" />
                  <span>
                    ₹{pLabel(TIERS[price.min])} – ₹{pLabel(TIERS[price.max])}
                  </span>
                  <Chevron open={showFilt} />
                </button>
                {showFilt && (
                  <div className="anim-drop absolute top-[calc(100%+10px)] left-0 w-[300px] bg-white rounded-[18px] border border-slate-200 p-5 z-[300] shadow-[0_16px_48px_rgba(0,0,0,0.11)]">
                    <p className="text-[10px] font-black tracking-[0.14em] text-slate-400 uppercase mb-4">
                      Budget Range · ₹
                    </p>
                    <PriceSliders />
                    <div className="bg-slate-50 border border-slate-200 rounded-[10px] p-2.5 mb-3 text-center">
                      <span className="text-[13px] font-black text-slate-900">
                        ₹{pLabel(TIERS[price.min])} – ₹
                        {pLabel(TIERS[price.max])}
                      </span>
                      <span className="text-[11px] text-slate-400 ml-1.5">
                        selected range
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setPrice({ min: 0, max: 4 });
                        onPriceRangeChange?.(0, TIERS[4]);
                      }}
                      className="w-full text-center text-[11px] font-bold text-slate-400 bg-transparent border-none cursor-pointer pt-1 hover:text-red-600 transition-colors"
                    >
                      Reset to default
                    </button>
                  </div>
                )}
              </div>

              <div className="w-px h-6 bg-slate-200 mx-3.5" />

              {/* Nav links */}
              {[
                { route: "/about-us", icon: <Info size={13} />, label: "About Us" },
                { route: "/services", icon: <Briefcase size={13} />, label: "Services" },
                { route: "/area-converter", icon: <Repeat size={13} />, label: "Converter" },
                { route: "/buyer-guide", icon: <GraduationCap size={13} />, label: "Guide" },
              ].map(({ route, icon, label }) => (
                <button
                  key={label}
                  onClick={() => go(route)}
                  className={`nav-link ${navLinkBase} ${isActive(route) ? "nav-link-active text-teal-600" : "text-slate-500 hover:text-teal-600"}`}
                >
                  {icon}
                  <span>{label}</span>
                </button>
              ))}

              <div className="w-px h-6 bg-slate-200 mx-0.5" />

              {/* Wishlist */}
              <button
                onClick={() => go("/wishlist")}
                className="relative px-2.5 py-2 rounded-[10px] border-none bg-transparent text-slate-500 cursor-pointer flex items-center transition-all hover:bg-red-50 hover:text-red-600"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 bg-amber-400 text-slate-900 text-[9px] font-black min-w-[17px] h-[17px] rounded-full flex items-center justify-center px-1 shadow-[0_2px_6px_rgba(252,192,46,0.45)]">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Post Property CTA */}
              <button
                onClick={() => go("/list-land")}
                className="ps-cta flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-black text-[12px] uppercase tracking-[0.06em] border-none cursor-pointer text-white bg-gradient-to-br from-teal-600 to-[#006e78] transition-all duration-200"
              >
                <PlusCircle size={15} />
                <span>Post Property</span>
              </button>
            </div>

            {/* ── TABLET (md–lg) ── */}
            <div className="hidden md:flex lg:hidden items-center gap-2">
              {/* City button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white font-bold text-[12px] text-slate-900 cursor-pointer"
              >
                <MapPin size={13} className="text-red-600 shrink-0" />
                <span>{selectedCity}</span>
                <Chevron open={isOpen} />
              </button>
              {/* Quick links */}
              {[
                { route: "/about-us", label: "About" },
                { route: "/services", label: "Services" },
                { route: "/area-converter", label: "Converter" },
              ].map(({ route, label }) => (
                <button
                  key={label}
                  onClick={() => go(route)}
                  className={`text-[12px] font-bold px-2 py-1.5 rounded-lg border-none bg-transparent cursor-pointer transition-colors ${
                    isActive(route) ? "text-teal-600" : "text-slate-500 hover:text-teal-600"
                  }`}
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => go("/wishlist")}
                className="relative p-2 border-none bg-transparent cursor-pointer text-slate-900"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-amber-400 text-slate-900 text-[9px] font-black min-w-[15px] h-[15px] rounded-full flex items-center justify-center px-[3px]">
                    {wishlistCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => go("/list-land")}
                className="ps-cta flex items-center gap-1 px-3 py-2 rounded-xl font-black text-[11px] uppercase tracking-[0.05em] border-none cursor-pointer text-white bg-gradient-to-br from-teal-600 to-[#006e78]"
              >
                <PlusCircle size={13} />
                <span>Post</span>
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-[10px] bg-slate-100 border-none cursor-pointer text-slate-900 flex items-center"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            {/* ── MOBILE (< md) ── */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => go("/wishlist")}
                className="relative p-2 border-none bg-transparent cursor-pointer text-slate-900"
              >
                <Heart size={22} />
                {wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-amber-400 text-slate-900 text-[9px] font-black min-w-[15px] h-[15px] rounded-full flex items-center justify-center px-[3px]">
                    {wishlistCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-[10px] bg-slate-100 border-none cursor-pointer text-slate-900 flex items-center"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>
      {isOpen && (
        <div className="anim-mob fixed top-[56px] md:top-[52px] lg:top-[60px] left-0 right-0 w-full bg-white border-t border-slate-200 max-h-[84vh] overflow-y-auto z-[9998] shadow-[0_20px_40px_rgba(0,0,0,0.11)]">
          <div className="p-3.5 flex flex-col gap-2">
            {/* About + Services */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { route: "/about-us", icon: <Info size={15} />, label: "About Us", desc: "Who we are" },
                { route: "/services", icon: <Briefcase size={15} />, label: "Services", desc: "What we offer" },
              ].map(({ route, icon, label, desc }) => (
                <button
                  key={label}
                  onClick={() => go(route)}
                  className={`flex items-center gap-2.5 p-[13px_14px] rounded-[14px] border-[1.5px] cursor-pointer text-left transition-colors ${isActive(route) ? "bg-teal-50 border-teal-600" : "bg-slate-50 border-slate-200 hover:bg-teal-50 hover:border-teal-200"}`}
                >
                  <span
                    className={`w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 ${isActive(route) ? "bg-teal-600 text-white" : "bg-teal-100 text-teal-600"}`}
                  >
                    {icon}
                  </span>
                  <div>
                    <div
                      className={`font-black text-[13px] ${isActive(route) ? "text-teal-600" : "text-slate-900"}`}
                    >
                      {label}
                    </div>
                    <div className="text-[10px] text-slate-400">{desc}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-2 py-1">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                Browse by City
              </span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Cities accordion */}
            {CITY_DATA.map((city) => (
              <div
                key={city.name}
                className="rounded-[14px] overflow-hidden border-[1.5px] border-slate-200"
              >
                <button
                  onClick={() =>
                    setMobCity(mobCity === city.name ? null : city.name)
                  }
                  className={`w-full flex items-center justify-between px-4 py-3 border-none cursor-pointer transition-colors duration-200 ${mobCity === city.name ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-900"}`}
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin
                      size={14}
                      className={`shrink-0 ${mobCity === city.name ? "text-amber-400" : "text-red-600"}`}
                    />
                    <div className="text-left">
                      <div className="font-black text-[14px]">{city.name}</div>
                      <div className="text-[11px] opacity-50 mt-px">
                        {city.highlight} · {city.totalListings}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {city.name === selectedCity && (
                      <span className="text-[9px] font-black bg-teal-600 text-white px-2 py-[2px] rounded-full">
                        ACTIVE
                      </span>
                    )}
                    <Chevron open={mobCity === city.name} size={15} />
                  </div>
                </button>

                <div
                  className={`acc ${mobCity === city.name ? "opacity-100 max-h-[900px]" : "opacity-0 max-h-0"}`}
                >
                  <div className="bg-slate-50 p-[10px_12px] flex flex-col gap-1.5">
                    <button
                      onClick={() => goCity(city.name)}
                      className="ps-cta flex items-center justify-center gap-1.5 p-[11px] rounded-[11px] bg-gradient-to-br from-slate-900 to-[#1E3A5F] text-white font-black text-[11px] uppercase tracking-[0.06em] border-none cursor-pointer"
                    >
                      All listings in {city.name} <ArrowRight size={12} />
                    </button>

                    {city.areas.map((area) => {
                      const key = `${city.name}:${area.name}`;
                      const aOpen = mobArea === key;
                      return (
                        <div
                          key={area.name}
                          className="rounded-[11px] overflow-hidden border border-slate-200"
                        >
                          <button
                            onClick={() => setMobArea(aOpen ? null : key)}
                            className={`w-full flex items-center justify-between px-3 py-2.5 border-none cursor-pointer transition-colors duration-150 border-l-[3px] ${aOpen ? "bg-teal-50 text-teal-700 border-l-teal-600" : "bg-white text-slate-900 border-l-transparent hover:bg-slate-50"}`}
                          >
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-[13px]">
                                  {area.name}
                                </span>
                                <Tag
                                  label={(area as any).tag}
                                  color={(area as any).tagColor}
                                />
                              </div>
                              <div className="text-[10px] text-slate-400 mt-px">
                                {area.listings} listings
                              </div>
                            </div>
                            <Chevron open={aOpen} size={13} />
                          </button>

                          <div
                            className={`acc ${aOpen ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0"}`}
                          >
                            <div className="p-[10px_12px] bg-teal-50/40 grid grid-cols-2 gap-1.5">
                              <button
                                onClick={() => goArea(city.name, area.name)}
                                className="ps-cta col-span-2 flex items-center justify-center gap-1.5 p-2 rounded-[9px] bg-gradient-to-br from-teal-600 to-[#006e78] text-white font-black text-[10px] uppercase tracking-[0.06em] border-none cursor-pointer"
                              >
                                All in {area.name} <ArrowRight size={11} />
                              </button>
                              {area.types.map((pt) => (
                                <button
                                  key={pt.label}
                                  onClick={() =>
                                    goCat(city.name, area.name, pt.label)
                                  }
                                  className="flex items-center gap-2 p-[10px_11px] rounded-[10px] bg-white border-[1.5px] border-slate-200 cursor-pointer text-left transition-colors hover:bg-teal-50 hover:border-teal-200"
                                >
                                  <span className="text-teal-600 shrink-0">
                                    {pt.icon}
                                  </span>
                                  <div>
                                    <div className="flex items-center gap-1">
                                      <span className="font-bold text-[12px] text-slate-900">
                                        {pt.label}
                                      </span>
                                      <Tag
                                        label={(pt as any).tag}
                                        color={(pt as any).tagColor}
                                      />
                                    </div>
                                    <div className="text-[10px] text-slate-400">
                                      {pt.count}
                                    </div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}

            {/* Price filter mobile */}
            <div className="bg-slate-50 border-[1.5px] border-slate-200 rounded-[14px] p-4">
              <p className="text-[10px] font-black tracking-[0.14em] text-slate-400 uppercase mb-3">
                Budget Range · ₹
              </p>
              <PriceSliders />
              <div className="bg-white border border-slate-200 rounded-[9px] p-2 text-center">
                <span className="text-[13px] font-black text-slate-900">
                  ₹{pLabel(TIERS[price.min])} – ₹{pLabel(TIERS[price.max])}
                </span>
              </div>
            </div>

            {/* Converter + Guide */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { route: "/area-converter", icon: <Repeat size={14} />, label: "Converter" },
                { route: "/buyer-guide", icon: <GraduationCap size={14} />, label: "Guide" },
              ].map(({ route, icon, label }) => (
                <button
                  key={label}
                  onClick={() => go(route)}
                  className="flex items-center justify-center gap-1.5 p-3 rounded-xl bg-slate-100 border-[1.5px] border-slate-200 text-slate-900 font-black text-[11px] uppercase tracking-[0.06em] cursor-pointer hover:bg-teal-50 hover:border-teal-200 transition-colors"
                >
                  {icon}
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Post Property */}
            <button
              onClick={() => go("/list-land")}
              className="ps-cta flex items-center justify-center gap-2 p-[15px] rounded-[14px] bg-gradient-to-br from-teal-600 to-[#006e78] text-white font-black text-[13px] uppercase tracking-[0.07em] border-none cursor-pointer"
            >
              <PlusCircle size={16} />
              <span>Post Property (Free)</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
