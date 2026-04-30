import React, { useCallback } from "react";
import { Property } from "@/src/types";
import PropertyCard from "@/src/components/property/PropertyCard";

interface PropScrollFeedProps {
  properties: Property[];
  wishlist: string[];
  onWishlistToggle: (id: string, property?: any) => void;
  isLoading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

const PropScrollFeed: React.FC<PropScrollFeedProps> = ({
  properties,
  wishlist,
  onWishlistToggle,
  isLoading = false,
}) => {
  // Memoize wishlist toggle so cards don’t re-render unnecessarily
  const handleWishlistToggle = useCallback(
    (id: string, property?: any) => {
      onWishlistToggle(id, property);
    },
    [onWishlistToggle],
  );

  return (
    <div className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-black text-[#0F2540] tracking-tight">
            The PropScroll Feed
          </h2>
          <p className="text-gray-500 mt-2 font-medium">
            Latest verified properties curated just for you.
          </p>
        </div>

        <div className="hidden md:block">
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            Viewing {properties.length} Results
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            isWishlisted={wishlist.includes(property.id)}
            onWishlistToggle={(id) => handleWishlistToggle(id, property)}
          />
        ))}
      </div>

      {/* Loading skeletons */}
      {isLoading && properties.length === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && properties.length === 0 && (
        <div className="text-center py-24 bg-white rounded-2xl border border-gray-100 shadow-md">
          <h3 className="text-2xl font-black text-[#0F2540] mb-2">
            No properties found.
          </h3>
          <p className="text-gray-500 font-medium">
            Try adjusting your search or filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default React.memo(PropScrollFeed);
