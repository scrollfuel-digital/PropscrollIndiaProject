import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Property, PropertyStatus } from "@/src/types";
import {
  Heart,
  Maximize2,
  BedDouble,
  MapPin,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

interface PropertyCardProps {
  property: Property;
  isWishlisted?: boolean;
  onWishlistToggle?: (id: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isWishlisted = false,
  onWishlistToggle,
}) => {
  const navigate = useNavigate();

  // Memoized wishlist handler
  const handleWishlist = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onWishlistToggle?.(property.id);
    },
    [onWishlistToggle, property.id],
  );

  const goToDetails = useCallback(() => navigate(`/view-details/${property.id}`), [navigate, property.id]);

  // Memoized badge styles map (calculated once)
  const badgeStyles = useMemo(() => {
    return {
      [PropertyStatus.RERA_REGISTERED]: {
        bg: "bg-[#FCC02E]",
        text: "text-[#0F2540]",
        icon: <ShieldCheck size={10} />,
      },
      [PropertyStatus.NEW_LAUNCH]: {
        bg: "bg-[#FCC02E]",
        text: "text-[#0F2540]",
        icon: null,
      },
      [PropertyStatus.MOVE_IN_READY]: {
        bg: "bg-[#008C99]",
        text: "text-white",
        icon: null,
      },
      [PropertyStatus.VERIFIED]: {
        bg: "bg-[#008C99]",
        text: "text-white",
        icon: <ShieldCheck size={10} />,
      },
    };
  }, []);

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full relative">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.imageUrl}
          alt={property.title}
          loading="lazy" //  Lazy load
          decoding="async" // Faster decoding
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        {/* Status Badges */}
        <div className="absolute top-5 left-5 flex flex-wrap gap-2 max-w-[80%]">
          {property.statuses.map((status) => {
            const styles = badgeStyles[status] || {
              bg: "bg-gray-200",
              text: "text-gray-700",
              icon: null,
            };

            return (
              <span
                key={status}
                className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow flex items-center space-x-1 ${styles.bg} ${styles.text}`}
              >
                {styles.icon}
                <span>{status}</span>
              </span>
            );
          })}
        </div>

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className={`absolute top-5 right-5 p-3 rounded-2xl backdrop-blur-md transition-all duration-300 z-10 ${
            isWishlisted
              ? "bg-[#D63528] text-white"
              : "bg-white/20 text-white hover:bg-white/40"
          }`}
          
        >
          <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        {/* Area / BHK Info */}
        <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-4 py-2 rounded-2xl text-xs font-bold flex items-center space-x-4">
            {property.category !== "Plot" &&
              property.category !== "Industrial Land" && (
                <>
                  <div className="flex items-center space-x-1.5">
                    <BedDouble size={14} className="text-[#FCC02E]" />
                    <span>{property.bhk} BHK</span>
                  </div>
                  <div className="w-[1px] h-3 bg-white/30" />
                </>
              )}

            <div className="flex items-center space-x-1.5">
              <Maximize2 size={14} className="text-[#008C99]" />
              <span>
                {property.area} {property.areaUnit}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4 relative">
          <p className="text-[#008C99] font-bold text-xs uppercase tracking-widest">
            {property.title}
          </p>

          <button
            onClick={() => navigate(`/view-details/${property.id}`)}
            className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-[#D63528] transition-colors"
          >
            <ExternalLink size={18} />
          </button>
        </div>

        <h3 className="text-2xl font-black text-[#0F2540] mb-2">
          {property.priceDisplay}
        </h3>

        <div className="flex items-center space-x-2 text-gray-500 text-sm mb-6">
          <MapPin size={14} className="text-gray-300" />
          <span className="font-medium">
            {property.location}, {property.city}
          </span>
        </div>

        <div className="mt-auto flex gap-3">
          <button
            onClick={() => navigate(`/view-details/${property.id}`)}
            className="flex-1 bg-[#F3F4F6] text-[#0F2540] py-3 rounded-2xl font-bold text-sm hover:bg-gray-200 transition-colors"
          >
            View Details
          </button>

          <button
            onClick={() => navigate("/contact")}
            className="flex-1 bg-[#0F2540] text-white py-3 rounded-2xl font-bold text-sm hover:bg-[#D63528] transition-all active:scale-95"
          >
            Contact Now
          </button>
        </div>
      </div>
    </div>
  );
};

// Custom comparison for maximum performance
export default React.memo(
  PropertyCard,
  (prev, next) =>
    prev.property === next.property && prev.isWishlisted === next.isWishlisted,
);
