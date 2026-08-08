import React from "react";
import "./AwardsSection.css";
import { Award, ShieldCheck, Building2, Trophy, Leaf } from "lucide-react";

const awards = [
  { icon: Award, title: "National Quality Award", year: "2022" },
  { icon: ShieldCheck, title: "ISO 9001:2015 Certified", year: "" },
  { icon: Building2, title: "Best Construction Company", year: "2021" },
  { icon: Trophy, title: "India Business Award", year: "2023" },
  { icon: Leaf, title: "Green Building Council Member", year: "" },
];

const AwardsSection = () => {
  return (
    <section className="rk-aw-section">

      <div className="rk-aw-header">
        <span className="rk-aw-subtitle">AWARDS &amp; CERTIFICATIONS</span>
        <h2>Recognized for Excellence</h2>
      </div>

      <div className="rk-aw-row">

        {awards.map((item, index) => {
          const Icon = item.icon;
          return (
            <div className="rk-aw-card" key={index}>
              <Icon size={36} className="rk-aw-icon" />
              <h4>{item.title}</h4>
              {item.year && <p>{item.year}</p>}
            </div>
          );
        })}

      </div>

    </section>
  );
};

export default AwardsSection;