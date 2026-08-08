import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Company/Company.css";
import { ArrowRight, Building2 } from "lucide-react";

const API_URL =
  "https://a9vqiga5na.execute-api.ap-south-1.amazonaws.com/prod/companies";

const Companies = () => {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to load companies");
      const data = await response.json();
      setCompanies(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading companies:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rk-cos-section">

      <div className="rk-cos-container">
        <span className="rk-cos-subtitle">OUR COMPANIES</span>
        <h2>A Diverse Portfolio. A Unified Vision.</h2>
        <p>
          Eleven powerful companies working together
          to build a better tomorrow.
        </p>
      </div>

      <div className="rk-cos-grid-wrapper">

        {loading ? (
          <div className="rk-cos-empty">
            <h3>Loading...</h3>
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
            {companies.map((company) => (
              <div
                className="rk-cos-card"
                key={company.id}
                style={{ backgroundImage: `url(${company.image})` }}
              >
                <div className="rk-cos-card-overlay" />

                <div className="rk-cos-card-bottom">
                  <div className="rk-cos-icon">
                    <Building2 size={18} />
                  </div>

                  <div className="rk-cos-text">
                    <h3>{company.companyName}</h3>
                    <p>{company.companyDescription}</p>
                  </div>

                  <button
                    className="rk-cos-arrow"
                    onClick={() => navigate("/companies")}
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