import React, { useEffect, useState } from "react";
import { FaEye, FaBullseye } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import {
  FaLightbulb,
  FaAward,
  FaShieldAlt,
  FaLeaf,
  FaUsers,
  FaHandshake,
  FaBuilding,
  FaBriefcase,
  FaCalendarAlt,
} from "react-icons/fa";

import "./About.css";

/* ==========================================
   API
========================================== */

const API_URL =
  "https://a9vqiga5na.execute-api.ap-south-1.amazonaws.com/prod/about";

const About = () => {

  /* ==========================================
      STATES
  ========================================== */

  const [aboutImages, setAboutImages] = useState({
    aboutSlide: "",
    whoWeAre: "",
    ourValues: "",
    ourApproach: "",
    whatDrivesUs: "",
  });

  const [aboutData, setAboutData] = useState({
    subtitle: "ABOUT US",
    title1: "One Group.",
    title2: "Many Strengths.",
    title3: "Limitless Possibilities.",
    description:
      "We are a diversified group with a shared purpose — to build, grow and transform ideas into meaningful experiences that create lasting impact.",
    button: "Our Story",
  });

  const [counts, setCounts] = useState({
    companies: 0,
    industries: 0,
    projects: 0,
    years: 0,
    experts: 0,
  });

  const { ref: statsRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  /* ==========================================
      LOAD ABOUT IMAGES FROM AWS
  ========================================== */

  useEffect(() => {

    const loadAbout = async () => {

      try {

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to load About Images");
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {

          setAboutImages({
            aboutSlide: data[0].aboutSlide || "",
            whoWeAre: data[0].whoWeAre || "",
            ourValues: data[0].ourValues || "",
            ourApproach: data[0].ourApproach || "",
            whatDrivesUs: data[0].whatDrivesUs || "",
          });

        }

      } catch (err) {

        console.error(err);

      }

    };

    loadAbout();

  }, []);

  /* ==========================================
      COUNTER
  ========================================== */

  useEffect(() => {

    if (!inView) return;

    let companies = 0;
    let industries = 0;
    let projects = 0;
    let years = 0;
    let experts = 0;

    const timer = setInterval(() => {

      companies = companies < 11 ? companies + 1 : 11;
      industries = industries < 6 ? industries + 1 : 6;
      projects = projects < 100 ? projects + 2 : 100;
      years = years < 10 ? years + 1 : 10;
      experts = experts < 500 ? experts + 10 : 500;

      setCounts({
        companies,
        industries,
        projects,
        years,
        experts,
      });

      if (
        companies === 11 &&
        industries === 6 &&
        projects === 100 &&
        years === 10 &&
        experts === 500
      ) {
        clearInterval(timer);
      }

    }, 100);

    return () => clearInterval(timer);

  }, [inView]);

  return (
    <>

      {/* ==========================================
          ABOUT BANNER
      ========================================== */}

      <section className="about-section">

        <img
          className="about-image"
          src={aboutImages.aboutSlide}
          alt="About"
        />

      </section>
            {/* ==========================================
          WHO WE ARE
      ========================================== */}

      <section className="who-we-are">

        {/* Left */}

        <div className="who-left">

          <span className="who-subtitle">
            WHO WE ARE
          </span>

          <h2 className="who-title">
            <span>Building Excellence.</span>
            <span>Creating Impact.</span>
          </h2>

          <div className="gold-line"></div>

          <p>
            Driven by innovation, integrity and a commitment to quality,
            we deliver exceptional solutions that shape industries and
            enrich lives.
          </p>

          <p>
            Our strength lies in our people, our values and our
            relentless pursuit of excellence.
          </p>

        </div>

        {/* Center */}

        <div className="whoimage">

          <img
            src={aboutImages.whoWeAre}
            alt="Who We Are"
          />

        </div>

        {/* Right */}

        <div className="who-right">

          <div className="vision-box">

            <div className="vision-icon">
              <FaEye />
            </div>

            <div>

              <h3>OUR VISION</h3>

              <p>
                To be a trusted leader, known for excellence,
                innovation and creating sustainable value for a
                better future.
              </p>

            </div>

          </div>

          <div className="divider"></div>

          <div className="vision-box">

            <div className="vision-icon">
              🎯
            </div>

            <div>

              <h3>OUR MISSION</h3>

              <p>
                To deliver exceptional solutions through innovation,
                quality and integrity, creating long-term value for
                our stakeholders.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ==========================================
          OUR VALUES
      ========================================== */}

      <section className="our-values">

        <div className="values-heading">

          <span>OUR VALUES</span>

          <div className="values-line"></div>

        </div>

        <div className="values-grid">

          <div className="value-card">

            <div className="value-icon">
              <FaLightbulb />
            </div>

            <h3>Innovation</h3>

            <p>
              We embrace new ideas and technologies to lead the future.
            </p>

          </div>

          <div className="value-card">

            <div className="value-icon">
              <FaAward />
            </div>

            <h3>Quality</h3>

            <p>
              We deliver excellence in every project and solution we provide.
            </p>

          </div>

          <div className="value-card">

            <div className="value-icon">
              <FaShieldAlt />
            </div>

            <h3>Integrity</h3>

            <p>
              We believe in honesty, transparency and ethical practices.
            </p>

          </div>

          <div className="value-card">

            <div className="value-icon">
              <FaLeaf />
            </div>

            <h3>Sustainability</h3>

            <p>
              We are committed to building a greener and better tomorrow.
            </p>

          </div>

          <div className="value-card last-card">

            <div className="value-icon">
              <FaUsers />
            </div>

            <h3>Teamwork</h3>

            <p>
              We achieve more together through trust, respect and collaboration.
            </p>

          </div>

        </div>

      </section>

      {/* ==========================================
          COMPANY STATS
      ========================================== */}

      <section
        ref={statsRef}
        className="company-stats"
      >

        <div className="stats-container">

          <div className="stat-box">

            <FaBuilding
              className="stat-icon"
              style={{ color: "#b8863b" }}
            />

            <h2>{counts.companies}+</h2>

            <p>Companies</p>

          </div>

          <div className="stat-box">

            <FaUsers
              className="stat-icon"
              style={{ color: "#b8863b" }}
            />

            <h2>{counts.industries}+</h2>

            <p>Industries</p>

          </div>

          <div className="stat-box">

            <FaBriefcase
              className="stat-icon"
              style={{ color: "#b8863b" }}
            />

            <h2>{counts.projects}+</h2>

            <p>Major Projects</p>

          </div>

          <div className="stat-box">

            <FaCalendarAlt
              className="stat-icon"
              style={{ color: "#b8863b" }}
            />

            <h2>{counts.years}+</h2>

            <p>Years of Excellence</p>

          </div>

          <div className="stat-box">

            <FaUsers
              className="stat-icon"
              style={{ color: "#b8863b" }}
            />

            <h2>{counts.experts}+</h2>

            <p>Experts</p>

          </div>

        </div>

      </section>
            {/* ==========================================
          OUR APPROACH
      ========================================== */}

      <section className="approach-section">

        <div className="approach-image">

          <img
            src={aboutImages.ourApproach}
            alt="Our Approach"
          />

        </div>

        <div className="approach-content">

          <span className="approach-subtitle">
            OUR APPROACH
          </span>

          <h2 className="approach-title">
            Thoughtful. Strategic. Future-Ready.
          </h2>

          <p className="approach-description">
            We follow a people-first approach backed by strong governance,
            modern technology and deep domain expertise to deliver
            results that go beyond expectations.
          </p>

          <div className="approach-grid">

            <div className="approach-item">
              <FaUsers className="approach-icon" />
              <h4>Deep Expertise</h4>
            </div>

            <div className="approach-item">
              <FaBullseye className="approach-icon" />
              <h4>Customer Centric</h4>
            </div>

            <div className="approach-item">
              <FaLightbulb className="approach-icon" />
              <h4>Innovative Solutions</h4>
            </div>

            <div className="approach-item">
              <FaLeaf className="approach-icon" />
              <h4>Sustainable Growth</h4>
            </div>

          </div>

        </div>

      </section>

      {/* ==========================================
          WHAT DRIVES US
      ========================================== */}

      <section className="drives-section">

        {/* LEFT CONTENT */}

        <div className="drives-content">

          <div className="drives-heading">

            <span className="drive-line"></span>

            <h2>WHAT DRIVES US</h2>

            <span className="drive-line"></span>

          </div>

          <div className="drives-grid">

            <div className="drive-card">

              <FaHandshake className="drive-icon" />

              <h3>Commitment</h3>

              <p>
                We are committed to our promises and
                deliver what we commit.
              </p>

            </div>

            <div className="drive-card">

              <FaShieldAlt className="drive-icon" />

              <h3>Responsibility</h3>

              <p>
                We take responsibility in everything
                we do for our people and projects.
              </p>

            </div>

            <div className="drive-card">

              <FaAward className="drive-icon" />

              <h3>Excellence</h3>

              <p>
                We continuously strive to exceed
                expectations through quality.
              </p>

            </div>

            <div className="drive-card">

              <FaUsers className="drive-icon" />

              <h3>Impact</h3>

              <p>
                We create meaningful impact that
                transforms communities.
              </p>

            </div>

          </div>

        </div>

        {/* RIGHT IMAGE */}

        <div className="drives-image">

          <img
            src={aboutImages.whatDrivesUs}
            alt="What Drives Us"
          />

        </div>

      </section>

    </>
  );

};

export default About;