import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Catagory/Project.css";
import { ArrowRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const API_URL =
  "https://a9vqiga5na.execute-api.ap-south-1.amazonaws.com/prod/catagory";

const Project = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const projectHeader = {
    subtitle: "FEATURED PROJECTS",
    title: "Crafting Landmarks Across India",
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to load projects");
      }

      const data = await response.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="project-section">
      <div className="project-container">
        <div className="project-left">
          <span className="project-subtitle">
            {projectHeader.subtitle}
          </span>

          <h2 className="project-title">
            {projectHeader.title}
          </h2>
        </div>

        <div className="project-right">
          <button
  className="project-btn"
  onClick={() => navigate("/projects")}
>
  <span>View All Projects</span>
  <ArrowRight size={18} />
</button>
        </div>
      </div>

      <div className="project-gallery">

        {loading ? (

          <div className="empty-project">
            <h3>Loading Projects...</h3>
          </div>

        ) : projects.length === 0 ? (

          <div className="empty-project">
            <h3>No Projects Available</h3>
          </div>

        ) : (

          <>
            <div className="project-prev"></div>
            <div className="project-next"></div>

            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{
                prevEl: ".project-prev",
                nextEl: ".project-next",
              }}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              speed={800}
              loop={true}
              spaceBetween={24}
              slidesPerView={4}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 16,
                },
                576: {
                  slidesPerView: 2,
                  spaceBetween: 18,
                },
                992: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1400: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
              }}
              className="project-swiper"
            >
              {projects.map((project) => (
                <SwiperSlide key={project.id}>
                  <div className="project-card">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="project-image"
                    />

                    <div className="project-info">
                      <h3>{project.name}</h3>
                      <p>{project.location}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}

      </div>
    </section>
  );
};

export default Project;