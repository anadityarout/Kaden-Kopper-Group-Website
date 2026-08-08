import React from "react";
import "./WhyChooseSection.css";
import {
  FileText,
  Users,
  BadgeCheck,
  Clock,
  Droplet,
  Handshake,
} from "lucide-react";

const points = [
  {
    icon: FileText,
    title: "Integrated Solutions",
    desc: "End-to-end design and build services",
  },
  {
    icon: Users,
    title: "Expert Team",
    desc: "Highly skilled professionals",
  },
  {
    icon: BadgeCheck,
    title: "Quality Assurance",
    desc: "Committed to highest quality standards",
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    desc: "On-time completion of every project",
  },
  {
    icon: Droplet,
    title: "Sustainable Future",
    desc: "Responsible practices for a better tomorrow",
  },
  {
    icon: Handshake,
    title: "Client Centric",
    desc: "Building lasting relationships",
  },
];

const WhyChooseSection = () => {
  return (
    <section className="rk-wc-section">

      <div className="rk-wc-label">
        <span>WHY CHOOSE</span>
        <h3>KADEN KOPPER GROUP?</h3>
      </div>

      <div className="rk-wc-row">

        {points.map((item, index) => {
          const Icon = item.icon;
          return (
            <div className="rk-wc-item" key={index}>
              <Icon size={24} className="rk-wc-icon" />
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          );
        })}

      </div>

    </section>
  );
};

export default WhyChooseSection;