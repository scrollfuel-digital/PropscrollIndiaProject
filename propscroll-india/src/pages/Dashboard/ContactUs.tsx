import React from "react";
import { api } from "@/src/api/axios";
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Send,
  CheckCircle,
  ArrowRight,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Building2,
  Headphones,
  FileText,
  Star,
  ChevronDown,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  city: string;
  budget: string;
  message: string;
}

const INITIAL_FORM: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "General Inquiry",
  city: "Nagpur",
  budget: "Under ₹50L",
  message: "",
};

// ── Sub-components ────────────────────────────────────────────────────────────

const InfoCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  lines: string[];
  accent: string;
  delay?: number;
}> = ({ icon, title, lines, accent, delay = 0 }) => (
  <div
    className="bg-white rounded-[2rem] p-8 border border-gray-100 group cursor-default transition-shadow transition-transform duration-200"
    style={{
      animation: `cuSlideUp .5s ease ${delay}ms both`,
      boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLElement).style.boxShadow =
        "0 16px 48px rgba(0,0,0,0.10)";
      (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLElement).style.boxShadow =
        "0 2px 12px rgba(0,0,0,0.04)";
      (e.currentTarget as HTMLElement).style.transform = "none";
    }}
  >
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
      style={{ background: `${accent}15` }}
    >
      <div style={{ color: accent }}>{icon}</div>
    </div>
    <h3 className="font-black text-[#0F2540] text-base mb-3">{title}</h3>
    {lines.map((line, i) => (
      <p key={i} className="text-gray-500 font-medium text-sm leading-relaxed">
        {line}
      </p>
    ))}
  </div>
);

