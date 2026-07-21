import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/kk.png";
import { FaArrowRight, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={scrolled ? "navbar scrolled" : "navbar"}>
      <div className="navbar-container">

        {/* Left */}
        <div className="navbar-left">
          <Link to="/" className="logo">
            <img
  src={logo}
  alt="Kaden Koppers Group"
/>
          </Link>

          <div className="logo-divider"></div>
        </div>

        {/* Center */}
        <nav className="nav-menu">
          <Link to="/about">About Us</Link>

          <Link to="/industries">Industries</Link>

          <Link to="/companies">Companies</Link>

          <Link to="/projects">Projects</Link>

          <Link to="/careers">Careers</Link>

          <Link to="/contact">Contact</Link>
        </nav>

        {/* Right */}
        <div className="nav-right">
          <button className="connect-btn">
            <span>Let's Connect</span>

            <div className="arrow-circle">
              <FaArrowRight />
            </div>
          </button>

          <div className="menu-divider"></div>

          <button className="menu-btn">
            <FaBars />
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;