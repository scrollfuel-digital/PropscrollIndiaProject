import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, MapPin, Star, X } from "lucide-react";
import NavPropertyDetail from "@/src/pages/Property/PropertyDetail";

interface WishlistProps {
  wishlist: string[];
  wishlistItems: any[];
  onWishlistToggle: (id: string, property?: any) => void;
}

const Wishlist: React.FC<WishlistProps> = ({ wishlist, wishlistItems, onWishlistToggle }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = React.useState<any>(null);

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
    <div className="py-24 px-4 md:px-8 max-w-7xl mx-auto min-h-[70vh]">
      <div className="mb-16 flex justify-between items-end">
        <div>
          <div className="text-red-500 font-extrabold text-xs uppercase tracking-[0.3em] mb-4">
            Your Private Collection
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tighter">
            Saved Properties
          </h1>
        </div>
        <div className="hidden md:block bg-gray-100 px-6 py-3 rounded-2xl font-extrabold text-xs uppercase tracking-widest text-gray-500">
          {wishlist.length} Items Saved
        </div>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="bg-white p-20 rounded-[4rem] text-center border-2 border-dashed border-gray-100">
          <Heart size={40} className="text-gray-300 mx-auto mb-6" />
          <h3 className="text-2xl font-extrabold text-slate-900 mb-3">Nothing saved yet!</h3>
          <p className="text-gray-400 mb-8">Tap the heart icon on any property you love.</p>
          <button
            onClick={() => navigate("/")}
            className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-extrabold uppercase tracking-widest hover:bg-red-600 transition-colors"
          >
            Start Scrolling
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlistItems.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelected(p)}
              className="bg-white rounded-[1.5rem] border border-gray-100 overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition-all duration-200 cursor-pointer"
            >
              <div className="relative h-52 overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
                {p.tag && (
                  <span className="absolute top-3 left-3 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md" style={{ background: p.tagColor }}>
                    {p.tag}
                  </span>
                )}
                <button
                  onClick={() => onWishlistToggle(p.id)}
                  className="absolute top-2.5 right-2.5 w-9 h-9 rounded-[9px] bg-red-500 flex items-center justify-center border-none cursor-pointer hover:bg-red-600 transition-colors"
                >
                  <X size={15} color="#fff" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-extrabold text-slate-900 text-sm leading-snug mb-1">{p.title}</h3>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-2">
                  <MapPin size={10} className="text-red-500" /> {p.location}
                </div>
                <div className="flex items-center justify-between pt-2.5 border-t border-gray-100">
                  <span className="font-extrabold text-teal-600 text-base">₹{p.priceUnit}</span>
                  <div className="flex items-center gap-1">
                    <Star size={11} fill="#FCC02E" color="#FCC02E" />
                    <span className="text-[11px] font-extrabold">{p.rating}</span>
                  </div>
                  <span className="text-[11px] text-gray-400">{p.builder || p.size + " " + p.unit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
