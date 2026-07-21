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
  const [homeOpen, setHomeOpen] = useState(true);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [industryOpen, setIndustryOpen] = useState(false);
  const [mediaOpen, setMediaOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);

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
          onClick={() => setHomeOpen(!homeOpen)}
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

          {homeOpen ? (
            <ChevronDown size={18} />
          ) : (
            <ChevronRight size={18} />
          )}
        </div>

        {homeOpen && (
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
    onClick={() => setAboutOpen(!aboutOpen)}
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

    {aboutOpen ? (
      <ChevronDown size={18} />
    ) : (
      <ChevronRight size={18} />
    )}
  </div>

  {aboutOpen && (
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
    onClick={() => setIndustryOpen(!industryOpen)}
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

    {industryOpen ? (
      <ChevronDown size={18} />
    ) : (
      <ChevronRight size={18} />
    )}
  </div>

  {industryOpen && (
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

  {/* ================= MEDIA ================= */}

<div className="menu-section">
  <div
    className="menu-title"
    onClick={() => setMediaOpen(!mediaOpen)}
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

    {mediaOpen ? (
      <ChevronDown size={18} />
    ) : (
      <ChevronRight size={18} />
    )}
  </div>

  {mediaOpen && (
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
    onClick={() => setProjectOpen(!projectOpen)}
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

    {projectOpen ? (
      <ChevronDown size={18} />
    ) : (
      <ChevronRight size={18} />
    )}

  </div>

  {projectOpen && (

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
    onClick={() => setContactOpen(!contactOpen)}
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

    {contactOpen ? (
      <ChevronDown size={18} />
    ) : (
      <ChevronRight size={18} />
    )}
  </div>

  {contactOpen && (
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