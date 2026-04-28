export const ROUTES = {
  HOME: "/",
  ABOUT: "/about-us",
  SERVICES: "/services",
  BUYER_GUIDE: "/buyer-guide",
  POST_PROPERTY: "/list-land",
  AREA_CONVERTER: "/area-converter",
  CONTACT: "/contact",
  WISHLIST: "/wishlist",
  CITY: "/city/:city",
  CITY_AREA: "/city/:city/:area",
  CITY_AREA_CATEGORY: "/city/:city/:area/:category",
  VIEW_DETAILS: "/view-details/:id",
} as const;

export const buildCityRoute = (city: string, area?: string, category?: string) => {
  const slug = (s: string) => s.toLowerCase().replace(/\s+/g, "-");
  let route = `/city/${slug(city)}`;
  if (area) route += `/${slug(area)}`;
  if (category) route += `/${slug(category)}`;
  return route;
};
