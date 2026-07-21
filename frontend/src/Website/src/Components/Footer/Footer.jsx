import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

import logo from "../../assets/logo.png";

 import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaGlobe,
  FaPaperPlane,
   FaUsers,
  FaLightbulb,
  FaShieldAlt,
  FaAward,
  FaLeaf
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* LEFT SIDE */}
        <div className="footer-left">

          <div className="footer-logo">
            <img src={logo} alt="Kaden Kopper Group" />

            <div className="footer-logo-text">
              <h2>
                KADEN <br />
                KOPPER
              </h2>

              <span>GROUP</span>
            </div>
          </div>

          <p className="footer-description">
            Kaden Kopper Group brings together innovation, expertise and
            excellence across multiple industries. We build sustainable
            solutions and create long-term value for businesses worldwide.
          </p>

          <div className="footer-line"></div>

          <div className="footer-social">
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaEnvelope /></a>
          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="footer-right">

           <div className="footer-column">
  <h3>Quick Link</h3>

  <Link to="/about">About</Link>
  <Link to="/industries">Industries</Link>
  <Link to="/companies">Companies</Link>
  <Link to="/projects">Projects</Link>
  <Link to="/careers">Career</Link>
  <Link to="/contact">Contact</Link>
</div>

         

          <div className="footer-column contact-column">

    <h3>GET IN TOUCH</h3>

    <div className="footer-contact-item">
        <FaMapMarkerAlt className="contact-icon" />
        <div>
            <h4>Kaden Kopper Group</h4>
            <span>Bhubaneswar, Odisha, India</span>
        </div>
    </div>

    <div className="footer-contact-item">
        <FaPhoneAlt className="contact-icon" />
        <a href="tel:+919876543210">+91 98765 43210</a>
    </div>

    <div className="footer-contact-item">
        <FaEnvelope className="contact-icon" />
        <a href="mailto:info@kadenkopper.com">
            info@kadenkopper.com
        </a>
    </div>

    <div className="footer-contact-item">
        <FaGlobe className="contact-icon" />
        <a href="https://www.kadenkopper.com" target="_blank" rel="noreferrer">
            www.kadenkopper.com
        </a>
    </div>

    <div className="newsletter">
        <h3>NEWSLETTER</h3>

        <p>
            Subscribe to get the latest updates and insights.
        </p>

        <div className="newsletter-box">

            <input
                type="email"
                placeholder="Enter your email"
            />

            <button>
                <FaPaperPlane />
            </button>

        </div>
    </div>

</div>

        </div>

      </div>
      {/* ================= CORE VALUES ================= */}

<div className="footer-values">

  <div className="footer-value">
    <FaUsers className="value-icon" />

    <div>
      <h4>COLLABORATION</h4>
      <p>
        We believe in the power of teamwork and partnerships.
      </p>
    </div>
  </div>

  <div className="footer-value">
    <FaLightbulb className="value-icon" />

    <div>
      <h4>INNOVATION</h4>
      <p>
        We embrace new ideas to deliver better solutions.
      </p>
    </div>
  </div>

  <div className="footer-value">
    <FaShieldAlt className="value-icon" />

    <div>
      <h4>INTEGRITY</h4>
      <p>
        We operate with transparency, honesty and accountability.
      </p>
    </div>
  </div>

  <div className="footer-value">
    <FaAward className="value-icon" />

    <div>
      <h4>QUALITY</h4>
      <p>
        We are committed to delivering excellence in everything we do.
      </p>
    </div>
  </div>

  <div className="footer-value">
    <FaLeaf className="value-icon" />

    <div>
      <h4>SUSTAINABILITY</h4>
      <p>
        We build a better tomorrow through sustainable practices.
      </p>
    </div>
  </div>

</div>

      <div className="footer-bottom">
        © 2026 Kaden Kopper Group. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;