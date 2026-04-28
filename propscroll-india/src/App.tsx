import React from "react";
import { Routes, Route, useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "./user/components/Navbar";
import Footer from "./user/components/Footer";
import SmartSearch from "@/src/components/ui/SmartSearch";
import HomePage from "@/src/pages/Home";
import AboutUs from "@/src/pages/Dashboard/AboutUs";
import Services from "@/src/user/pages/Services";
import BuyerGuide from "@/src/pages/Dashboard/BuyerGuide";
import PostProperty from "@/src/pages/Dashboard/PostProperty";
import Wishlist from "@/src/pages/Dashboard/Wishlist";
import ToolsPage from "@/src/pages/Dashboard/ToolsPage";
import ContactUs from "@/src/pages/Dashboard/ContactUs";
import CityListings from "@/src/pages/Property/CityListings";
import PropertyDetail from "@/src/pages/Property/PropertyDetail";
import NotFound from "@/src/pages/NotFound";
import { DUMMY_PROPERTIES } from "@/src/constants";
import { normalizeProperty } from "@/src/utils";

// Admin imports
import { AuthProvider } from "./admin/context/AuthContext";
import AdminRoutes from "./admin/routes/AdminRoutes";
import AdminLayout from "./admin/layout/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import Login from "./admin/pages/Login";
import Signup from "./admin/pages/Signup";

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [wishlist, setWishlist] = React.useState<string[]>([]);
  const [isAiOpen, setIsAiOpen] = React.useState(false);

  const isAdminRoute = location.pathname.startsWith("/admin");

  const toggleWishlist = (id: string) =>
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  if (isAdminRoute) {
    return (
      <AuthProvider>
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/signup" element={<Signup />} />
          <Route element={<AdminRoutes />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/properties" element={<div className="p-4 text-slate-600">Properties — coming soon</div>} />
              <Route path="/admin/add-property" element={<div className="p-4 text-slate-600">Add Property — coming soon</div>} />
              <Route path="/admin/leads" element={<div className="p-4 text-slate-600">Leads — coming soon</div>} />
              <Route path="/admin/agents" element={<div className="p-4 text-slate-600">Agents — coming soon</div>} />
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
            element={<Wishlist wishlist={wishlist} onWishlistToggle={toggleWishlist} />}
          />
          <Route path="/city/:city/:area/:category" element={<CityListings />} />
          <Route path="/city/:city/:area" element={<CityListings />} />
          <Route path="/city/:city" element={<CityListings />} />
          <Route
            path="/view-details/:id"
            element={<ViewDetails onContact={() => navigate("/contact")} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <SmartSearch isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
      <Footer />
    </div>
  );
};

const ViewDetails: React.FC<{ onContact: () => void }> = ({ onContact }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const raw = DUMMY_PROPERTIES.find((p) => p.id === id);
  if (!raw) return <div className="p-20 text-center text-slate-500">Property not found.</div>;
  return (
    <PropertyDetail
      property={normalizeProperty(raw)}
      onBack={() => navigate(-1)}
      onContact={onContact}
    />
  );
};

export default App;
