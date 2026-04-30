import React from "react";
import { Routes, Route, useLocation, useNavigate, useParams } from "react-router-dom";

// Layout
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import SmartSearch from "@/src/components/ui/SmartSearch";

// User Pages
import HomePage from "@/src/pages/Home";
import AboutUs from "@/src/pages/About";
import Services from "@/src/pages/Services";
import BuyerGuide from "@/src/pages/BuyerGuide";
import PostProperty from "@/src/pages/PostProperty";
import Wishlist from "@/src/pages/Wishlist";
import ToolsPage from "@/src/pages/Tools";
import ContactUs from "@/src/pages/Contact";
import CityListings from "@/src/pages/Property/CityListings";
import PropertyDetail from "@/src/pages/Property/PropertyDetail";
import NotFound from "@/src/pages/NotFound";

// Shared
import { DUMMY_PROPERTIES } from "@/src/constants";
import { normalizeProperty } from "@/src/utils";

// Admin
import { AuthProvider } from "@/src/admin/context/AuthContext";
import AdminRoutes from "@/src/admin/routes/AdminRoutes";
import AdminLayout from "@/src/admin/layout/AdminLayout";
import Dashboard from "@/src/admin/pages/Dashboard";
import Login from "@/src/admin/pages/Login";
import Signup from "@/src/admin/pages/Signup";
import Properties from "@/src/admin/pages/Properties";
import Leads from "@/src/admin/pages/Leads";
import Enquiries from "@/src/admin/pages/Enquiries";

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = React.useState<any[]>(() => {
    try {
      const stored = localStorage.getItem("propscroll_wishlist");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [isAiOpen, setIsAiOpen] = React.useState(false);

  const isAdminRoute = location.pathname.startsWith("/admin");

  const wishlist = wishlistItems.map((p) => p.id);

  const toggleWishlist = (id: string, property?: any) =>
    setWishlistItems((prev) => {
      let next: any[];
      if (prev.some((p) => p.id === id)) {
        next = prev.filter((p) => p.id !== id);
      } else {
        const obj = property ?? DUMMY_PROPERTIES.find((p) => p.id === id);
        if (!obj) return prev;
        const item = obj.imageUrl
          ? {
              id: obj.id,
              title: obj.title,
              location: `${obj.location}, ${obj.city}`,
              image: Array.isArray(obj.imageUrl) ? obj.imageUrl[0] : obj.imageUrl,
              priceUnit: obj.priceDisplay?.replace("₹", "") ?? "",
              rating: obj.growthScore ?? 4.5,
              builder: obj.category ?? "",
              size: obj.area,
              unit: obj.areaUnit,
              tag: obj.statuses?.[0] ?? null,
              tagColor: "#008C99",
            }
          : obj;
        next = [...prev, item];
      }
      localStorage.setItem("propscroll_wishlist", JSON.stringify(next));
      return next;
    });

  if (isAdminRoute) {
    return (
      <AuthProvider>
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/signup" element={<Signup />} />
          <Route element={<AdminRoutes />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/properties" element={<Properties />} />
              <Route path="/admin/leads" element={<Leads />} />
              <Route path="/admin/enquiries" element={<Enquiries />} />
              <Route path="/admin/add-property" element={<div className="p-4 text-slate-600">Add Property — coming soon</div>} />
              <Route path="/admin/categories" element={<div className="p-4 text-slate-600">Categories — coming soon</div>} />
              <Route path="/admin/analytics" element={<div className="p-4 text-slate-600">Analytics — coming soon</div>} />
              <Route path="/admin/settings" element={<div className="p-4 text-slate-600">Settings — coming soon</div>} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 selection:bg-teal-600 selection:text-white overflow-x-hidden">
      <Navbar
        wishlistCount={wishlist.length}
        currentRoute={location.pathname}
        onNavigate={(route) => navigate(route)}
      />

      <main className="flex-grow pt-[40px]">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                wishlist={wishlist}
                onWishlistToggle={toggleWishlist}
                onAiRequest={() => setIsAiOpen(true)}
              />
            }
          />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/buyer-guide" element={<BuyerGuide />} />
          <Route path="/list-land" element={<PostProperty />} />
          <Route path="/area-converter" element={<ToolsPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route
            path="/wishlist"
            element={<Wishlist wishlistItems={wishlistItems} wishlist={wishlist} onWishlistToggle={toggleWishlist} />}
          />
          <Route path="/city/:city/:area/:category" element={<CityListings wishlist={wishlist} onWishlistToggle={toggleWishlist} />} />
          <Route path="/city/:city/:area" element={<CityListings wishlist={wishlist} onWishlistToggle={toggleWishlist} />} />
          <Route path="/city/:city" element={<CityListings wishlist={wishlist} onWishlistToggle={toggleWishlist} />} />
          <Route
            path="/view-details/:id"
            element={<ViewDetails wishlist={wishlist} onWishlistToggle={toggleWishlist} onContact={() => navigate("/contact")} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <SmartSearch isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
      <Footer />
    </div>
  );
};

const ViewDetails: React.FC<{ onContact: () => void; wishlist: string[]; onWishlistToggle: (id: string, property?: any) => void }> = ({ onContact, wishlist, onWishlistToggle }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const raw = DUMMY_PROPERTIES.find((p) => p.id === id);
  if (!raw) return <div className="p-20 text-center text-slate-500">Property not found.</div>;
  const normalized = normalizeProperty(raw);
  return (
    <PropertyDetail
      property={normalized}
      onBack={() => navigate(-1)}
      onContact={onContact}
      wishlist={wishlist}
      onWishlistToggle={(pid) => onWishlistToggle(pid, normalized)}
    />
  );
};

export default App;
