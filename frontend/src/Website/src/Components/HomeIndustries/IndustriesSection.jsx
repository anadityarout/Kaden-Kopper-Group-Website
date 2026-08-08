import React from "react";
import "./IndustriesSection.css";
import {
  Building2,
  HardHat,
  Landmark,
  PartyPopper,
  Settings,
  Home,
} from "lucide-react";

const industries = [
  { icon: Building2, title: "Architecture", subtitle: "& Design" },
  { icon: HardHat, title: "Construction", subtitle: "& Infrastructure" },
  { icon: Landmark, title: "Hospitality", subtitle: "& Resorts" },
  { icon: PartyPopper, title: "Events", subtitle: "& Entertainment" },
  { icon: Settings, title: "Manufacturing", subtitle: "& Engineering" },
  { icon: Home, title: "Real Estate", subtitle: "& Investments" },
];

const IndustriesSection = () => {
  return (
    <section className="rk-ind-section">

      <div className="rk-ind-header">
        <span className="rk-ind-subtitle">— INDUSTRIES WE SERVE —</span>
        <h2>
          Excellence Across
          <br />
          Multiple Industries
        </h2>
        <div className="rk-ind-divider" />
      </div>

      <div className="rk-ind-row">

        {industries.map((item, index) => {
          const Icon = item.icon;
          return (
            <div className="rk-ind-item" key={index}>
              <Icon size={30} className="rk-ind-icon" />
              <h4>{item.title}</h4>
              <p>{item.subtitle}</p>
            </div>
          );
        })}

      </div>

    </section>
  );
};

export default IndustriesSection;