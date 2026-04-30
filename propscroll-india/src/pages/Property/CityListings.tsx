import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, Eye, Clock, MapPin, Star, ChevronRight, Grid3x3, List } from "lucide-react";
import NavPropertyDetail from "@/src/pages/Property/PropertyDetail";

// ── helpers ───────────────────────────────────────────────────────────────────
const unslug = (s: string) =>
  (s || "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

function generateListings(city: string, area: string, category: string) {
  const images = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
    "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=600&q=80",
  ];
  const tags = ["Ready to Move", "New Launch", "RERA Verified", "Hot Deal", "Price Reduced", null];
  const tagColors = ["#22C55E", "#008C99", "#8B5CF6", "#EF4444", "#F59E0B", "#008C99"];
  const builders = ["Lodha Group", "Sobha Developers", "Prestige Estates", "NCC Urban", "Rustomjee", "Kalpataru"];
  const featureMap: Record<string, string[]> = {
    Apartments: ["2 BHK", "Lift Available", "Covered Parking", "Gym"],
    "Luxury Villas": ["4 BHK", "Private Pool", "Home Theatre", "Smart Home"],
    Plots: ["Corner Plot", "East Facing", "Gated Township", "DTCP Approved"],
    Commercial: ["Ground Floor", "High Footfall", "Power Backup", "Corner Unit"],
    "Farm Houses": ["Well Water", "Bore Well", "Mango Orchard", "Farm Road"],
    Warehouses: ["Loading Dock", "High Ceiling", "24x7 Access", "CCTV"],
    Industrial: ["3-Phase Power", "Water Supply", "Boundary Wall", "Road Frontage"],
    "Row Houses": ["3 BHK", "Private Garden", "Parking", "Society Maintenance"],
  };
  const sizeMap: Record<string, { sizes: number[]; unit: string }> = {
    Apartments: { sizes: [850, 1050, 1200, 1450, 750, 1650], unit: "sq.ft" },
    "Luxury Villas": { sizes: [2800, 3500, 4200, 5000, 3200, 4800], unit: "sq.ft" },
    Plots: { sizes: [200, 300, 400, 150, 500, 250], unit: "sq.yd" },
    Commercial: { sizes: [400, 600, 800, 1200, 350, 900], unit: "sq.ft" },
    "Farm Houses": { sizes: [1, 2, 3, 1.5, 2.5, 4], unit: "acres" },
    Warehouses: { sizes: [5000, 8000, 12000, 3500, 7000, 10000], unit: "sq.ft" },
    Industrial: { sizes: [3000, 5000, 8000, 2500, 6000, 4000], unit: "sq.ft" },
    "Row Houses": { sizes: [1400, 1800, 2200, 1600, 2000, 2400], unit: "sq.ft" },
  };
  const cfg = sizeMap[category] || sizeMap["Apartments"];
  const feats = featureMap[category] || featureMap["Apartments"];
  const priceBase: Record<string, number> = {
    Dharampeth: 90, "Wardha Road": 45, Sadar: 70, Hingna: 28,
    Worli: 280, Andheri: 120, Bandra: 220, "Koregaon Park": 180,
  };
  const base = priceBase[area] || 55;
  return Array.from({ length: 12 }, (_, i) => {
    const size = cfg.sizes[i % cfg.sizes.length];
    const price = Math.round(
      (base + (i % 3) * 15) * (size / (cfg.unit === "sq.ft" ? 1000 : cfg.unit === "sq.yd" ? 100 : 10))
    );
    const priceUnit = price >= 10000000 ? `${(price / 10000000).toFixed(1)}Cr` : `${(price / 100000).toFixed(0)}L`;
    return {
      id: `nav-${city}-${area}-${category}-${i}`,
      title: `${["Premium", "Luxurious", "Spacious", "Modern", "Elite", "Grand"][i % 6]} ${category.replace(/s$/, "")} in ${area}`,
      builder: builders[i % builders.length],
      location: `${area}, ${city}`,
      price, priceUnit, size, unit: cfg.unit,
      image: images[i % images.length],
      tag: tags[i % tags.length],
      tagColor: tagColors[i % tagColors.length],
      rating: parseFloat((4.1 + (i % 5) * 0.15).toFixed(1)),
      reviews: 18 + i * 7,
      posted: `${i + 1}d ago`,
      views: 140 + i * 23,
      features: feats.slice(0, 3),
      facing: ["East", "North-East", "South-West", "North"][i % 4],
      possession: ["Immediate", "Dec 2025", "Mar 2026", "Jun 2026"][i % 4],
      rera: `MH/RERA/${String(1000 + i * 47).padStart(5, "0")}`,
      amenities: ["Covered Parking", "24/7 Security", "Power Backup", "Gym", "Swimming Pool", "Club House", "Children Play Area", "Landscaped Garden"],
      nearbyPlaces: [
        { name: "City Mall", dist: "1.2 km" },
        { name: "Metro Station", dist: "0.8 km" },
        { name: "International School", dist: "2.1 km" },
        { name: "Apollo Hospital", dist: "3.4 km" },
      ],
    };
  });
}

