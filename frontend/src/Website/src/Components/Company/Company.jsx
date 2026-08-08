import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Company/Company.css";
import { ArrowRight, Building2 } from "lucide-react";

const API_URL =
  "https://a9vqiga5na.execute-api.ap-south-1.amazonaws.com/prod/companies";

const Companies = () => {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState(() => {
    try {
      const cached = sessionStorage.getItem("companies");

      if (cached) {
        const parsed = JSON.parse(cached);

        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (error) {
      console.error("Cache read error:", error);
    }

    return [];
  });

  const [loading, setLoading] = useState(() => {
    try {
      return !sessionStorage.getItem("companies");
    } catch {
      return true;
    }
  });

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      const controller = new AbortController();

      const timeout = setTimeout(() => {
        controller.abort();
      }, 10000);

      const response = await fetch(API_URL, {
        method: "GET",
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error("Failed to load companies");
      }

      const data = await response.json();

      const companyData = Array.isArray(data) ? data : [];

      setCompanies(companyData);

      sessionStorage.setItem(
        "companies",
        JSON.stringify(companyData)
      );
    } catch (error) {
      console.error("Error loading companies:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rk-cos-section">

      {/* ==========================================
          SECTION HEADER
      ========================================== */}

      <div className="rk-cos-container">
        <span className="rk-cos-subtitle">
          OUR COMPANIES
        </span>

        <h2>
          A Diverse Portfolio. A Unified Vision.
        </h2>

        <p>
          Eleven powerful companies working together
          to build a better tomorrow.
        </p>
      </div>


      {/* ==========================================
          COMPANY GRID
      ========================================== */}

      <div className="rk-cos-grid-wrapper">

        {loading && companies.length === 0 ? (
          <div className="rk-cos-empty">
            <h3>Loading Companies...</h3>
          </div>
        ) : companies.length === 0 ? (
          <div className="rk-cos-empty">
            <h3>No Companies Added</h3>

            <p>
              Upload Company Logo, Name and Description
              from the Admin Dashboard.
            </p>
          </div>
        ) : (
          <div className="rk-cos-grid">

            {companies.map((company, index) => (
              <div
                className="rk-cos-card"
                key={company.id || index}
              >

                {/* ==========================================
                    COMPANY IMAGE
                ========================================== */}

                <img
                  className="rk-cos-card-image"
                  src={company.image}
                  alt={company.companyName || "Company"}
                  loading="lazy"
                  decoding="async"
                />


                {/* ==========================================
                    DARK OVERLAY
                ========================================== */}

                <div className="rk-cos-card-overlay" />


                {/* ==========================================
                    CARD CONTENT
                ========================================== */}

                <div className="rk-cos-card-bottom">

                  <div className="rk-cos-icon">
                    <Building2 size={18} />
                  </div>


                  <div className="rk-cos-text">

                    <h3>
                      {company.companyName}
                    </h3>

                    <p>
                      {company.companyDescription}
                    </p>

                  </div>


                  <button
                    className="rk-cos-arrow"
                    onClick={() => navigate("/companies")}
                    aria-label={`View ${company.companyName}`}
                  >
                    <ArrowRight size={16} />
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </section>
  );
};

export default Companies;