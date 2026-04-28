export function normalizeProperty(p: any): any {
  const imageUrl = Array.isArray(p.imageUrl) ? p.imageUrl : [];
  const image =
    p.image ||
    imageUrl[0] ||
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80";
  const priceUnit =
    p.priceUnit ||
    (p.price >= 10000000
      ? `${(p.price / 10000000).toFixed(2).replace(/\.?0+$/, "")}Cr`
      : `${(p.price / 100000).toFixed(0)}L`);
  return {
    ...p,
    image,
    images: imageUrl.length > 0 ? imageUrl : [image],
    priceUnit,
    size: p.size ?? p.area ?? "N/A",
    unit: p.unit ?? p.areaUnit ?? "Sq. Ft.",
    builder: p.builder ?? p.developerName ?? "Reputed Builder",
    facing: p.facing ?? "East",
    possession: p.possession ?? "Ready to Move",
    rera: p.rera ?? p.reraNumber ?? "Applied",
    rating: p.rating ?? 4.5,
    reviews: p.reviews ?? 24,
    posted: p.posted ?? "Recently",
    views: p.views ?? 200,
    tag: p.tag ?? (p.statuses?.[0] ? String(p.statuses[0]) : null),
    tagColor: p.tagColor ?? "#008C99",
    features: p.features ?? p.amenities?.slice(0, 3) ?? [],
    amenities: p.amenities ?? [],
    nearbyPlaces: p.nearbyPlaces ?? [
      { name: "City Centre", dist: "2 km" },
      { name: "Metro Station", dist: "1.5 km" },
      { name: "Highway", dist: "3 km" },
    ],
  };
}

export function generateListings(city: string, area: string, category: string) {
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

export function parseCityHash(hash: string): { city: string; area: string; category: string } | null {
  const path = hash.replace(/^#?\//, "");
  const parts = path.split("/");
  if (parts[0] !== "city" || parts.length < 3) return null;
  const unslug = (s: string) => s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    city: unslug(parts[1] || ""),
    area: unslug(parts[2] || ""),
    category: unslug(parts[3] || ""),
  };
}
