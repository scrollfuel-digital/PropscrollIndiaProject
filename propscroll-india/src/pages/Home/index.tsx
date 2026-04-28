import React from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, GraduationCap, ShieldCheck, BarChart3 } from "lucide-react";
import { Property, PropertyType } from "@/src/types";
import { DUMMY_PROPERTIES } from "@/src/constants";
import Hero from "@/src/components/property/Hero";
import PropScrollFeed from "@/src/components/property/PropScrollFeed";

interface HomePageProps {
  wishlist: string[];
  onWishlistToggle: (id: string) => void;
  onAiRequest: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ wishlist, onWishlistToggle, onAiRequest }) => {
  const navigate = useNavigate();
  const [properties, setProperties] = React.useState<Property[]>(DUMMY_PROPERTIES);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSearch = (query: string, _type: PropertyType) => {
    setIsLoading(true);
    setTimeout(() => {
      let filtered = DUMMY_PROPERTIES;
      if (query)
        filtered = filtered.filter(
          (p) =>
            p.location.toLowerCase().includes(query.toLowerCase()) ||
            p.title.toLowerCase().includes(query.toLowerCase())
        );
      setProperties(filtered);
      setIsLoading(false);
      document.getElementById("feed")?.scrollIntoView({ behavior: "smooth" });
    }, 800);
  };

  const tools = [
    { icon: <PlusCircle size={28} />, title: "Plot Converter", desc: "Vidarbha units.", path: "/area-converter" },
    { icon: <GraduationCap size={28} />, title: "Buyer Guide", desc: "Legals simplified.", path: "/buyer-guide" },
    { icon: <ShieldCheck size={28} />, title: "Layout Check", desc: "NMRDA verification.", path: "/area-converter" },
    { icon: <BarChart3 size={28} />, title: "Price Trends", desc: "Wardha Rd insights.", path: "/area-converter" },
  ];

  return (
    <>
      <Hero onSearch={handleSearch} onAiRequest={onAiRequest} />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tighter">
              Nagpur Land Experts.
            </h2>
            <p className="text-gray-500">Specialized tools for those looking beyond flats.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {tools.map((f, i) => (
              <div
                key={i}
                onClick={() => navigate(f.path)}
                className="p-8 rounded-[2.5rem] border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-2xl transition-all cursor-pointer group"
              >
                <div className="text-teal-600 mb-4 group-hover:scale-110 transition-transform">{f.icon}</div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-gray-400 text-xs">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="feed" className="bg-gray-50 scroll-mt-24">
        <PropScrollFeed
          properties={properties}
          isLoading={isLoading}
          onLoadMore={() => {}}
          hasMore={false}
          onWishlistToggle={onWishlistToggle}
          wishlist={wishlist}
        />
      </section>
    </>
  );
};

export default HomePage;
