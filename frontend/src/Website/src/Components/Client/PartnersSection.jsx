import React from "react";
import "./PartnersSection.css";

import logo0 from "../../assets/raddssion.png";
import logo1 from "../../assets/park.png";
import logo2 from "../../assets/hotel.png";
import logo3 from "../../assets/reagency.png";
import logo4 from "../../assets/hilton.png";
import logo5 from "../../assets/holiday.png";
import logo6 from "../../assets/resorts.png";
import logo7 from "../../assets/marriott.png";
import logo8 from "../../assets/jbr.png";
import logo9 from "../../assets/uk.png";
import logo10 from "../../assets/room.png";
import logo11 from "../../assets/saptashree.png";
import logo12 from "../../assets/lawn.png";
import logo13 from "../../assets/jpd.png";
import logo14 from "../../assets/pam.png";

const partners = [
  { name: "Partner 1", logo: logo0 },
  { name: "Partner 2", logo: logo1 },
  { name: "Partner 3", logo: logo2 },
  { name: "Partner 4", logo: logo3 },
  { name: "Partner 5", logo: logo4 },
  { name: "Partner 6", logo: logo5 },
  { name: "Partner 7", logo: logo6 },
  { name: "Partner 8", logo: logo7 },
  { name: "Partner 9", logo: logo8 },
  { name: "Partner 10", logo: logo9 },
  { name: "Partner 11", logo: logo10 },
  { name: "Partner 12", logo: logo11 },
  { name: "Partner 13", logo: logo12 },
  { name: "Partner 14", logo: logo13 },
  { name: "Partner 15", logo: logo14 }
];

const PartnersSection = () => {
  return (
    <section className="rk-part-section">

      <div className="rk-part-header">
        <span className="rk-part-subtitle">OUR PARTNERS</span>
      </div>

      <div className="rk-part-grid">

        {partners.map((partner, index) => (
          <div className="rk-part-card" key={index}>
            <img src={partner.logo} alt={partner.name} loading="lazy" />
          </div>
        ))}

      </div>

    </section>
  );
};

export default PartnersSection;