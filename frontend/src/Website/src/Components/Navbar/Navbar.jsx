import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/kk.png";
import { FaArrowRight, FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Home, Info, Building2, Briefcase, Menu as MenuIcon } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Open mobile menu
  const openMenu = () => {
    setMenuOpen(true);
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header className={scrolled ? "navbar scrolled" : "navbar"}>
        <div className="navbar-container">

          {/* ================= LEFT ================= */}
          <div className="navbar-left">

            <NavLink to="/" className="logo" onClick={closeMenu}>
              <img
                src={logo}
                alt="Kaden Koppers Group"
              />
            </NavLink>

            <div className="logo-divider"></div>

          </div>

          {/* ================= CENTER ================= */}
          <nav className="nav-menu">

            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              About Us
            </NavLink>

            <NavLink
              to="/industries"
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              Industries
            </NavLink>

            <NavLink
              to="/services"
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              Companies
            </NavLink>

            <NavLink
              to="/projects"
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              Projects
            </NavLink>

            <NavLink
              to="/careers"
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              Careers
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              Contact
            </NavLink>

          </nav>

          {/* ================= RIGHT ================= */}
          <div className="nav-right">

            <NavLink
              to="/contact"
              className="connect-btn"
              onClick={closeMenu}
            >
              <span>Let's Connect</span>

              <div className="arrow-circle">
                <FaArrowRight />
              </div>
            </NavLink>

            <div className="menu-divider"></div>

            <button
              className="menu-btn"
              onClick={openMenu}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <FaBars />
            </button>

          </div>

        </div>
      </header>

      {/* ================= OVERLAY ================= */}
      <div
        className={
          menuOpen
            ? "mobile-overlay active"
            : "mobile-overlay"
        }
        onClick={closeMenu}
      ></div>

      {/* ================= MOBILE MENU ================= */}
      <aside
        className={
          menuOpen
            ? "mobile-menu active"
            : "mobile-menu"
        }
      >

        {/* Close Button */}
        <div className="mobile-close">
          <button
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        </div>

        {/* Mobile Logo */}
        <div className="mobile-logo">
          <NavLink to="/" onClick={closeMenu}>
            <img
              src={logo}
              alt="Kaden Koppers Group"
            />
          </NavLink>
        </div>

        {/* Mobile Navigation */}
        <nav className="mobile-nav">

          <NavLink
            to="/"
            end
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            onClick={closeMenu}
          >
            About Us
          </NavLink>

          <NavLink
            to="/industries"
            onClick={closeMenu}
          >
            Industries
          </NavLink>

          <NavLink
            to="/services"
            onClick={closeMenu}
          >
            Companies
          </NavLink>

          <NavLink
            to="/projects"
            onClick={closeMenu}
          >
            Projects
          </NavLink>

          <NavLink
            to="/careers"
            onClick={closeMenu}
          >
            Careers
          </NavLink>

          <NavLink
            to="/contact"
            onClick={closeMenu}
          >
            Contact
          </NavLink>

        </nav>

        {/* Mobile Connect Button */}
        <div className="mobile-connect">

          <NavLink
            to="/contact"
            onClick={closeMenu}
            className="mobile-connect-btn"
          >
            Let's Connect

            <FaArrowRight />
          </NavLink>

        </div>

      </aside>

      {/* ================= MOBILE BOTTOM TAB BAR ================= */}
      <nav className="mobile-bottom-nav">

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "bottom-tab active" : "bottom-tab"
          }
        >
          <Home size={20} />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "bottom-tab active" : "bottom-tab"
          }
        >
          <Info size={20} />
          <span>About</span>
        </NavLink>

        <NavLink
          to="/services"
          className={({ isActive }) =>
            isActive ? "bottom-tab active" : "bottom-tab"
          }
        >
          <Building2 size={20} />
          <span>Services</span>
        </NavLink>

        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive ? "bottom-tab active" : "bottom-tab"
          }
        >
          <Briefcase size={20} />
          <span>Projects</span>
        </NavLink>

        <button
          className="bottom-tab"
          onClick={openMenu}
          aria-label="More"
        >
          <MenuIcon size={20} />
          <span>More</span>
        </button>

      </nav>
    </>
  );
};

export default Navbar;