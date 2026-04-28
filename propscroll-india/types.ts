export enum Route {
  HOME = "/",
  WARDHA_PLOTS = "/wardha-plots",
  DHARAMPETH_LUXURY = "/dharampeth-luxury",
  MIHAN_COMMERCIAL = "/mihan-commercial",
  MANISH_NAGAR_FLATS = "/manish-nagar-flats",
  BESA_LAYOUTS = "/besa-layouts",
  HINGNA_PLOTS = "/hingna-plots",
  BUTIBORI_INDUSTRIAL = "/butibori-industrial",
  KAMPTEE_ROAD = "/kamptee-road",
  AGRICULTURAL_VIDARBHA = "/agricultural-vidarbha",
  NIT_CHECK = "/nit-check",
  NMRDA_LAYOUTS = "/nmrda-layouts",
  PRICE_TRENDS = "/price-trends",
  MARKET_REPORTS = "/market-reports",
  EMI_CALCULATOR = "/emi-calculator",
  AREA_CONVERTER = "/area-converter",
  LIST_LAND = "/list-land",
  SELLER_PORTAL = "/seller-portal",
  SECURITY = "/security",
  CONTACT = "/contact",
  FAQS = "/faqs",
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
