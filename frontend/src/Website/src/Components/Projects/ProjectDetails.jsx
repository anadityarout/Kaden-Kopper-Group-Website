import React, { useState, useEffect } from "react";
import "./ProjectDetails.css";

/* ==========================================
   API
========================================== */

const API_URL =
  "https://a9vqiga5na.execute-api.ap-south-1.amazonaws.com/prod/project";

/* ==========================================
   COMPANY LOGOS
========================================== */

import logo from "../../assets/logo.png";
import logo1 from "../../assets/logo1.png";
import logo2 from "../../assets/logo2.png";
import logo3 from "../../assets/logo3.png";
import logo4 from "../../assets/logo4.png";
import logo5 from "../../assets/logo5.png";
import logo6 from "../../assets/logo6.png";
import logo7 from "../../assets/logo7.png";
import logo8 from "../../assets/logo8.png";

/* ==========================================
   HERO IMAGE
========================================== */

import projectHero from "../../assets/project.jpg";

/* ==========================================
   COMPONENT
========================================== */

const ProjectDetails = () => {

  /* ==========================================
     HERO
  ========================================== */

  const heroData = {
    image: projectHero,
  };

  /* ==========================================
     COMPANIES
  ========================================== */

  const companies = [

    {
      id: 1,
      name: "KADEN KOPPERS GROUP",
      logo: logo,
      categories: [
        "ALL PROJECTS",
        "RESORTS",
        "BANQUETS",
        "HOTELS",
        "VILLAS",
        "STUDIOS",
        "FARMHOUSES",
        "COTTAGES",
      ],
    },

    {
      id: 2,
      name: "THE ROYAL CRAFT",
      logo: logo5,
      categories: [
        "ALL PROJECTS",
        "EXTERIOR",
        "FIBER MANDAP",
        "FIBER GATE",
        "FIBER WORK",
        "FIBER STAGE",
        "FOUNTAIN",
        "GAZEBO",
        "INTERIOR",
        "URLI",
        "STATUE",
      ],
    },

    {
      id: 3,
      name: "VINSJOY",
      logo: logo6,
      categories: [
        "ALL PROJECTS",
        "FURNITURE",
        "LIGHTS",
        "CARPETS",
        "ARTIFICIAL GLASS & WATER",
        "FABRIC DECOR",
        "FIBER DECOR",
        "CATERING",
        "FOOD COUNTER",
        "SELFIE POINT",
        "DJ & SOUND",
      ],
    },

    {
      id: 4,
      name: "KADEN KOPPER FOUNDATION",
      logo: logo3,
      categories: [
        "ALL PROJECTS",
        "OFFICES",
        "LABS",
        "IT PARK",
      ],
    },

    {
      id: 5,
      name: "KADEN KOPPERS HOSPITALITY",
      logo: logo4,
      categories: [
        "ALL PROJECTS",
        "EVENTS",
        "SHOWS",
        "CORPORATE",
      ],
    },

    {
      id: 6,
      name: "EVENT PLAYER",
      logo: logo1,
      categories: [
        "ALL PROJECTS",
        "CORPORATE",
        "OFFICES",
        "INTERIOR",
      ],
    },

    {
      id: 7,
      name: "GO GREEN LIFE",
      logo: logo2,
      categories: [
        "ALL PROJECTS",
        "VILLAS",
        "PENTHOUSES",
        "APARTMENTS",
      ],
    },

    {
      id: 8,
      name: "THE WEDDING MITRA",
      logo: logo7,
      categories: [
        "ALL PROJECTS",
        "COMMERCIAL",
        "RESIDENTIAL",
        "MALLS",
      ],
    },

    {
      id: 9,
      name: "ZENERGY",
      logo: logo8,
      categories: [
        "ALL PROJECTS",
        "FARMS",
        "GREEN BUILDINGS",
        "LANDSCAPES",
      ],
    },

  ];
    /* ==========================================
     STATE
  ========================================== */

  const [projects, setProjects] = useState([]);

  const [selectedCompany, setSelectedCompany] =
    useState(1);

  const [selectedCategory, setSelectedCategory] =
    useState("ALL PROJECTS");

  /* ==========================================
     LOAD PROJECTS
  ========================================== */

  useEffect(() => {

    loadProjects();

  }, []);

  const loadProjects = async () => {

    try {

      const response = await fetch(API_URL);

      const data = await response.json();

      if (Array.isArray(data)) {

        setProjects(data);

      } else {

        setProjects([]);

      }

    } catch (error) {

      console.error(
        "Failed to load projects:",
        error
      );

      setProjects([]);

    }

  };

  /* ==========================================
     CURRENT COMPANY
  ========================================== */

  const currentCompany =
    companies.find(
      (company) => company.id === selectedCompany
    );

  /* ==========================================
     FILTER PROJECTS
  ========================================== */

  const filteredProjects = projects.filter(
    (project) => {

      if (
        project.company !== currentCompany.name
      ) {
        return false;
      }

      if (
        selectedCategory === "ALL PROJECTS"
      ) {
        return true;
      }

      return (
        project.category === selectedCategory
      );

    }
  );
    return (
    <div className="project-page">

      {/* ==========================================
          HERO SECTION
      ========================================== */}

      <section className="project-hero">

        <div className="hero-right">

          <img
            src={heroData.image}
            alt="Project Hero"
          />

        </div>

      </section>

      {/* ==========================================
          COMPANY BAR
      ========================================== */}

      <section className="company-bar">

        {companies.map((company) => (

          <div
            key={company.id}
            className={`company-item ${
              selectedCompany === company.id
                ? "active"
                : ""
            }`}
            onClick={() => {

              setSelectedCompany(company.id);

              setSelectedCategory(
                "ALL PROJECTS"
              );

            }}
          >

            <div className="company-logo">

              <img
                src={company.logo}
                alt={company.name}
              />

            </div>

            <div className="company-info">

              <h4>{company.name}</h4>

            </div>

          </div>

        ))}

      </section>

      {/* ==========================================
          CATEGORY BAR
      ========================================== */}

      <section className="category-bar">

        {currentCompany.categories.map(
          (category) => (

            <button
              key={category}
              className={`category-btn ${
                selectedCategory === category
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setSelectedCategory(category)
              }
            >
              {category}
            </button>

          )
        )}

      </section>

      {/* ==========================================
          PROJECTS
      ========================================== */}

      <section className="projects-section">

        <div className="projects-grid">
                    {filteredProjects.length > 0 ? (

            filteredProjects.map((project) => (

              <div
                className="project-card"
                key={project.id}
              >

                {/* ===============================
                    PROJECT IMAGE
                =============================== */}

                <div className="project-image">

                  <img
                    src={project.image}
                    alt={project.projectName}
                  />

                </div>

                {/* ===============================
                    PROJECT CONTENT
                =============================== */}

                <div className="project-content">

                  <span className="project-category">

                    {project.category}

                  </span>

                  <h3>

                    {project.projectName}

                  </h3>

                  <p>

                    {project.description}

                  </p>

                </div>

              </div>

            ))

          ) : (

            <div className="no-projects">

              No Projects Found

            </div>

          )}

        </div>

      </section>

    </div>

  );

};

export default ProjectDetails;