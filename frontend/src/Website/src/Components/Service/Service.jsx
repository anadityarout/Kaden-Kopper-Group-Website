import React from "react";
import {
  Hammer,
  PenTool,
  Building2,
  Sofa,
  ClipboardList,
  ShieldCheck,
  Users,
  Award,
  Handshake,
  TrendingUp,
  UtensilsCrossed,
  CalendarCheck,
  Flower2,
  Sparkles,
  MapPin,
  Wine,
  CupSoda,
  PackageCheck,
  GraduationCap,
  HeartPulse,
  Music,
  PartyPopper,
  Truck,
  Leaf,
  Recycle,
  Trash2,
  Sprout,
  Heart,
  Cpu,
  Code,
  Globe,
  LifeBuoy,
  ArrowRight,
} from "lucide-react";
import "./Service.css";
import logo from "../../assets/logo.png";
import logo1 from "../../assets/logo1.png";
import logo2 from "../../assets/logo2.png";
import logo3 from "../../assets/logo3.png";
import logo4 from "../../assets/logo4.png";
import logo5 from "../../assets/logo5.png";
import logo6 from "../../assets/logo6.png";
import logo7 from "../../assets/logo7.png";
import logo8 from "../../assets/logo8.png";

const services = [
  {
    icon: Hammer,
    title: "Custom Fiber Craftsmanship",
    description:
      "Handcrafted architectural fiber elements built with precision and lasting quality.",
  },
  {
    icon: PenTool,
    title: "Interior Design Consultation",
    description:
      "Tailored design guidance to bring your vision to life with luxury and detail.",
  },
  {
    icon: Building2,
    title: "Architectural Installations",
    description:
      "Seamless on-site installation of large-scale fiber and interior structures.",
  },
  {
    icon: Sofa,
    title: "Bespoke Furniture & Fixtures",
    description:
      "Custom-made furniture and fixtures crafted to match your space perfectly.",
  },
  {
    icon: ClipboardList,
    title: "Project Management & Execution",
    description:
      "End-to-end coordination ensuring every project is delivered on time.",
  },
  {
    icon: ShieldCheck,
    title: "After-Sales & Maintenance",
    description:
      "Ongoing support and care to keep your interiors looking their best.",
  },
];

const highlights = [
  {
    icon: Users,
    title: "9+ Companies",
    description: "Across Multiple Industries",
  },
  {
    icon: Award,
    title: "Quality & Excellence",
    description: "Our Commitment Always",
  },
  {
    icon: Handshake,
    title: "Customer Focused",
    description: "Your Success is Our Priority",
  },
  {
    icon: TrendingUp,
    title: "Integrated Solutions",
    description: "Stronger Together",
  },
];

const spotlights = [
  {
   logo: logo,
    color: "#C89A2B",
    monogram: "KK",
    logoName: "Kaden Kopper",
    logoSub: "Banquets",
    name: "Kaden Kopper",
    tagline: "Elegant Spaces. Unforgettable Celebrations.",
    description:
      "We provide premium banquet services for weddings, receptions, corporate events, and social gatherings with world-class facilities and exceptional hospitality.",
    features: [
      { icon: Building2, label: "Luxury Banquet Halls" },
      { icon: UtensilsCrossed, label: "Catering Excellence" },
      { icon: CalendarCheck, label: "Event Planning" },
      { icon: Flower2, label: "Decoration & Ambience" },
    ],
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
  },
  {
        logo: logo5,
    color: "#8E3B8E",
    monogram: "RC",
    logoName: "The Royal Craft",
    logoSub: "Fiber Crafting",
    name: "The Royal Craft",
    tagline: "Crafting Beauty. Creating Impressions.",
    description:
      "We specialize in premium fiber crafting for decorative items, custom designs, event decor, and artistic creations that add a royal touch to every occasion.",
    features: [
      { icon: Sparkles, label: "Fiber Decoration" },
      { icon: PenTool, label: "Custom Designs" },
      { icon: Flower2, label: "Event Decor" },
      { icon: Award, label: "Quality Craftsmanship" },
    ],
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
  },
  {
        logo: logo6,
    color: "#7B3FA0",
    monogram: "V",
    logoName: "Vinsjoy",
    logoSub: "By Kaden Koppers",
    name: "Vinsjoy",
    tagline: "",
    description:
      "Curating fine wines and beverages for every celebration and special moment.",
    features: [
      { icon: Wine, label: "Wine Collection" },
      { icon: CupSoda, label: "Beverage Solutions" },
      { icon: PackageCheck, label: "Events Supply" },
      { icon: Users, label: "Customer Experience" },
    ],
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
  },
  {
     logo: logo3,
    color: "#E85D2F",
    monogram: "KF",
    logoName: "Kaden Koppers",
    logoSub: "Foundation",
    name: "Kaden Koppers Foundation",
    tagline: "",
    description:
      "Empowering communities and creating positive impact through social initiatives.",
    features: [
      { icon: GraduationCap, label: "Education" },
      { icon: HeartPulse, label: "Healthcare" },
      { icon: Users, label: "Community Support" },
      { icon: Sparkles, label: "Empowerment" },
    ],
    image:
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80",
  },
  {
        logo: logo4,
    color: "#3F7D4F",
    monogram: "KH",
    logoName: "Kaden Koppers",
    logoSub: "Hospitality",
    name: "Kaden Koppers Hospitality",
    tagline: "",
    description:
      "Delivering exceptional hospitality experiences with comfort and care.",
    features: [
      { icon: Building2, label: "Hotel Management" },
      { icon: Users, label: "Guest Experience" },
      { icon: UtensilsCrossed, label: "Catering Services" },
      { icon: CalendarCheck, label: "Event Hosting" },
    ],
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
  },
  {
        logo: logo1,
    color: "#8E3B8E",
    monogram: "EP",
    logoName: "Event Player",
    logoSub: "By Kaden Koppers",
    name: "Event Player",
    tagline: "",
    description:
      "Turning ideas into extraordinary events with creativity and precision.",
    features: [
      { icon: CalendarCheck, label: "Event Planning" },
      { icon: Music, label: "Stage Production" },
      { icon: PartyPopper, label: "Entertainment" },
      { icon: Truck, label: "Logistics Support" },
    ],
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80",
  },
  {
        logo: logo2,
    color: "#4C8C3C",
    monogram: "GG",
    logoName: "Go Green Life",
    logoSub: "By Kaden Koppers",
    name: "Go Green Life",
    tagline: "",
    description:
      "Promoting a greener tomorrow through sustainable products and solutions.",
    features: [
      { icon: Leaf, label: "Eco Solutions" },
      { icon: Recycle, label: "Green Products" },
      { icon: Trash2, label: "Waste Management" },
      { icon: Sprout, label: "Sustainability" },
    ],
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
  },
  {
        logo: logo7,
    color: "#C23A5E",
    monogram: "WM",
    logoName: "The Wedding Resort",
    logoSub: "By Kaden Koppers",
    name: "The Wedding Resort",
    tagline: "",
    description:
      "Making your dream wedding a reality with perfect planning and execution.",
    features: [
      { icon: Heart, label: "Wedding Planning" },
      { icon: MapPin, label: "Venue Management" },
      { icon: Flower2, label: "Decoration" },
      { icon: Users, label: "Bridal Services" },
    ],
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
  },
  {
        logo: logo8,
    color: "#1E88C7",
    monogram: "ZT",
    logoName: "Zenergy",
    logoSub: "Technology",
    name: "Zenergy",
    tagline: "",
    description:
      "Innovative technology solutions powering businesses towards the future.",
    features: [
      { icon: Cpu, label: "IT Solutions" },
      { icon: Code, label: "Software Development" },
      { icon: Globe, label: "Digital Services" },
      { icon: LifeBuoy, label: "Tech Support" },
    ],
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  },
];

