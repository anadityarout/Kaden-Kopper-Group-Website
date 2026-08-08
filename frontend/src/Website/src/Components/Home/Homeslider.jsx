import React, { useEffect, useRef, useState } from "react";
import "./Homeslider.css";
import { FaPause, FaPlay } from "react-icons/fa";

/* ==========================================
   API
========================================== */

const API_URL =
  "https://a9vqiga5na.execute-api.ap-south-1.amazonaws.com/prod/homeslider";

const SLIDE_DURATION = 10000; // ms

const HomeSlider = ({ setIsVideo }) => {
  /* ==========================================
      STATES
  ========================================== */

  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [hoverPosition, setHoverPosition] = useState(0);
  const [direction, setDirection] = useState("next"); // "next" = left-to-right, "prev" = right-to-left

  const intervalRef = useRef(null);

  // Tracks whether the user manually paused via the play/pause button,
  // so touch-scrubbing doesn't accidentally resume autoplay afterwards.
  const wasManuallyPausedRef = useRef(false);

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
    if (slides.length <= 1 || isPaused) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setDirection("next");
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, SLIDE_DURATION);

    return () => clearInterval(intervalRef.current);
  }, [slides, isPaused, current]);

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
      NAVIGATION
  ========================================== */

  const goToSlide = (index) => {
    if (index === current) return;
    setDirection(index > current ? "next" : "prev");
    setCurrent(index);
  };

  const togglePause = () => {
    setIsPaused((prev) => {
      const next = !prev;
      wasManuallyPausedRef.current = next;
      return next;
    });
  };

  /* ==========================================
      SCRUB PREVIEW (mouse-follow on progress track)
  ========================================== */

  const handleTrackMouseMove = (e) => {
    if (slides.length === 0) return;

    const track = e.currentTarget;
    const rect = track.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const percent = Math.min(
      Math.max((relativeX / rect.width) * 100, 0),
      100
    );

    const index = Math.min(
      Math.floor((relativeX / rect.width) * slides.length),
      slides.length - 1
    );

    setHoverPosition(percent);
    setHoverIndex(index);
  };

  const handleTrackMouseLeave = () => {
    setHoverIndex(null);
  };

  /* ==========================================
      SCRUB PREVIEW (touch-follow on progress track)
  ========================================== */

  const handleTrackTouchMove = (e) => {
    if (slides.length === 0) return;

    const track = e.currentTarget;
    const rect = track.getBoundingClientRect();
    const touch = e.touches[0];
    if (!touch) return;

    const relativeX = touch.clientX - rect.left;
    const percent = Math.min(
      Math.max((relativeX / rect.width) * 100, 0),
      100
    );

    const index = Math.min(
      Math.floor((relativeX / rect.width) * slides.length),
      slides.length - 1
    );

    setHoverPosition(percent);
    setHoverIndex(index);

    // Actually switch the main slide as the finger moves across the bar.
    if (index !== current) {
      setDirection(index > current ? "next" : "prev");
      setCurrent(index);
    }

    // Pause autoplay while the user is actively scrubbing so the main
    // slide doesn't change underneath their finger.
    if (!isPaused) {
      setIsPaused(true);
    }
  };

  const handleTrackTouchEnd = () => {
    setHoverIndex(null);

    // Only resume autoplay if the user didn't manually pause it earlier.
    if (!wasManuallyPausedRef.current) {
      setIsPaused(false);
    }
  };

  /* ==========================================
      CURRENT SLIDE
  ========================================== */

  const activeSlide = slides[current];

  return (
    <section
      className={`home-slider ${
        activeSlide?.type === "video" ? "video-slider" : "image-slider"
      }`}
    >
      {slides.length > 0 ? (
        <>
          <div
            key={current}
            className={`slide active ${
              direction === "prev" ? "slide-in-prev" : "slide-in-next"
            }`}
          >
            {/* ========================== IMAGE / VIDEO ========================== */}

            {activeSlide?.type === "image" ? (
              <img
                src={activeSlide.image}
                alt={activeSlide.name || "Slide"}
                className="slider-image"
              />
            ) : (
              <video
                className="slider-video"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={activeSlide?.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}

            {/* ========================== OVERLAY + CONTENT ========================== */}

            <div className="slider-overlay">
              <div className="slider-content">
                {activeSlide?.tag && (
                  <span className="slide-tag">{activeSlide.tag}</span>
                )}

                <h1>{activeSlide?.name}</h1>

                {activeSlide?.description && (
                  <p>{activeSlide.description}</p>
                )}

                {activeSlide?.link && (
                  <a href={activeSlide.link} className="slide-cta">
                    {activeSlide.ctaText || "Read story"}
                    <span className="cta-arrow">&#8594;</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* ========================== PROGRESS BAR ========================== */}

          <div className="slider-progress">
            <button
              className="pause-btn"
              onClick={togglePause}
              aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
            >
              {isPaused ? <FaPlay /> : <FaPause />}
            </button>

            <span className="slide-counter">
              {current + 1} / {slides.length}
            </span>

            <div
              className="progress-track"
              onMouseMove={handleTrackMouseMove}
              onMouseLeave={handleTrackMouseLeave}
              onTouchStart={handleTrackTouchMove}
              onTouchMove={handleTrackTouchMove}
              onTouchEnd={handleTrackTouchEnd}
            >
              {slides.map((_, index) => (
                <button
                  key={index}
                  className="progress-segment"
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  {index === current ? (
                    <span
                      key={`fill-${current}-${isPaused}`}
                      className="progress-fill animate"
                      style={{
                        animationDuration: `${SLIDE_DURATION}ms`,
                        animationPlayState: isPaused ? "paused" : "running",
                      }}
                    />
                  ) : (
                    <span
                      className={`progress-fill ${
                        index < current ? "filled" : ""
                      }`}
                    />
                  )}
                </button>
              ))}

              {/* ===== PREVIEW CARD THAT FOLLOWS THE MOUSE / TOUCH ===== */}
              {hoverIndex !== null && slides[hoverIndex] && (
                <div
                  className="segment-preview"
                  style={{ left: `${hoverPosition}%` }}
                >
                  <img
                    src={
                      slides[hoverIndex]?.image ||
                      slides[hoverIndex]?.thumbnail
                    }
                    alt={slides[hoverIndex]?.name || "Preview"}
                    className="segment-preview-img"
                  />
                  <span className="segment-preview-title">
                    {slides[hoverIndex]?.name}
                  </span>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="empty-slider">
          <p>
            Home Slider
            <br />
            Upload images or videos from the Admin Dashboard.
          </p>
        </div>
      )}
    </section>
  );
};

export default HomeSlider;
