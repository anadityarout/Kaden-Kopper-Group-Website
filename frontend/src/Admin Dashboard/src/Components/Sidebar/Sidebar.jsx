import React, { useState } from "react";
import "./Sidebar.css";

import {
  ChevronDown,
  ChevronRight,
  Home,
  Image,
  Building2,
  Settings,
  Info,
  Factory,
  Newspaper,
  Phone,
  FolderOpen,
} from "lucide-react";

const Sidebar = ({ activePage, setActivePage }) => {

  const [openMenu, setOpenMenu] = useState("");

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? "" : menu);
  };

  return (
    <div className="sidebar">

      {/* ================= LOGO ================= */}

      <div className="sidebar-logo">
        <h2>Admin Panel</h2>
      </div>

      {/* ================= HOME ================= */}

      <div className="menu-section">

        <div
          className="menu-title"
          onClick={() => toggleMenu("home")}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Home size={18} />
            Home
          </span>

          {openMenu === "home" ? (
            <ChevronDown size={18} />
          ) : (
            <ChevronRight size={18} />
          )}
        </div>

        {openMenu === "home" && (

          <div className="submenu">

            {/* Home Slider */}

            <div
              className={
                activePage === "homeslider"
                  ? "submenu-item active"
                  : "submenu-item"
              }
              onClick={() => setActivePage("homeslider")}
            >
              <Image size={16} />
              Home Slider
            </div>

            {/* Company */}

            <div
              className={
                activePage === "company"
                  ? "submenu-item active"
                  : "submenu-item"
              }
              onClick={() => setActivePage("company")}
            >
              <Building2 size={16} />
              Company
            </div>

            {/* Project Image */}

            <div
              className={
                activePage === "projectimage"
                  ? "submenu-item active"
                  : "submenu-item"
              }
              onClick={() => setActivePage("projectimage")}
            >
              <Image size={16} />
              Project Image
            </div>

            {/* Our Companies */}

            <div
              className={
                activePage === "companyadmin"
                  ? "submenu-item active"
                  : "submenu-item"
              }
              onClick={() => setActivePage("companyadmin")}
            >
              <Building2 size={16} />
              Our Companies
            </div>

          </div>

        )}

      </div>

      {/* ================= ABOUT ================= */}

      <div className="menu-section">

        <div
          className="menu-title"
          onClick={() => toggleMenu("about")}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Info size={18} />
            About
          </span>

          {openMenu === "about" ? (
            <ChevronDown size={18} />
          ) : (
            <ChevronRight size={18} />
          )}
        </div>

        {openMenu === "about" && (

          <div className="submenu">

            <div
              className={
                activePage === "aboutimage"
                  ? "submenu-item active"
                  : "submenu-item"
              }
              onClick={() => setActivePage("aboutimage")}
            >
              <Image size={16} />
              About Image
            </div>

          </div>

        )}

      </div>
            {/* ================= INDUSTRY ================= */}

      <div className="menu-section">

        <div
          className="menu-title"
          onClick={() => toggleMenu("industry")}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Factory size={18} />
            Industry
          </span>

          {openMenu === "industry" ? (
            <ChevronDown size={18} />
          ) : (
            <ChevronRight size={18} />
          )}
        </div>

        {openMenu === "industry" && (

          <div className="submenu">

            <div
              className={
                activePage === "industryimage"
                  ? "submenu-item active"
                  : "submenu-item"
              }
              onClick={() => setActivePage("industryimage")}
            >
              <Image size={16} />
              Industry Image
            </div>

          </div>

        )}

      </div>

      {/* ================= CAREER ================= */}

      <div className="menu-section">

        <div
          className="menu-title"
          onClick={() => toggleMenu("career")}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Newspaper size={18} />
            Career
          </span>

          {openMenu === "career" ? (
            <ChevronDown size={18} />
          ) : (
            <ChevronRight size={18} />
          )}
        </div>

        {openMenu === "career" && (

          <div className="submenu">

            <div
              className={
                activePage === "careerpage"
                  ? "submenu-item active"
                  : "submenu-item"
              }
              onClick={() => setActivePage("careerpage")}
            >
              <Image size={16} />
              Career Page
            </div>

          </div>

        )}

      </div>

      {/* ================= PROJECT ================= */}

      <div className="menu-section">

        <div
          className="menu-title"
          onClick={() => toggleMenu("project")}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <FolderOpen size={18} />
            Project
          </span>

          {openMenu === "project" ? (
            <ChevronDown size={18} />
          ) : (
            <ChevronRight size={18} />
          )}
        </div>

        {openMenu === "project" && (

          <div className="submenu">

            <div
              className={
                activePage === "projectpage"
                  ? "submenu-item active"
                  : "submenu-item"
              }
              onClick={() => setActivePage("projectpage")}
            >
              <Image size={16} />
              Project Page
            </div>

          </div>

        )}

      </div>

      {/* ================= CONTACT ================= */}

      <div className="menu-section">

        <div
          className="menu-title"
          onClick={() => toggleMenu("contact")}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Phone size={18} />
            Contact
          </span>

          {openMenu === "contact" ? (
            <ChevronDown size={18} />
          ) : (
            <ChevronRight size={18} />
          )}
        </div>

        {openMenu === "contact" && (

          <div className="submenu">

            <div
              className={
                activePage === "contactpage"
                  ? "submenu-item active"
                  : "submenu-item"
              }
              onClick={() => setActivePage("contactpage")}
            >
              <Image size={16} />
              Contact Page
            </div>

          </div>

        )}

      </div>
            {/* ================= SETTINGS ================= */}

      <div className="menu-section">

        <div
          className={
            activePage === "settings"
              ? "menu-title active-title"
              : "menu-title"
          }
          onClick={() => setActivePage("settings")}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Settings size={18} />
            Site Settings
          </span>
        </div>

      </div>

    </div>
  );
};

export default Sidebar;