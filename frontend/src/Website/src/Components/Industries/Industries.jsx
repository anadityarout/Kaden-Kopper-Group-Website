import React, { useEffect, useState } from "react";
import "./Industries.css";

const API_URL =
  "https://a9vqiga5na.execute-api.ap-south-1.amazonaws.com/prod/industry";

const Industries = () => {
  const [industryBanner, setIndustryBanner] = useState("");
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIndustries();
  }, []);

  const loadIndustries = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch industries");
      }

      const data = await response.json();

      const list = Array.isArray(data) ? data : [];

      setIndustries(list);

      const banner = list.find(
  (item) =>
    item.industrySlide &&
    item.industrySlide.trim() !== ""
);

setIndustryBanner(
  banner ? banner.industrySlide : ""
);
    } catch (error) {
      console.error("Industry Error:", error);
      setIndustries([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
          {/* ==========================================
          Hero Section
      ========================================== */}

      <section className="industry-hero">

        <div className="industry-right">

          <img
            src={
              industryBanner ||
              "/images/defaultIndustry.jpg"
            }
            alt="Industries"
          />

        </div>

      </section>

      {/* ==========================================
          Industries Section
      ========================================== */}

      <section className="industries-section">

        <div className="industries-heading">

          <span>OUR INDUSTRIES</span>

          <h2>Industries We Operate In</h2>

        </div>

        {loading ? (

          <div className="industry-empty">

            <h3>Loading...</h3>

          </div>

        ) : (

          <div className="industries-grid">

            {industries.length > 0 ? (

              industries
  .filter(
    (item) =>
      item.operateImage &&
      item.operateImage.trim() !== ""
  )
  .map((item, index) => (

                <div
                  className="industry-card"
                  key={item.id || index}
                >

                  <div className="industry-card-image">

                    <img
  src={item.operateImage}
  alt={item.projectName}
/>

                  </div>

                  <div className="industry-card-content">

                    <div className="industry-number">

                      {(index + 1)
                        .toString()
                        .padStart(2, "0")}

                    </div>

                    <h3>

                      {item.projectName}

                    </h3>

                    <p>

                      {item.description}

                    </p>

                    <button
                      className="industry-explore"
                    >

                      Explore

                      <span>→</span>

                    </button>

                  </div>

                </div>

              ))

            ) : (

              <div className="industry-empty">

                <h3>

                  No Industries Added Yet

                </h3>

                <p>

                  Industries uploaded from the
                  Admin Dashboard will
                  automatically appear here.

                </p>

              </div>

            )}

          </div>

        )}

      </section>
            {/* ============================
          OUR COMMITMENT
      ============================= */}

      <section className="commitment-section">

        <div className="commitment-card">

          {/* Left Side */}

          <div className="commitment-left">

            <span className="commitment-subtitle">
              Our Commitment
            </span>

            <h2>
              Building a better future
              <br />
              across every industry
              <br />
              we serve.
            </h2>

            <div className="commitment-line"></div>

          </div>

          {/* Right Side */}

          <div className="commitment-right">

            <div className="commitment-item">

              <div className="commitment-icon">
                ⭐
              </div>

              <h3>Excellence</h3>

              <p>
                Delivering the highest standards of
                quality in every project we undertake.
              </p>

            </div>

            <div className="commitment-item">

              <div className="commitment-icon">
                💡
              </div>

              <h3>Innovation</h3>

              <p>
                Embracing new ideas and technologies
                to create smarter solutions.
              </p>

            </div>

            <div className="commitment-item">

              <div className="commitment-icon">
                🌿
              </div>

              <h3>Sustainability</h3>

              <p>
                Committed to sustainable practices
                that benefit both people and the planet.
              </p>

            </div>

          </div>

        </div>

      </section>
            {/* =====================================
          CALL TO ACTION
      ===================================== */}

      <section className="industry-cta">

        <div className="industry-cta-card">

          <div className="industry-cta-left">

            <h2>Have a project in mind?</h2>

            <p>
              Let's build something extraordinary together.
            </p>

          </div>

          <div className="industry-cta-right">

            <button className="cta-primary-btn">

              Start a Project

              <span>→</span>

            </button>

            <button className="cta-secondary-btn">

              Contact Us

              <span>→</span>

            </button>

          </div>

        </div>

      </section>

    </>
  );
};

export default Industries;