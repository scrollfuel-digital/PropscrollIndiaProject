export enum Route {
  HOME = "/",
  AREA_CONVERTER = "/area-converter",
  LIST_LAND = "/list-land",
  CONTACT = "/contact",
  VIEW_DETAILS = "/view-details",
  WISHLIST = "/wishlist",
  BUYER_GUIDE = "/buyer-guide",
}

export enum PropertyStatus {
  VERIFIED = "Verified",
  NEW_LAUNCH = "New Launch",
  RERA_REGISTERED = "RERA Registered",
  MOVE_IN_READY = "Move-in Ready",
}

export enum PropertyType {
  BUY = "BUY",
  RENT = "RENT",
  COMMERCIAL = "COMMERCIAL",
}

export type PropertyCategory =
  | "Flat"
  | "Plot"
  | "Villa"
  | "Agricultural Land"
  | "Commercial Space"
  | "Industrial Land";

export interface Property {
  id: string;
  title: string;
  location: string;
  city: string;
  price: number;
  priceDisplay: string;
  bhk?: number | string;
  area: number;
  areaUnit: "Sq. Ft." | "Sq. Yards" | "Guntha" | "Acre";
  imageUrl?: string[];
  statuses: PropertyStatus[];
  type: PropertyType;
  category: PropertyCategory;
  description?: string;
  amenities?: string[];
  ownerContact?: string;
  growthScore?: number;
  proximity?: {
    metro?: string;
    highway?: string;
    landmark?: string;
  };
}

export interface SearchFilters {
  query: string;
  type: PropertyType;
}
