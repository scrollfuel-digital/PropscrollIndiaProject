import React from "react";
import { CheckCircle, Heart, Mail, MapPin, Phone, Star } from "lucide-react";
import { generateListings } from "@/src/utils";

const NavPropertyDetail: React.FC<{
  property: any;
  onBack: () => void;
  onContact: () => void;
}> = ({ property, onBack, onContact }) => {
  const [activeTab, setActiveTab] = React.useState<
    "overview" | "amenities" | "location" | "similar"
  >("overview");
  const [saved, setSaved] = React.useState(false);
  const similar = React.useMemo(
    () => generateListings("Nagpur", "Dharampeth", "Apartments").slice(0, 3),
    [],
  );
  
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div
        className="relative h-[420px] overflow-hidden"
        style={{ animation: "navFadeIn .5s ease" }}
      >
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
        <button
          onClick={onBack}
          className="absolute top-20 left-5 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/95 text-slate-900 font-extrabold text-xs cursor-pointer border-none shadow-md z-10"
        >
          ← Back
        </button>
        <button
          onClick={() => setSaved((v) => !v)}
          className={`absolute top-20 right-5 w-10 h-10 rounded-[11px] flex items-center justify-center border-none cursor-pointer transition-colors z-10 ${saved ? "bg-red-500" : "bg-white/90"}`}
        >
          <Heart
            size={16}
            fill={saved ? "#fff" : "none"}
            color={saved ? "#fff" : "#475569"}
          />
        </button>
        <div
          className="absolute bottom-6 left-6 right-6"
          style={{ animation: "navSlideUp .5s ease .1s both" }}
        >
          {property.tag && (
            <span
              className="inline-block text-white text-[10px] font-extrabold px-3 py-1 rounded-lg mb-2"
              style={{ background: property.tagColor }}
            >
              {property.tag}
            </span>
          )}
          <h1 className="text-3xl font-extrabold text-white mb-1.5 drop-shadow-lg">
            {property.title}
          </h1>
          <div className="text-white/85 text-sm flex items-center gap-2">
            <MapPin size={13} />
            {property.location}
            <span className="ml-2 flex items-center gap-1">
              <Star size={12} fill="#FCC02E" color="#FCC02E" />
              <strong>{property.rating}</strong>{" "}
              <span className="opacity-70">({property.reviews})</span>
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
              ₹{property.priceUnit}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              by {property.builder}
            </div>
          </div>
          <div className="flex gap-5 flex-wrap">
            {[
              { l: "Size", v: `${property.size} ${property.unit}` },
              { l: "Facing", v: property.facing },
              { l: "Possession", v: property.possession },
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
            <button className="bg-gray-100 text-slate-900 px-6 py-3 rounded-xl font-extrabold text-sm flex items-center gap-2">
              <Mail size={14} /> Enquire
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3 px-4 py-3 bg-green-50 border border-green-200 rounded-xl">
          <CheckCircle size={14} className="text-green-500" />
          <span className="text-xs font-extrabold text-green-800">
            RERA: {property.rera}
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
                  This {property.title?.toLowerCase()} offers an exceptional
                  experience in {property.location}, built by{" "}
                  <strong>{property.builder}</strong> with modern architecture
                  and premium amenities.
                </p>
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 mb-3">
                  Property Details
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { l: "Size", v: `${property.size} ${property.unit}` },
                    { l: "Facing", v: property.facing },
                    { l: "Possession", v: property.possession },
                    { l: "Builder", v: property.builder },
                    { l: "Rating", v: `⭐ ${property.rating}/5` },
                    { l: "Posted", v: property.posted },
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
                {(property.amenities || []).map((a: string, i: number) => (
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
                  {(property.nearbyPlaces || []).map(
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
                      {property.location}
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
                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all"
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