const strip = [
  {
    icon: Users,
    title: "Diverse Expertise",
    description: "Across multiple industries",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    description: "Commitment to excellence",
  },
  {
    icon: Handshake,
    title: "Customer Focused",
    description: "Your success is our priority",
  },
  {
    icon: Leaf,
    title: "Sustainable Growth",
    description: "Building a better tomorrow",
  },
];

const Service = () => {
  return (
    <div className="service-page">

      {/* Service Banner */}
      <section className="service-banner">
        <div className="service-banner-content">
          <h1>Our Services</h1>
        </div>
      </section>

      {/* Services Grid */}
      <section className="rk-serv-section">
        <div className="rk-serv-container">

          <div className="rk-serv-header">
            <span className="rk-serv-eyebrow">
              <span className="rk-serv-eyebrow-line"></span>
              What We Offer
              <span className="rk-serv-eyebrow-line"></span>
            </span>
            <h2 className="rk-serv-heading">Comprehensive Services</h2>
            <p className="rk-serv-subtext">
              End-to-end craftsmanship delivered with expertise, precision, and integrity.
            </p>
          </div>

          <div className="rk-serv-grid">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div className="rk-serv-card" key={index}>
                  <div className="rk-serv-icon-badge">
                    <Icon size={26} strokeWidth={2} color="#ffffff" />
                  </div>
                  <h3 className="rk-serv-card-title">{service.title}</h3>
                  <p className="rk-serv-card-desc">{service.description}</p>
                  <span className="rk-serv-underline"></span>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Highlights Strip */}
      <section className="rk-serv-highlights-section">
        <div className="rk-serv-highlights-container">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div className="rk-serv-highlight-item" key={index}>
                <Icon size={34} strokeWidth={1.5} color="#C89A2B" />
                <h4 className="rk-serv-highlight-title">{item.title}</h4>
                <p className="rk-serv-highlight-desc">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Company Spotlight */}
      <section className="rk-serv-spotlight-section">
        <div className="rk-serv-spotlight-container">
          {spotlights.map((item, index) => (
            <div
              className="rk-serv-spotlight-card"
              key={index}
              style={{ "--rk-spot-color": item.color }}
            >

              <div className="rk-serv-spotlight-logo">
  <img
    src={item.logo}
    alt={item.name}
    className="rk-serv-company-logo"
  />
</div>

              <div className="rk-serv-spotlight-content">
                <h3 className="rk-serv-spotlight-title">{item.name}</h3>
                {item.tagline && (
                  <p className="rk-serv-spotlight-tagline">{item.tagline}</p>
                )}
                <p className="rk-serv-spotlight-desc">{item.description}</p>

                <div className="rk-serv-spotlight-features">
                  {item.features.map((feature, i) => {
                    const Icon = feature.icon;
                    return (
                      <div className="rk-serv-spotlight-feature" key={i}>
                        <Icon size={24} strokeWidth={1.5} color={item.color} />
                        <span>{feature.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rk-serv-spotlight-image">
                <img src={item.image} alt={item.name} />
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* CTA Strip */}
      <section className="rk-serv-strip-section">
        <div className="rk-serv-strip-bar">
          {strip.map((item, index) => {
            const Icon = item.icon;
            return (
              <div className="rk-serv-strip-item" key={index}>
                <Icon size={28} strokeWidth={1.5} color="#C89A2B" />
                <div className="rk-serv-strip-text">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            );
          })}

          <button className="rk-serv-strip-btn">
            Work With Us
            <ArrowRight size={16} strokeWidth={2} />
          </button>
        </div>
      </section>

    </div>
  );
};

export default Service;
