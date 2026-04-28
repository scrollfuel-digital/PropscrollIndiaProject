import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import PropertyCard from "@/src/components/property/PropertyCard";
import { DUMMY_PROPERTIES } from "@/src/constants";

interface WishlistProps {
  wishlist: string[];
  onWishlistToggle: (id: string) => void;
}

const Wishlist: React.FC<WishlistProps> = ({ wishlist, onWishlistToggle }) => {
  const navigate = useNavigate();

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

      {wishlist.length === 0 ? (
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
          {DUMMY_PROPERTIES.filter((p) => wishlist.includes(p.id)).map((p) => (
            <PropertyCard
              key={p.id}
              property={p}
              isWishlisted={true}
              onWishlistToggle={onWishlistToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
