import React, { useEffect, useRef, useState } from "react";
import "./Career.css";
const API_URL =
  "https://a9vqiga5na.execute-api.ap-south-1.amazonaws.com/prod/career";
  import {
  FaUsers,
  FaHeartbeat,
  FaGift,
  FaBalanceScale,
  FaMapMarkerAlt,
  FaCode,
  FaServer,
  FaPencilAlt,
  FaBriefcase
} from "react-icons/fa";
import logo from "../../assets/logo.png";
import logo1 from "../../assets/logo1.png";
import logo2 from "../../assets/logo2.png";
import logo3 from "../../assets/logo3.png";
import logo4 from "../../assets/logo4.png";
import logo5 from "../../assets/logo5.png";
import logo6 from "../../assets/logo6.png";
import logo7 from "../../assets/logo7.png";
import logo8 from "../../assets/logo8.png";
import { MdTrendingUp } from "react-icons/md";

const Career = () => {

  // Hero data (later from Admin Dashboard)


  // Company list (later from API/Admin Dashboard)
  const [companies] = useState([
  {
    id: 1,
    logo: logo,
    companyName: "Kaden",
    description: "Kaden Koppers"
  },
  {
    id: 2,
    logo: logo1,
    companyName: "Alumenza",
    description: "India Pvt. Ltd."
  },
  {
    id: 3,
    logo: logo2,
    companyName: "Alumilite",
    description: "Facades India Pvt. Ltd."
  },
  {
    id: 4,
    logo: logo3,
    companyName: "Alu-Win",
    description: "India Pvt. Ltd."
  },
  {
    id: 5,
    logo: logo4,
    companyName: "Alu-Lite",
    description: "India Pvt. Ltd."
  },
  {
    id: 6,
    logo: logo5,
    companyName: "Aluform",
    description: "India Pvt. Ltd."
  },
  {
    id: 7,
    logo: logo6,
    companyName: "Company 7",
    description: "India Pvt. Ltd."
  },
  {
    id: 8,
    logo: logo7,
    companyName: "Company 8",
    description: "India Pvt. Ltd."
  },
  {
    id: 9,
    logo: logo8,
    companyName: "Company 9",
    description: "India Pvt. Ltd."
  }
]);

const [careerImage, setCareerImage] = useState("");

const [jobs, setJobs] = useState([]);
  
   const sliderRef = useRef(null);

   useEffect(() => {

  loadCareer();

}, []);

const loadCareer = async () => {

  try {

    const res = await fetch(API_URL);

    const data = await res.json();

    if (data.banners && data.banners.length > 0) {

      setCareerImage(data.banners[0].image);

    }

    setJobs(data.jobs || []);

  } catch (err) {

    console.log(err);

  }

};

  const scrollLeft = () => {
  sliderRef.current.scrollBy({
    left: -250,
    behavior: "smooth"
  });
};

const scrollRight = () => {
  sliderRef.current.scrollBy({
    left: 250,
    behavior: "smooth"
  });
};
  return (
    <div className="career-page">

      {/* ================= HERO ================= */}

  <section className="career-hero">
    <img
        src={careerImage}
        alt="Career"
        className="career-hero-image"
    />
</section>

       {/* ================= OUR COMPANIES ================= */}

<section className="career-company-section">

    <h2 className="company-title">
        Our Companies
    </h2>

    <div className="company-slider">

        <button
    className="company-arrow left"
    onClick={scrollLeft}
>
    &#10094;
</button>

        <div
    className="company-wrapper"
    ref={sliderRef}
>

            {companies.map((company) => (

                <div
    className="company-card"
    key={company.id}
>

    <img
        src={company.logo}
        alt={company.companyName}
        className="company-logo"
    />

    <h4>{company.companyName}</h4>

    <p>{company.description}</p>

</div>

            ))}

        </div>

          <button
    className="company-arrow right"
    onClick={scrollRight}
>
    &#10095;
</button>

    </div>

</section>
  
   {/* ================= OPEN POSITIONS ================= */}

<section className="career-jobs-section">

    <div className="career-jobs-container">

        {/* Left */}

        <div className="career-jobs-left">

            <h2>Open Positions</h2>

            <div className="career-heading-line"></div>

           
          {jobs.length === 0 ? (

    <p>No Job Openings Available</p>

) : (

    jobs.map((job) => (

        <div
            className="job-card"
            key={job.id}
        >

            <div className="job-details">

                <div className="job-icon">

                    <FaBriefcase />

                </div>

                <div className="job-content">

                    <h3>{job.jobName}</h3>

                    <p>{job.jobDescription}</p>

                    <div className="job-meta">

                        <span>

                            <FaMapMarkerAlt />

                            {job.jobLocation}

                        </span>

                        <span>

                            <FaBriefcase />

                            {job.jobType}

                        </span>

                    </div>

                </div>

            </div>

            <button className="apply-btn">

                Apply Now

            </button>

        </div>

    ))

)}


            <button className="view-all-btn">

                View All Openings →

            </button>

        </div>

        {/* Right */}

        <div className="career-why-right">

            <h2>Why Join Us?</h2>

            <div className="career-heading-line"></div>

           <div className="benefits-grid">

     <div className="benefit-item">

    <FaUsers className="benefit-icon" />

    <div className="benefit-content">

        <h4>Great Team</h4>

        <p>Work with amazing people</p>

    </div>

</div>

    <div className="benefit-item">

        <MdTrendingUp className="benefit-icon" />

        <div>

            <h4>Growth Opportunities</h4>

            <p>
                Learn, grow and advance your career
            </p>

        </div>

    </div>

    <div className="benefit-item">

        <FaBalanceScale className="benefit-icon" />

        <div>

            <h4>Work-Life Balance</h4>

            <p>
                Flexible policies for a better life
            </p>

        </div>

    </div>

    <div className="benefit-item">

        <FaHeartbeat className="benefit-icon" />

        <div>

            <h4>Health & Wellness</h4>

            <p>
                We care for your well-being
            </p>

        </div>

    </div>

    <div className="benefit-item">

        <FaGift className="benefit-icon" />

        <div>

            <h4>Perks & Benefits</h4>

            <p>
                Exciting perks and company benefits
            </p>

        </div>

    </div>

    <div className="benefit-item">

        <FaMapMarkerAlt className="benefit-icon" />

        <div>

            <h4>Multiple Locations</h4>

            <p>
                Opportunities across different cities
            </p>

        </div>

    </div>

</div>

        </div>

    </div>

</section>
    </div>
  );
};

export default Career;