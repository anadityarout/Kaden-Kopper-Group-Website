import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Company/Company.css";
import { ArrowRight } from "lucide-react";

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

      if (!response.ok) {
        throw new Error("Failed to load companies");
      }

      const data = await response.json();

      setCompanies(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading companies:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="companies-section">

      {/* Header */}

      <div className="companies-container">

        <div className="companies-left">

          <span className="companies-subtitle">
            OUR COMPANIES
          </span>

          <h2>
            Strong Brands.
            <br />
            Shared Vision.
          </h2>

        </div>

        <div className="companies-right">

          <p>
            Eleven powerful companies working together
            to build a better tomorrow.
          </p>

          <button
            className="companies-btn"
            onClick={() => navigate("/companies")}
          >
            View All Companies
            <ArrowRight size={18} />
          </button>

        </div>

      </div>

      {/* Companies */}

      <div className="company-slider">

        {loading ? (

          <div className="empty-company">
            <h3>Loading...</h3>
          </div>

        ) : companies.length === 0 ? (

          <div className="empty-company">

            <h3>No Companies Added</h3>

            <p>
              Upload Company Logo, Name and Description
              from the Admin Dashboard.
            </p>

          </div>

        ) : (

          <div className="company-track">

            {companies.map((company) => (

              <div
                className="company-card"
                key={company.id}
              >

                <div className="company-logo">

                  <img
                    src={company.image}
                    alt={company.companyName}
                    loading="lazy"
                  />

                </div>

                <div className="company-content">

                  <h3>
                    {company.companyName}
                  </h3>

                  <p>
                    {company.companyDescription}
                  </p>

                </div>

                <button className="company-arrow">
                  <ArrowRight size={20} />
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>
  );
};

export default Companies;