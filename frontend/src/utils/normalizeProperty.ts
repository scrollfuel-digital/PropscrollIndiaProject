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
