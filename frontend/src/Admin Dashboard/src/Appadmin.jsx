import React, { useEffect, useState } from "react";

import Sidebar from "./Components/Sidebar/Sidebar";

import HomeSlider from "./Components/Home/Homeslider";
import Company from "./Components/Company/Company";
import Projectimage from "./Components/Home/Projectimage";
import CompanyAdmin from "./Components/HomeCompany/CompanyAdmin";

import AboutImage from "./Components/About/AboutImage";

import IndustryImage from "./Components/Industry/IndustryImage";

import CareerPage from "./Components/Career/CareerPage";

import ContactPage from "./Components/Contact/ContactPage";

import ProjectPage from "./Components/Projectpage/ProjectPage";

function App() {
  const [activePage, setActivePage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ================================
  // CHECK LOGIN
  // ================================

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");

    if (loggedIn === "true") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      window.location.href = "/login";
    }
  }, []);

  // ================================
  // LOADING
  // ================================

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
      }}
    >

      {/* ================================
          SIDEBAR
      ================================= */}

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* ================================
          MAIN CONTENT
      ================================= */}

      <div
        style={{
          flex: 1,
          minWidth: 0,
          minHeight: "100vh",

          background: "#f5f5f5",

          padding: "20px",

          overflow: "auto",

          boxSizing: "border-box",
        }}
      >

        {/* ================================
            WELCOME
        ================================= */}

        {activePage === "" && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              height: "calc(100vh - 40px)",

              fontSize: "28px",
              fontWeight: "600",

              color: "#111827",
            }}
          >
            Welcome to Admin Dashboard
          </div>
        )}

        {/* ================================
            HOME
        ================================= */}

        {activePage === "homeslider" && <HomeSlider />}

        {activePage === "company" && <Company />}

        {activePage === "companyadmin" && <CompanyAdmin />}

        {activePage === "projectimage" && <Projectimage />}

        {/* ================================
            PROJECT
        ================================= */}

        {activePage === "projectpage" && <ProjectPage />}

        {/* ================================
            ABOUT
        ================================= */}

        {activePage === "aboutimage" && <AboutImage />}

        {/* ================================
            INDUSTRY
        ================================= */}

        {activePage === "industryimage" && <IndustryImage />}

        {/* ================================
            CAREER
        ================================= */}

        {activePage === "careerpage" && <CareerPage />}

        {/* ================================
            CONTACT
        ================================= */}

        {activePage === "contactpage" && <ContactPage />}

      </div>
    </div>
  );
}

export default App;