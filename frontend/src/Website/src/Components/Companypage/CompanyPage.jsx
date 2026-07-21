import React, { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaBuilding,
  FaCheckCircle,
} from "react-icons/fa";

import "./CompanyPage.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const API_URL =
  "https://a9vqiga5na.execute-api.ap-south-1.amazonaws.com/prod/company-page";

const CompanyPage = () => {

  /* ===========================
      STATES
  =========================== */

  const [companyHeroImage, setCompanyHeroImage] = useState("");

  const [companies, setCompanies] = useState([]);

  /* ===========================
      LOAD COMPANY DATA
  =========================== */

  useEffect(() => {

    const loadCompanies = async () => {

      try {

        const response = await fetch(API_URL);

        const data = await response.json();

        if (Array.isArray(data)) {

          console.log(data);
setCompanies(data);

          if (data.length > 0) {
            setCompanyHeroImage(data[0].heroImage || "");
          }

        } else {

          setCompanies([]);

        }

      } catch (error) {

        console.error("Failed to load companies:", error);

      }

    };

    loadCompanies();

  }, []);
    return (

    <div className="company-page">

      {/* ================= HERO ================= */}

      <section className="company-hero">

        <div className="company-right">

          {companyHeroImage && (
            <img
              src={companyHeroImage}
              alt="Company Hero"
            />
          )}

        </div>

      </section>

      {/* ================= COMPANIES ================= */}

      <section className="companies-section">

        <h2>
          Our Group Companies
        </h2>

        <div className="section-line"></div>

        {/* ================= LOGO SLIDER ================= */}

        <div className="company-logo-slider">

          <Swiper
            modules={[Autoplay]}
            slidesPerView={5}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 5,
              },
            }}
          >

            {companies.map((company) => (

              <SwiperSlide key={company.id}>

                

              </SwiperSlide>

            ))}

          </Swiper>

        </div>
                {/* ================= COMPANY CARDS ================= */}

        <div className="companies-grid">

  {companies.map((company) => (

    <div
      className="company-card"
      key={company.id}
    >

      <div className="company-image">

     

      </div>

      <div className="company-icon">

        <img
          src={company.image}
          alt={company.name}
        />

      </div>

      <div className="company-content">

        <h3>{company.name}</h3>

        <p>{company.description}</p>

        {company.link && (

          <a
            href={company.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >

            <button>

              Visit Website

              <FaArrowRight />

            </button>

          </a>

        )}

      </div>

    </div>

  ))}

</div>

        {/* ================= GROUP STATS ================= */}

        <section className="group-stats">

          <div className="group-stats-wrapper">

            {/* LEFT */}

            <div className="stats-left">

              <div className="stats-icon">
                📈
              </div>

              <div className="stats-text">

                <h2>
                  Building a stronger
                  <br />
                  <span>tomorrow together</span>
                </h2>

                <p>
                  Our group continues to grow, innovate and
                  create impact across industries.
                </p>

              </div>

            </div>
                        {/* RIGHT */}

            <div className="stats-right">

              <div className="stat-box">

                <div className="stat-icon">
                  <FaBuilding />
                </div>

                <h3>5+</h3>

                <h4>Companies</h4>

                <p>
                  Across diverse industries
                </p>

              </div>

              <div className="stat-box">

                <div className="stat-icon">
                  👥
                </div>

                <h3>500+</h3>

                <h4>Professionals</h4>

                <p>
                  Skilled and dedicated team
                </p>

              </div>

              <div className="stat-box">

                <div className="stat-icon">
                  🗂️
                </div>

                <h3>100+</h3>

                <h4>Projects Completed</h4>

                <p>
                  Successfully delivered
                </p>

              </div>

              <div className="stat-box">

                <div className="stat-icon">
                  🌍
                </div>

                <h3>10+</h3>

                <h4>Years of Excellence</h4>

                <p>
                  Growing with trust
                </p>

              </div>

            </div>

          </div>

        </section>

      </section>

    </div>

  );

};

export default CompanyPage;