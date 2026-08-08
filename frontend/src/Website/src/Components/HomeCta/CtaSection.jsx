import React from "react";
import { useNavigate } from "react-router-dom";
import "./CtaSection.css";
import { ArrowRight } from "lucide-react";

const CtaSection = () => {
  const navigate = useNavigate();

  return (
    <section className="rk-cta-section">

      <div className="rk-cta-overlay" />

      <div className="rk-cta-content">

        <h2>Ready to Build Your Next Landmark?</h2>
        <p>Let's create something extraordinary together.</p>

        <div className="rk-cta-buttons">

          <button
            className="rk-cta-btn-filled"
            onClick={() => navigate("/contact")}
          >
            Get in Touch
            <ArrowRight size={16} />
          </button>

          <button
            className="rk-cta-btn-outline"
            onClick={() => navigate("/contact")}
          >
            Contact Us
            <ArrowRight size={16} />
          </button>

        </div>

      </div>

    </section>
  );
};

export default CtaSection;