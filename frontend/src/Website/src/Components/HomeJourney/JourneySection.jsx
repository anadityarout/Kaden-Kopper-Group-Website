import React from "react";
import "./JourneySection.css";
import { MapPin } from "lucide-react";

const milestones = [
  { year: "2010", label: "Founded with a vision" },
  { year: "2013", label: "5+ Companies Joined" },
  { year: "2016", label: "25+ Projects Delivered" },
  { year: "2019", label: "Expanded Across India" },
  { year: "2022", label: "Diversified Industries" },
  { year: "2026", label: "11 Companies 500+ Experts" },
];

const JourneySection = () => {
  return (
    <section className="rk-jr-section">

      <div className="rk-jr-overlay" />

      <div className="rk-jr-content">

        <span className="rk-jr-subtitle">OUR JOURNEY</span>
        <h2>A Legacy Built on Trust &amp; Excellence</h2>

        <div className="rk-jr-timeline">

          <div className="rk-jr-line" />

          {milestones.map((item, index) => (
            <div className="rk-jr-item" key={index}>
              <MapPin size={22} className="rk-jr-pin" />
              <div className="rk-jr-dot" />
              <h4>{item.year}</h4>
              <p>{item.label}</p>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default JourneySection;