const FloatingLabel: React.FC<{
  label: string;
  required?: boolean;
  children: React.ReactNode;
}> = ({ label, required, children }) => (
  <div className="relative group">
    <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.15em] mb-2">
      {label}
      {required && <span className="text-[#D63528] ml-1">*</span>}
    </label>
    {children}
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
const ContactUs: React.FC = () => {
  const [form, setForm] = React.useState<ContactFormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = React.useState(false);
  const [activeOffice, setActiveOffice] = React.useState(0);
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  const inputClass =
    "w-full bg-gray-50 border-2 border-transparent focus:border-[#008C99] focus:bg-white rounded-xl px-4 py-3.5 outline-none font-bold text-[#0F2540] text-sm transition-all placeholder:text-gray-300";
  const selectClass =
    "w-full bg-gray-50 border-2 border-transparent focus:border-[#008C99] focus:bg-white rounded-xl px-4 py-3.5 outline-none font-bold text-[#0F2540] text-sm transition-all appearance-none cursor-pointer";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleWhatsApp = () => {
    const phone = "8087092777";

    const text = `Namaste PropScroll! 🏡

I'd like to get in touch regarding a property inquiry.

👤 Name: ${form.name}
📧 Email: ${form.email}
📱 Phone: ${form.phone}
📍 City: ${form.city}
💰 Budget: ${form.budget}
📋 Subject: ${form.subject}
😭
💬 Message:
${form.message}

Sent via PropScroll Contact Page.`;

    window.open(
      `https://wa.me/91${phone}?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/create", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        service: form.subject,
        location: form.city,
        budgetRange: form.budget,
        message: form.message,
      });

      handleWhatsApp();
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err: any) {
      console.error("Error:", err.response?.data?.message ?? err.message);
      alert("Failed to submit form. Please try again.");
    }
  };

  const offices = [
    {
      city: "Nagpur HQ",
      address: "West High Court Road, Dharampeth",
      pin: "Nagpur – 440 010, Maharashtra",
      hours: "Mon–Sat: 9AM – 7PM",
      phone: "+91 782 283 0497",
      tag: "Main Office",
      tagColor: "#008C99",
    },
    {
      city: "Mumbai Desk",
      address: "Bandra Kurla Complex, BKC",
      pin: "Mumbai – 400 051, Maharashtra",
      hours: "Mon–Fri: 10AM – 6PM",
      phone: "+91 982 000 1234",
      tag: "Satellite",
      tagColor: "#8B5CF6",
    },
    {
      city: "Pune Office",
      address: "Koregaon Park, Lane 7",
      pin: "Pune – 411 001, Maharashtra",
      hours: "Mon–Fri: 10AM – 6PM",
      phone: "+91 982 000 5678",
      tag: "Satellite",
      tagColor: "#F59E0B",
    },
  ];

  const faqs = [
    {
      q: "How do I list my property on PropScroll?",
      a: "Click 'Post Property' in the navbar. It's completely free for individual sellers. Fill in the details, upload photos, and your listing goes live within 24 hours after our verification.",
    },
    {
      q: "Is PropScroll only for Nagpur properties?",
      a: "We started in Nagpur and have deep expertise in the Vidarbha region, but we now cover Mumbai, Pune, Wardha, Amravati, and other Maharashtra cities. More cities coming soon.",
    },
    {
      q: "How do I verify a property's RERA status?",
      a: "Every listing on PropScroll shows the RERA registration number. You can use our NIT/NMRDA verification tool or check directly on the Maharashtra RERA portal (maharera.mahaonline.gov.in).",
    },
    {
      q: "Can I schedule a site visit through PropScroll?",
      a: "Yes! Click 'Contact Owner' on any listing and choose WhatsApp or Call. Our team can also assist in coordinating visits for premium listings — just reach out to us directly.",
    },
    {
      q: "What documents should I check before buying a plot?",
      a: "Key documents: 7/12 (Satbara) Extract, NIT/NMRDA Sanction Letter, NA Certificate, Index-II, and Encumbrance Certificate. Our Buyer Guide covers this in detail.",
    },
  ];

  const stats = [
    { value: "18,000+", label: "Happy Buyers" },
    { value: "3,200+", label: "Active Listings" },
    { value: "4.9 ★", label: "Average Rating" },
    { value: "< 2hrs", label: "Avg. Response" },
  ];

  return (
    <>
      <style>{`
        @keyframes cuSlideUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:none} }
        @keyframes cuFadeIn    { from{opacity:0} to{opacity:1} }
        @keyframes cuSlideLeft { from{opacity:0;transform:translateX(28px)} to{opacity:1;transform:none} }
        @keyframes cuCheck     { from{transform:scale(0) rotate(-15deg)} to{transform:scale(1) rotate(0)} }
        @keyframes cuDot       { 0%,100%{opacity:.3} 50%{opacity:1} }
      `}</style>

      <div className="min-h-screen bg-[#FAFBFC] font-sans">
        {/* ── Hero Banner ─────────────────────────────────────────────── */}
        <div
          className="relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #0F2540 0%, #1a3a5c 50%, #0d3347 100%)",
            padding: "80px 0 100px",
          }}
        >
          {/* Decorative circles */}
          <div
            className="absolute pointer-events-none rounded-full"
            style={{
              top: -80,
              right: -80,
              width: 400,
              height: 400,
              background: "rgba(0,140,153,0.08)",
            }}
          />
          <div
            className="absolute pointer-events-none rounded-full"
            style={{
              bottom: -120,
              left: -60,
              width: 320,
              height: 320,
              background: "rgba(252,192,46,0.06)",
            }}
          />
          <div
            className="absolute pointer-events-none rounded-full"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: 600,
              height: 600,
              background:
                "radial-gradient(circle, rgba(0,140,153,0.05) 0%, transparent 70%)",
            }}
          />

          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
            <div style={{ animation: "cuSlideUp .6s ease both" }}>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/10">
                {/* Animated dots — replaces .cu-dot */}
                {[0, 200, 400].map((delay) => (
                  <span
                    key={delay}
                    className="w-2 h-2 rounded-full bg-[#FCC02E] inline-block"
                    style={{ animation: `cuDot 1.4s ease ${delay}ms infinite` }}
                  />
                ))}
                <span className="text-white/70 text-xs font-bold uppercase tracking-widest ml-1">
                  We're Online Now
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-4">
                Let's Talk
                <br />
                <span style={{ color: "#FCC02E" }}>Real Estate.</span>
              </h1>
              <p className="text-white/50 text-xl font-medium max-w-xl mt-6">
                Whether it's a plot in Wardha Road or a villa in Dharampeth —
                our Nagpur team is ready to help you navigate every step.
              </p>
            </div>

            {/* Stats row */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14"
              style={{ animation: "cuSlideUp .6s ease .15s both" }}
            >
              {stats.map((s, i) => (
                <div
                  key={i}
                  /* replaces .cu-stat-card — hover color change handled via group + inline or onMouse */
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-5 text-center hover:bg-white/10 transition-all cursor-default"
                >
                  {/* replaces .cu-stat-val — group-hover changes color */}
                  <div className="text-3xl font-black text-white mb-1 transition-colors group-hover:text-[#008C99]">
                    {s.value}
                  </div>
                  <div className="text-white/40 text-xs font-bold uppercase tracking-widest">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Content ─────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* ── Left column: info ──────────────────────────────────── */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <InfoCard
                icon={<Phone size={22} />}
                title="Call Us Directly"
                lines={["+91 782 283 0497", "Mon – Sat · 9 AM to 7 PM IST"]}
                accent="#008C99"
                delay={0}
              />
              <InfoCard
                icon={<Mail size={22} />}
                title="Email Support"
                lines={["help@propscroll.in", "Replies within 2 working hours"]}
                accent="#D63528"
                delay={80}
              />
              <InfoCard
                icon={<MessageSquare size={22} />}
                title="WhatsApp"
                lines={["+91 782 283 0497", "Tap submit below to open chat"]}
                accent="#22C55E"
                delay={160}
              />

              {/* Office selector */}
              <div
                className="bg-white rounded-[2rem] p-7 border border-gray-100"
                style={{ animation: "cuSlideUp .5s ease 240ms both" }}
              >
                <h3 className="font-black text-[#0F2540] text-base mb-5 flex items-center gap-2">
                  <Building2 size={18} style={{ color: "#008C99" }} /> Our
                  Offices
                </h3>
                {/* Tabs — replaces .cu-office-tab */}
                <div className="flex gap-2 mb-5 flex-wrap">
                  {offices.map((o, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveOffice(i)}
                      className={`px-4 py-2 rounded-xl text-xs font-black border border-gray-100 transition-all duration-200 ${
                        activeOffice === i
                          ? "bg-[#0F2540] text-white"
                          : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      {o.city}
                    </button>
                  ))}
                </div>
                {/* Active office details */}
                {(() => {
                  const o = offices[activeOffice];
                  return (
                    <div style={{ animation: "cuFadeIn .25s ease both" }}>
                      <span
                        className="inline-block text-[9px] font-black px-3 py-1 rounded-full text-white mb-4 uppercase tracking-widest"
                        style={{ background: o.tagColor }}
                      >
                        {o.tag}
                      </span>
                      <div className="space-y-3">
                        {[
                          {
                            icon: <MapPin size={13} />,
                            text: `${o.address}, ${o.pin}`,
                            color: "#D63528",
                          },
                          {
                            icon: <Clock size={13} />,
                            text: o.hours,
                            color: "#008C99",
                          },
                          {
                            icon: <Phone size={13} />,
                            text: o.phone,
                            color: "#22C55E",
                          },
                        ].map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-3 text-sm text-gray-500 font-medium"
                          >
                            <div
                              className="mt-0.5 flex-shrink-0"
                              style={{ color: item.color }}
                            >
                              {item.icon}
                            </div>
                            {item.text}
                          </div>
                        ))}
                      </div>
                      <a
                        href="https://wa.me/918087092777"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 flex items-center gap-2 text-xs font-black text-[#008C99] hover:text-[#006e78] transition-colors"
                      >
                        Open in WhatsApp <ArrowRight size={13} />
                      </a>
                    </div>
                  );
                })()}
              </div>

              {/* Social links */}
              <div
                className="bg-[#0F2540] rounded-[2rem] p-7"
                style={{ animation: "cuSlideUp .5s ease 320ms both" }}
              >
                <h3 className="font-black text-white text-base mb-5">
                  Follow PropScroll
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      icon: <Instagram size={16} />,
                      label: "Instagram",
                      handle: "@propscroll.in",
                      color: "#E4405F",
                      link: "https://www.instagram.com/propscrollindia/",
                    },
                    {
                      icon: <Facebook size={16} />,
                      label: "Facebook",
                      handle: "PropScroll India",
                      color: "#1877F2",
                      link: "https://www.facebook.com/propscrollindia",
                    },
                    {
                      icon: <Youtube size={16} />,
                      label: "Youtube",
                      handle: "@propscroll",
                      color: "#E4405F",
                      link: "https://www.youtube.com/@PropScrollIndia",
                    },
                    {
                      icon: <Linkedin size={16} />,
                      label: "LinkedIn",
                      handle: "PropScroll",
                      color: "#0A66C2",
                      link: "https://www.linkedin.com/company/propscroll-india/",
                    },
                  ].map((s, i) => (
                    <a
                      key={i}
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-white/5 hover:bg-white/10 rounded-xl p-3 transition-all text-left"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `${s.color}20`, color: s.color }}
                      >
                        {s.icon}
                      </div>
                      <div>
                        <div className="text-white text-xs font-black">
                          {s.label}
                        </div>
                        <div className="text-white/30 text-[10px] font-medium">
                          {s.handle}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right column: form ─────────────────────────────────── */}
            <div className="lg:col-span-3">
              <div
                className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden"
                style={{
                  boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
                  animation: "cuSlideLeft .6s ease .1s both",
                }}
              >
                {/* Form header */}
                <div className="px-10 pt-10 pb-7 border-b border-gray-50">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <div className="text-[#008C99] font-black text-xs uppercase tracking-[0.3em] mb-2">
                        Get In Touch
                      </div>
                      <h2 className="text-3xl font-black text-[#0F2540] tracking-tighter">
                        Send Us a Message
                      </h2>
                      <p className="text-gray-400 font-medium mt-1 text-sm">
                        Fills via WhatsApp — instant response guaranteed.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 bg-green-50 border border-green-100 px-4 py-2 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-green-700 text-xs font-black">
                        Team Online
                      </span>
                    </div>
                  </div>
                </div>

                {/* Form body */}
                <form onSubmit={handleSubmit} className="px-10 py-8 space-y-5">
                  {/* Name + Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FloatingLabel label="Full Name" required>
                      <input
                        name="name"
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </FloatingLabel>
                    <FloatingLabel label="Phone Number" required>
                      <input
                        name="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </FloatingLabel>
                  </div>

                  {/* Email */}
                  <FloatingLabel label="Email Address" required>
                    <input
                      name="email"
                      type="email"
                      placeholder="rahul@example.com"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </FloatingLabel>

                  {/* Subject + City */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FloatingLabel label="I'm Looking To">
                      <div className="relative">
                        <select
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          className={selectClass}
                        >
                          {[
                            "General Inquiry",
                            "Buy Property",
                            "Sell My Property",
                            "Rent / Lease",
                            "Investment Advice",
                            "Legal Verification",
                            "Partnership / B2B",
                          ].map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                        <ChevronDown
                          size={14}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                        />
                      </div>
                    </FloatingLabel>
                    <FloatingLabel label="Preferred City">
                      <div className="relative">
                        <select
                          name="city"
                          value={form.city}
                          onChange={handleChange}
                          className={selectClass}
                        >
                          {[
                            "Nagpur",
                            "Mumbai",
                            "Pune",
                            "Wardha",
                            "Amravati",
                            "Chandrapur",
                            "Akola",
                            "Other",
                          ].map((c) => (
                            <option key={c}>{c}</option>
                          ))}
                        </select>
                        <ChevronDown
                          size={14}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                        />
                      </div>
                    </FloatingLabel>
                  </div>

                  {/* Budget */}
                  <FloatingLabel label="Budget Range">
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Under ₹25L",
                        "₹25L – ₹50L",
                        "₹50L – ₹1Cr",
                        "₹1Cr – ₹3Cr",
                        "₹3Cr+",
                      ].map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setForm((p) => ({ ...p, budget: b }))}
                          className={`px-4 py-2 rounded-xl text-xs font-black border-2 transition-all ${
                            form.budget === b
                              ? "bg-[#008C99] border-[#008C99] text-white"
                              : "bg-gray-50 border-gray-100 text-gray-500 hover:border-[#008C99]"
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </FloatingLabel>

                  {/* Message */}
                  <FloatingLabel label="Your Message" required>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Tell us what you're looking for — location, size, timeline, any specific requirements..."
                      required
                      value={form.message}
                      onChange={handleChange}
                      className={`${inputClass} resize-none`}
                    />
                  </FloatingLabel>

                  {/* Trust badges */}
                  <div className="flex flex-wrap gap-3 pt-1">
                    {[
                      {
                        icon: <CheckCircle size={12} />,
                        text: "No spam, ever",
                      },
                      {
                        icon: <Headphones size={12} />,
                        text: "Expert callback",
                      },
                      {
                        icon: <FileText size={12} />,
                        text: "Free consultation",
                      },
                    ].map((b, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1.5 text-gray-400 text-xs font-bold"
                      >
                        <span style={{ color: "#008C99" }}>{b.icon}</span>
                        {b.text}
                      </div>
                    ))}
                  </div>

                  {/* Submit — replaces .cu-send-btn */}
                  <div className="pt-2">
                    {submitted ? (
                      /* replaces .cu-success */
                      <div
                        className="flex items-center justify-center gap-3 bg-green-50 border-2 border-green-200 rounded-2xl px-8 py-5 text-green-700 font-black text-base"
                        style={{
                          animation:
                            "cuCheck .4s cubic-bezier(.2,.9,.3,1.2) both",
                        }}
                      >
                        <CheckCircle size={22} />
                        Message sent! WhatsApp opened — we'll reply shortly.
                      </div>
                    ) : (
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-3 rounded-2xl py-5 font-black text-base uppercase tracking-widest text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,140,153,0.35)] active:scale-[0.97]"
                        style={{
                          background:
                            "linear-gradient(135deg, #008C99, #006e78)",
                        }}
                      >
                        <Send size={18} />
                        Send via WhatsApp
                        <ArrowRight size={16} />
                      </button>
                    )}
                    <p className="text-center text-gray-400 text-xs font-medium mt-3">
                      This will open WhatsApp with your message pre-filled.
                    </p>
                  </div>
                </form>
              </div>

              {/* ── Team availability card ── */}
              <div
                className="mt-6 bg-white rounded-[2rem] border border-gray-100 p-8"
                style={{ animation: "cuSlideLeft .6s ease .25s both" }}
              >
                <h3 className="font-black text-[#0F2540] text-base mb-5 flex items-center gap-2">
                  <Clock size={17} style={{ color: "#008C99" }} /> Response
                  Times
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    {
                      channel: "WhatsApp",
                      time: "< 30 min",
                      color: "#22C55E",
                      dot: true,
                    },
                    {
                      channel: "Phone Call",
                      time: "< 2 hrs",
                      color: "#008C99",
                      dot: true,
                    },
                    {
                      channel: "Email",
                      time: "< 24 hrs",
                      color: "#F59E0B",
                      dot: false,
                    },
                  ].map((r, i) => (
                    <div
                      key={i}
                      className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100"
                    >
                      <div className="flex items-center justify-center gap-1.5 mb-2">
                        {r.dot && (
                          <span
                            className="w-1.5 h-1.5 rounded-full animate-pulse"
                            style={{ background: r.color }}
                          />
                        )}
                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
                          {r.channel}
                        </span>
                      </div>
                      <div
                        className="text-xl font-black"
                        style={{ color: r.color }}
                      >
                        {r.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── FAQ Section ─────────────────────────────────────────── */}
          <div className="mt-16">
            <div className="text-center mb-10">
              <div className="text-[#008C99] font-black text-xs uppercase tracking-[0.3em] mb-3">
                Got Questions?
              </div>
              <h2 className="text-5xl font-black text-[#0F2540] tracking-tighter">
                Frequently Asked
              </h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
                  style={{ animation: `cuSlideUp .4s ease ${i * 60}ms both` }}
                >
                  <button
                    className="w-full flex items-center justify-between px-7 py-5 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-black text-[#0F2540] text-sm pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={17}
                      className="flex-shrink-0 text-slate-400 transition-transform duration-300"
                      style={{
                        transform: openFaq === i ? "rotate(180deg)" : "none",
                      }}
                    />
                  </button>
                  {/* replaces .cu-faq-body.open/.closed — uses max-height transition via inline style */}
                  <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{
                      maxHeight: openFaq === i ? "300px" : "0",
                      opacity: openFaq === i ? 1 : 0,
                    }}
                  >
                    <div className="px-7 pb-6 text-gray-500 font-medium text-sm leading-relaxed border-t border-gray-50 pt-4">
                      {faq.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Bottom CTA ───────────────────────────────────────────── */}
          <div
            className="mt-16 rounded-[3rem] overflow-hidden relative"
            style={{
              background: "linear-gradient(135deg, #0F2540 0%, #1a3a5c 100%)",
              padding: "80px 60px",
              animation: "cuSlideUp .5s ease both",
            }}
          >
            <div
              className="absolute pointer-events-none rounded-full"
              style={{
                top: -60,
                right: -60,
                width: 280,
                height: 280,
                background: "rgba(0,140,153,0.1)",
              }}
            />
            <div
              className="absolute pointer-events-none rounded-full"
              style={{
                bottom: -80,
                left: -40,
                width: 200,
                height: 200,
                background: "rgba(252,192,46,0.08)",
              }}
            />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#FCC02E" color="#FCC02E" />
                  ))}
                  <span className="text-white/40 text-xs font-bold ml-2">
                    4.9 · 2,400+ Reviews
                  </span>
                </div>
                <h3 className="text-4xl font-black text-white tracking-tighter">
                  Ready to find your
                  <br />
                  <span style={{ color: "#FCC02E" }}>perfect property?</span>
                </h3>
                <p className="text-white/40 font-medium mt-3 max-w-md">
                  Join 18,000+ buyers who found their dream home through
                  PropScroll. Start your search today.
                </p>
              </div>
              <div className="flex flex-col gap-3 flex-shrink-0">
                <a
                  href="https://wa.me/918087092777"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 bg-[#FCC02E] text-[#0F2540] px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-xl"
                >
                  <MessageSquare size={16} /> Chat on WhatsApp
                </a>
                <a
                  href="tel:+918087092777"
                  className="flex items-center gap-3 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-colors"
                >
                  <Phone size={16} /> Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
