import React from "react";
import { useNavigate } from "react-router-dom";
import "./PresenceSection.css";
import { MapPin, ArrowRight } from "lucide-react";
import indiaMap from "../../assets/india.png";

const states = [
  { name: "Jammu & Kashmir", top: "8%", left: "34%" },
  { name: "Himachal Pradesh", top: "16%", left: "37%" },
  { name: "Punjab", top: "19%", left: "33%" },
  { name: "Uttarakhand", top: "20%", left: "42%" },
  { name: "Haryana", top: "23%", left: "35%" },
  { name: "Delhi", top: "25%", left: "37%" },
  { name: "Rajasthan", top: "30%", left: "28%" },
  { name: "Uttar Pradesh", top: "29%", left: "45%" },
  { name: "Bihar", top: "31%", left: "56%" },
  { name: "Sikkim", top: "27%", left: "63%" },
  { name: "Arunachal Pradesh", top: "24%", left: "74%" },
  { name: "Nagaland", top: "31%", left: "76%" },
  { name: "Manipur", top: "34%", left: "75%" },
  { name: "Mizoram", top: "38%", left: "73%" },
  { name: "Tripura", top: "37%", left: "69%" },
  { name: "Meghalaya", top: "33%", left: "68%" },
  { name: "Assam", top: "30%", left: "69%" },
  { name: "West Bengal", top: "38%", left: "62%" },
  { name: "Jharkhand", top: "38%", left: "56%" },
  { name: "Chhattisgarh", top: "43%", left: "51%" },
  { name: "Madhya Pradesh", top: "40%", left: "42%" },
  { name: "Gujarat", top: "43%", left: "22%" },
  { name: "Maharashtra", top: "55%", left: "33%" },
  { name: "Odisha", top: "48%", left: "56%" },
  { name: "Telangana", top: "60%", left: "45%" },
  { name: "Andhra Pradesh", top: "66%", left: "46%" },
  { name: "Goa", top: "63%", left: "28%" },
  { name: "Karnataka", top: "70%", left: "36%" },
  { name: "Tamil Nadu", top: "84%", left: "42%" },
  { name: "Kerala", top: "83%", left: "34%" },
];

const PresenceSection = () => {
  const navigate = useNavigate();

  return (
    <section className="rk-pr-section">
      <div className="rk-pr-inner">

        <div className="rk-pr-left">

          <span className="rk-pr-subtitle">OUR PRESENCE</span>
          <h2>Building Across India</h2>
          <p>
            Delivering excellence across all 29 states
            with a strong nationwide presence.
          </p>

          <button
            className="rk-pr-btn"
            onClick={() => navigate("/presence")}
          >
            View Presence Map
            <ArrowRight size={16} />
          </button>

        </div>

        <div className="rk-pr-right">

          <div className="rk-pr-map-wrap">

            <img
              className="rk-pr-map-img"
              src={indiaMap}
              alt="India map"
            />

            {states.map((state, index) => (
              <div
                className="rk-pr-pin-wrap"
                key={index}
                style={{ top: state.top, left: state.left }}
              >
                <MapPin size={14} className="rk-pr-pin" />
                <span className="rk-pr-pin-label">{state.name}</span>
              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
};

export default PresenceSection;