// ── Listing Card ──────────────────────────────────────────────────────────────
const ListingCard: React.FC<{
  listing: any;
  onClick: (l: any) => void;
  index: number;
  wishlist: string[];
  onWishlistToggle: (id: string, property?: any) => void;
}> = ({ listing, onClick, index, wishlist, onWishlistToggle }) => {
  const isSaved = wishlist.includes(listing.id);
  return (
    <div
      onClick={() => onClick(listing)}
      className="bg-white rounded-[1.5rem] border border-gray-100 overflow-hidden cursor-pointer group hover:-translate-y-1 hover:shadow-2xl transition-all duration-200"
      style={{ animation: `navCardIn .32s ease ${index * 40}ms both` }}
    >
      <div className="relative h-52 overflow-hidden">
        <img src={listing.image} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/45" />
        {listing.tag && (
          <span className="absolute top-3 left-3 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md" style={{ background: listing.tagColor }}>
            {listing.tag}
          </span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onWishlistToggle(listing.id, listing); }}
          className={`absolute top-2.5 right-2.5 w-9 h-9 rounded-[9px] flex items-center justify-center border-none cursor-pointer transition-all ${isSaved ? "bg-red-500" : "bg-white/90"}`}
        >
          <Heart size={15} fill={isSaved ? "#fff" : "none"} color={isSaved ? "#fff" : "#475569"} />
        </button>
        <div className="absolute bottom-2.5 left-3 text-white text-[11px] flex items-center gap-1"><Eye size={11} /> {listing.views}</div>
        <div className="absolute bottom-2.5 right-3 text-white text-[11px] flex items-center gap-1"><Clock size={11} /> {listing.posted}</div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-extrabold text-slate-900 text-sm leading-snug">{listing.title}</h3>
          <span className="font-extrabold text-[17px] text-teal-600 shrink-0">₹{listing.priceUnit}</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-2">
          <MapPin size={10} className="text-red-500" /> {listing.location}
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {listing.features.map((f: string) => (
            <span key={f} className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-1 rounded-md">{f}</span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-2.5 border-t border-gray-100">
          <span className="text-[11px] text-slate-500"><strong className="text-slate-900">{listing.size}</strong> {listing.unit}</span>
          <div className="flex items-center gap-1">
            <Star size={11} fill="#FCC02E" color="#FCC02E" />
            <span className="text-[11px] font-extrabold">{listing.rating}</span>
          </div>
          <span className="text-[11px] text-gray-400 truncate max-w-[90px]">{listing.builder}</span>
        </div>
      </div>
    </div>
  );
};

// ── City Listings Page ────────────────────────────────────────────────────────
const CityListings: React.FC<{ wishlist?: string[]; onWishlistToggle?: (id: string, property?: any) => void }> = ({
  wishlist = [],
  onWishlistToggle = () => {},
}) => {
  const { city: citySlug, area: areaSlug, category: catSlug } = useParams<{
    city: string; area: string; category?: string;
  }>();
  const navigate = useNavigate();

  const city = unslug(citySlug || "");
  const area = unslug(areaSlug || "");
  const category = unslug(catSlug || "Apartments");

  const allListings = React.useMemo(() => generateListings(city, area, category), [city, area, category]);
  const [filter, setFilter] = React.useState("All");
  const [sort, setSort] = React.useState("Relevance");
  const [gridView, setGridView] = React.useState(true);
  const [selected, setSelected] = React.useState<any>(null);

  const filtered = React.useMemo(() => {
    let r = [...allListings];
    if (filter !== "All") r = r.filter((l) => l.tag === filter);
    if (sort === "Price: Low to High") r.sort((a, b) => a.price - b.price);
    else if (sort === "Price: High to Low") r.sort((a, b) => b.price - a.price);
    else if (sort === "Top Rated") r.sort((a, b) => b.rating - a.rating);
    return r;
  }, [allListings, filter, sort]);

  if (selected) {
    return (
      <NavPropertyDetail
        property={selected}
        onBack={() => setSelected(null)}
        onContact={() => navigate("/contact")}
        wishlist={wishlist}
        onWishlistToggle={onWishlistToggle}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="bg-white border-b border-gray-100 py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-30">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-5 font-bold mt-10">
            <span className="text-teal-600 cursor-pointer" onClick={() => navigate("/")}>Home</span>
            <ChevronRight size={11} />
            <span className="text-teal-600">{city}</span>
            {area && <><ChevronRight size={11} /><span className="text-teal-600">{area}</span></>}
            {catSlug && <><ChevronRight size={11} /><span className="text-slate-800">{category}</span></>}
          </div>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <div className="text-amber-400 font-extrabold text-xs uppercase tracking-[0.3em] mb-2">Direct From Feed</div>
              <h1 className="text-5xl font-extrabold text-slate-900 tracking-tighter">
                {category || "All Properties"}
                {area && <span className="text-teal-600"> in {area}</span>}
              </h1>
              <p className="text-gray-500 font-medium mt-2">{allListings.length} properties · {city}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
                {[{ icon: <Grid3x3 size={15} />, g: true }, { icon: <List size={15} />, g: false }].map(({ icon, g }) => (
                  <button key={String(g)} onClick={() => setGridView(g)}
                    className={`p-2 rounded-lg transition-all ${gridView === g ? "bg-white text-teal-600 shadow-sm" : "text-gray-400"}`}>
                    {icon}
                  </button>
                ))}
              </div>
              <select value={sort} onChange={(e) => setSort(e.target.value)}
                className="px-4 py-2 rounded-xl border-2 border-gray-100 bg-white text-sm font-bold text-slate-900 outline-none cursor-pointer">
                {["Relevance", "Price: Low to High", "Price: High to Low", "Top Rated"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-2 mt-5 flex-wrap">
            {["All", "Ready to Move", "New Launch", "RERA Verified", "Price Reduced"].map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-xs font-extrabold border-2 transition-all ${filter === f ? "bg-teal-600 border-teal-600 text-white" : "bg-white border-gray-200 text-gray-500 hover:border-teal-400"}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className={`grid gap-6 ${gridView ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
          {filtered.map((listing, i) => (
            <ListingCard key={listing.id} listing={listing} onClick={setSelected} index={i} wishlist={wishlist} onWishlistToggle={onWishlistToggle} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CityListings;
