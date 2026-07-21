import React, { useState } from "react";

import Sidebar from "./Components/Sidebar/Sidebar";

import HomeSlider from "./Components/Home/HomeSlider";
import Company from "./Components/Company/Company";
import Projectimage from "./Components/Home/Projectimage";
import CompanyAdmin from "./Components/HomeCompany/CompanyAdmin";

import AboutImage from "./Components/About/AboutImage";

import IndustryImage from "./Components/Industry/IndustryImage";

import CareerPage from "./Components/Career/CareerPage";

import ContactPage from "./Components/Contact/ContactPage";

import ProjectPage from "./Components/Projectpage/ProjectPage"; // ✅ Fixed

function App() {
  const [activePage, setActivePage] = useState("");

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div
        style={{
          flex: 1,
          minWidth: 0,
          background: "#f5f5f5",
          padding: "20px",
          overflow: "auto",
        }}
      >
        {/* Welcome */}

        {activePage === "" && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              fontSize: "28px",
              fontWeight: "600",
            }}
          >
            Welcome to Admin Dashboard
          </div>
        )}

        {/* Home */}

        {activePage === "homeslider" && <HomeSlider />}

        {activePage === "company" && <Company />}

        {activePage === "companyadmin" && <CompanyAdmin />}

        {/* Old Project Image Page */}

        {activePage === "projectimage" && <Projectimage />}

        {/* New Project Management Page */}

        {activePage === "projectpage" && <ProjectPage />}

        {/* About */}

        {activePage === "aboutimage" && <AboutImage />}

        {/* Industry */}

        {activePage === "industryimage" && <IndustryImage />}

        {/* Career */}

        {activePage === "careerpage" && <CareerPage />}

        {/* Contact */}

        {activePage === "contactpage" && <ContactPage />}
      </div>
    </div>
  );
}

export default App;