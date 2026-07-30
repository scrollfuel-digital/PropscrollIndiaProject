import React from "react";
import { CheckCircle, Heart, Mail, MapPin, Phone, Send, Star, X } from "lucide-react";
import { generateListings } from "@/src/utils";
import { useEnquiry } from "@/src/hooks/useEnquiry";
import { useAtomValue } from "jotai";
import { enquiryState } from "@/src/state/enquiryState";
import { useNavigate } from "react-router-dom";

const NavPropertyDetail: React.FC<{
  property: any;
  onBack: () => void;
  onContact: () => void;
  wishlist: string[];
  onWishlistToggle: (id: string, property?: any) => void;
}> = ({ property, onBack, onContact, wishlist = [], onWishlistToggle = () => {} }) => {
  const [activeTab, setActiveTab] = React.useState<
    "overview" | "amenities" | "location" | "similar"
  >("overview");
  const [showEnquiry, setShowEnquiry] = React.useState(false);
  const [enquiryForm, setEnquiryForm] = React.useState({ name: "", phone: "", propertyTitle: "", propertyLocation: "", message: "" });

  const openEnquiry = () => {
    setEnquiryForm({ name: "", phone: "", propertyTitle: currentProp.title, propertyLocation: currentProp.location, message: "" });
    setShowEnquiry(true);
  };
  const [selectedProp, setSelectedProp] = React.useState<any>(property);
  const [toast, setToast] = React.useState<string | null>(null);
  const { submitEnquiry } = useEnquiry();
  const { loading, success, error } = useAtomValue(enquiryState);
  const navigate = useNavigate();

  const similar = React.useMemo(
    () => generateListings("Nagpur", "Dharampeth", "Apartments").slice(0, 3),
    [],
  );

  const currentProp = selectedProp;
  const isSaved = wishlist.includes(property.id);

  const handleHeartClick = () => {
    onWishlistToggle(property.id, property);
    if (!isSaved) {
      setToast("Saved to Wishlist!");
      setTimeout(() => {
        setToast(null);
        navigate("/wishlist");
      }, 1200);
    } else {
      setToast("Removed from Wishlist");
      setTimeout(() => setToast(null), 1500);
    }
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitEnquiry(enquiryForm);
    setEnquiryForm({ name: "", phone: "", propertyTitle: "", propertyLocation: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Toast */}
      {toast && (
        <div
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl text-sm font-extrabold"
          style={{ animation: "navSlideUp .25s ease" }}
        >
          <Heart size={14} fill="#ef4444" color="#ef4444" /> {toast}
        </div>
      )}

      {/* Enquiry Modal */}
      {showEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-7 shadow-2xl relative" style={{ animation: "navSlideUp .3s ease" }}>
            <button onClick={() => setShowEnquiry(false)} className="absolute top-4 right-4 text-gray-400 hover:text-slate-900">
              <X size={18} />
            </button>
            <h2 className="text-xl font-extrabold text-slate-900 mb-1">Enquire About This Property</h2>
            <p className="text-xs text-gray-400 mb-5">{currentProp.title} · {currentProp.location}</p>
            {success ? (
              <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-5 py-4 text-green-700 font-extrabold text-sm">
                <CheckCircle size={18} /> {success}
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-4">
               
                <input
                  required
                  placeholder="Your Name"
                  value={enquiryForm.name}
                  onChange={(e) => setEnquiryForm((p) => ({ ...p, name: e.target.value }))}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-teal-500 rounded-xl px-4 py-3 outline-none font-bold text-slate-900 text-sm"
                />
                <input
                  required
                  type="tel"
                  placeholder="Phone Number"
                  value={enquiryForm.phone}
                  onChange={(e) => setEnquiryForm((p) => ({ ...p, phone: e.target.value }))}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-teal-500 rounded-xl px-4 py-3 outline-none font-bold text-slate-900 text-sm"
                />
                <textarea
                  required
                  rows={3}
                  placeholder="Your message..."
                  value={enquiryForm.message}
                  onChange={(e) => setEnquiryForm((p) => ({ ...p, message: e.target.value }))}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-teal-500 rounded-xl px-4 py-3 outline-none font-bold text-slate-900 text-sm resize-none"
                />
                {error && <p className="text-xs text-red-500 font-bold">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
                >
                  <Send size={14} /> {loading ? "Sending..." : "Send Enquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <div
        className="relative h-[420px] overflow-hidden"
        style={{ animation: "navFadeIn .5s ease" }}
      >
        <img
          src={currentProp.image}
          alt={currentProp.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
        <button
          onClick={() => { if (selectedProp !== property) { setSelectedProp(property); } else { onBack(); } }}
          className="absolute top-20 left-5 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/95 text-slate-900 font-extrabold text-xs cursor-pointer border-none shadow-md z-10"
        >
          ← Back
        </button>
        <button
          onClick={handleHeartClick}
          className={`absolute top-20 right-5 w-10 h-10 rounded-[11px] flex items-center justify-center border-none cursor-pointer transition-colors z-10 ${isSaved ? "bg-red-500" : "bg-white/90"}`}
        >
          <Heart
            size={16}
            fill={isSaved ? "#fff" : "none"}
            color={isSaved ? "#fff" : "#475569"}
          />
        </button>
        <div
          className="absolute bottom-6 left-6 right-6"
          style={{ animation: "navSlideUp .5s ease .1s both" }}
        >
          {currentProp.tag && (
            <span
              className="inline-block text-white text-[10px] font-extrabold px-3 py-1 rounded-lg mb-2"
              style={{ background: currentProp.tagColor }}
            >
              {currentProp.tag}
            </span>
          )}
          <h1 className="text-3xl font-extrabold text-white mb-1.5 drop-shadow-lg">
            {currentProp.title}
          </h1>
          <div className="text-white/85 text-sm flex items-center gap-2">
            <MapPin size={13} />
            {currentProp.location}
            <span className="ml-2 flex items-center gap-1">
              <Star size={12} fill="#FCC02E" color="#FCC02E" />
              <strong>{currentProp.rating}</strong>{" "}
              <span className="opacity-70">({currentProp.reviews})</span>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 pb-16">
        <div
          className="bg-white rounded-2xl p-6 -mt-9 relative z-10 border border-gray-100 shadow-xl flex items-center justify-between flex-wrap gap-5"
          style={{ animation: "navSlideUp .5s ease .15s both" }}
        >
          <div>
            <div className="text-3xl font-extrabold text-teal-600">
              ₹{currentProp.priceUnit}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              by {currentProp.builder}
            </div>
          </div>
          <div className="flex gap-5 flex-wrap">
            {[
              { l: "Size", v: `${currentProp.size} ${currentProp.unit}` },
              { l: "Facing", v: currentProp.facing },
              { l: "Possession", v: currentProp.possession },
            ].map((info) => (
              <div key={info.l} className="text-center">
                <div className="text-[10px] text-slate-400 font-bold mb-0.5">
                  {info.l}
                </div>
                <div className="font-extrabold text-sm text-slate-900">
                  {info.v}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2.5">
            <button
              onClick={onContact}
              className="bg-teal-600 text-white px-6 py-3 rounded-xl font-extrabold text-sm hover:bg-teal-700 transition-colors flex items-center gap-2"
            >
              <Phone size={14} /> Contact Owner
            </button>
            <button onClick={openEnquiry} className="bg-gray-100 text-slate-900 px-6 py-3 rounded-xl font-extrabold text-sm flex items-center gap-2 hover:bg-gray-200 transition-colors">
              <Mail size={14} /> Enquire
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3 px-4 py-3 bg-green-50 border border-green-200 rounded-xl">
          <CheckCircle size={14} className="text-green-500" />
          <span className="text-xs font-extrabold text-green-800">
            RERA: {currentProp.rera}
          </span>
          <span className="ml-auto text-xs font-extrabold text-green-600">
            Verified ✓
          </span>
        </div>

        <div className="mt-6 bg-white rounded-t-2xl border-2 border-b-0 border-gray-100 flex overflow-hidden">
          {(["overview", "amenities", "location", "similar"] as const).map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 font-extrabold text-sm capitalize border-b-2 bg-transparent cursor-pointer transition-all duration-200 ${
                  activeTab === tab
                    ? "text-[#008C99] border-[#008C99]"
                    : "text-gray-400 border-transparent hover:text-[#0F2540]"
                }`}
              >
                {tab}
              </button>
            ),
          )}
        </div>
        <div
          className="bg-white rounded-b-2xl border-2 border-t-0 border-gray-100 p-8"
          style={{ animation: "navFadeIn .3s ease" }}
        >
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 mb-3">
                  About This Property
                </h2>
                <p className="text-gray-500 leading-relaxed">
                  This {currentProp.title?.toLowerCase()} offers an exceptional
                  experience in {currentProp.location}, built by{" "}
                  <strong>{currentProp.builder}</strong> with modern architecture
                  and premium amenities.
                </p>
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 mb-3">
                  Property Details
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { l: "Size", v: `${currentProp.size} ${currentProp.unit}` },
                    { l: "Facing", v: currentProp.facing },
                    { l: "Possession", v: currentProp.possession },
                    { l: "Builder", v: currentProp.builder },
                    { l: "Rating", v: `${currentProp.rating}/5` },
                    { l: "Posted", v: currentProp.posted },
                  ].map((d) => (
                    <div
                      key={d.l}
                      className="bg-gray-50 rounded-xl p-3 border border-gray-100"
                    >
                      <div className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">
                        {d.l}
                      </div>
                      <div className="text-sm font-extrabold text-slate-900">
                        {d.v}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {activeTab === "amenities" && (
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-4">
                Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(currentProp.amenities || []).map((a: string, i: number) => (
                  <div
                    key={a}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100"
                    style={{ animation: `navCardIn .3s ease ${i * 35}ms both` }}
                  >
                    <div className="w-9 h-9 bg-teal-50 rounded-lg flex items-center justify-center shrink-0">
                      <CheckCircle size={16} className="text-teal-600" />
                    </div>
                    <span className="text-sm font-bold text-slate-900">
                      {a}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "location" && (
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-4">
                Location & Connectivity
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  {(currentProp.nearbyPlaces || []).map(
                    (place: any, i: number) => (
                      <div
                        key={place.name}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 mb-2"
                        style={{
                          animation: `navCardIn .3s ease ${i * 50}ms both`,
                        }}
                      >
                        <span className="text-sm font-bold text-slate-900">
                          {place.name}
                        </span>
                        <span className="text-xs font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-lg">
                          {place.dist}
                        </span>
                      </div>
                    ),
                  )}
                </div>
                <div className="h-36 bg-teal-50 rounded-xl flex items-center justify-center border border-teal-100">
                  <div className="text-center">
                    <MapPin size={24} className="text-teal-600 mx-auto" />
                    <p className="text-sm font-bold mt-2 text-slate-800">
                      {currentProp.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "similar" && (
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-4">
                Similar Properties
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {similar.map((prop: any, i: number) => (
                  <div
                    key={prop.id}
                    onClick={() => { setSelectedProp(prop); setActiveTab("overview"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
                    style={{ animation: `navCardIn .3s ease ${i * 70}ms both` }}
                  >
                    <img
                      src={prop.image}
                      alt={prop.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="text-sm font-extrabold text-slate-900 mb-1.5 leading-snug">
                        {prop.title}
                      </h4>
                      <div className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                        <MapPin size={10} className="text-red-500" />
                        {prop.location}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-base font-extrabold text-teal-600">
                          ₹{prop.priceUnit}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star size={10} fill="#FCC02E" color="#FCC02E" />
                          <span className="text-xs font-extrabold">
                            {prop.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavPropertyDetail;
