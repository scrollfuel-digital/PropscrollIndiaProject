export function generateListings(city: string, area: string, category: string) {
  const images = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80",
  ];

  return Array.from({ length: 12 }, (_, i) => ({
    id: `nav-${city}-${area}-${category}-${i}`,
    title: `Premium ${category} in ${area}`,
    builder: "Lodha Group",
    location: `${area}, ${city}`,
    price: 7500000 + i * 100000,
    priceUnit: `${75 + i}L`,
    size: 1200 + i * 50,
    unit: "sq.ft",
    image: images[i % images.length],
    tag: i % 2 === 0 ? "Ready to Move" : "New Launch",
    tagColor: "#008C99",
    rating: 4.5,
    reviews: 20 + i,
    posted: `${i + 1}d ago`,
    views: 150 + i * 10,
    features: ["2 BHK", "Lift", "Parking"],
    facing: "East",
    possession: "Immediate",
    rera: `MH/RERA/${1000 + i}`,
    amenities: ["Parking", "Security", "Gym"],
    nearbyPlaces: [
      { name: "Mall", dist: "1 km" },
      { name: "Metro", dist: "0.5 km" },
    ],
  }));
}
