import React, { useEffect, useState } from "react";
import "./Homeslider.css";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

/* ==========================================
   API
========================================== */

const API_URL =
  "https://a9vqiga5na.execute-api.ap-south-1.amazonaws.com/prod/homeslider";

const HomeSlider = ({ setIsVideo }) => {

  /* ==========================================
      STATES
  ========================================== */

  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);

  /* ==========================================
      LOAD SLIDES
  ========================================== */

  useEffect(() => {
    getSlides();
  }, []);

  const getSlides = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to load slides");
      }

      const data = await response.json();

      setSlides(data);
    } catch (error) {
      console.error("Load Slider Error:", error);
    }
  };

  /* ==========================================
      AUTO SLIDER
  ========================================== */

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [slides]);

  /* ==========================================
      RESET INDEX
  ========================================== */

  useEffect(() => {
    if (current >= slides.length) {
      setCurrent(0);
    }
  }, [slides, current]);

  /* ==========================================
      VIDEO STATUS
  ========================================== */

  useEffect(() => {
    if (!setIsVideo) return;
    if (slides.length === 0) return;

    setIsVideo(slides[current]?.type === "video");
  }, [slides, current, setIsVideo]);

  /* ==========================================
      NEXT
  ========================================== */

  const nextSlide = () => {
    if (slides.length === 0) return;

    setCurrent((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  /* ==========================================
      PREVIOUS
  ========================================== */

  const prevSlide = () => {
    if (slides.length === 0) return;

    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  /* ==========================================
      CURRENT SLIDE
  ========================================== */

  const activeSlide = slides[current];

  return (
    <section
      className={`home-slider ${
        activeSlide?.type === "video"
          ? "video-slider"
          : "image-slider"
      }`}
    >
      {slides.length > 0 ? (
        <>
          <div className="slide active">
                        {/* ==========================
                IMAGE
            ========================== */}

            {activeSlide?.type === "image" ? (
              <img
                src={activeSlide.image}
                alt={activeSlide.name}
                className="slider-image"
              />
            ) : (
              /* ==========================
                  VIDEO
              ========================== */

              <video
                className="slider-video"
                autoPlay
                muted
                loop
                playsInline
              >
                <source
                  src={activeSlide?.video}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            )}

            {/* ==========================
                OVERLAY
            ========================== */}

            <div className="slider-overlay">
              <div className="slider-content">
                <h1>{activeSlide?.name}</h1>

                {activeSlide?.description && (
                  <p>{activeSlide.description}</p>
                )}
              </div>
            </div>

          </div>

          {/* ==========================
              PREVIOUS BUTTON
          ========================== */}

          <button
            className="slider-btn prev"
            onClick={prevSlide}
          >
            &#10094;
          </button>

          {/* ==========================
              NEXT BUTTON
          ========================== */}

          <button
            className="slider-btn next"
            onClick={nextSlide}
          >
            &#10095;
          </button>
        </>
      ) : (
        <div className="empty-slider">
          <p>
            Home Slider
            <br />
            Upload images or videos from the
            Admin Dashboard.
          </p>
        </div>
      )}

      {/* ==========================
          FLOATING CONTACT
      ========================== */}

      <div className="floating-contact">
        <a href="#" className="contact-icon">
          <FaWhatsapp className="contact-svg" />
          <p>WhatsApp</p>
        </a>

        <a href="#" className="contact-icon">
          <FaPhoneAlt className="contact-svg" />
          <p>Call Us</p>
        </a>

        <a href="#" className="contact-icon">
          <FaEnvelope className="contact-svg" />
          <p>Email Us</p>
        </a>
      </div>
    </section>
  );
};

export default HomeSlider;