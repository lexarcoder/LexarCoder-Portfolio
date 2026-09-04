import { useEffect, useRef, useState, useCallback } from "react";

import gsap from "gsap";

const ProjectCard = ({ project, isVisible }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slidesRef = useRef([]);
  const intervalRef = useRef(null);
  const detailsRef = useRef(null);

  const total = project.images.length;

  // Change slide
  const goToSlide = useCallback(
    (nextSlide) => {
      const currentSlide = activeSlide;

      if (nextSlide === currentSlide) return;

      const currentElement = slidesRef.current[currentSlide];
      const nextElement = slidesRef.current[nextSlide];

      if (!currentElement || !nextElement) return;

      gsap.to(currentElement, {
        opacity: 0,
        scale: 0.97,
        duration: 0.55,
        ease: "power2.inOut",
      });

      gsap.set(nextElement, {
        opacity: 0,
        scale: 1.06,
      });

      gsap.to(nextElement, {
        opacity: 1,
        scale: 1,
        duration: 0.55,
        ease: "power2.inOut",
      });

      setActiveSlide(nextSlide);
    },
    [activeSlide],
  );

  // Auto slide
  useEffect(() => {
    if (isPaused || !isVisible || total <= 1) return;

    intervalRef.current = setInterval(() => {
      setActiveSlide((currentSlide) => {
        const nextSlide = (currentSlide + 1) % total;

        const currentElement = slidesRef.current[currentSlide];
        const nextElement = slidesRef.current[nextSlide];

        if (currentElement && nextElement) {
          gsap.to(currentElement, {
            opacity: 0,
            scale: 0.97,
            duration: 0.55,
            ease: "power2.inOut",
          });

          gsap.set(nextElement, {
            opacity: 0,
            scale: 1.06,
          });

          gsap.to(nextElement, {
            opacity: 1,
            scale: 1,
            duration: 0.55,
            ease: "power2.inOut",
          });
        }

        return nextSlide;
      });
    }, 3500);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isPaused, isVisible, total]);

  // Reset slider when project changes
  useEffect(() => {
    setActiveSlide(0);

    slidesRef.current.forEach((slide, index) => {
      if (!slide) return;

      gsap.set(slide, {
        opacity: index === 0 ? 1 : 0,
        scale: 1,
      });
    });
  }, [project.id]);

  // Animate technology chips
  useEffect(() => {
    if (!detailsRef.current || !isVisible) return;

    const chips = detailsRef.current.querySelectorAll(".tech-chip");

    gsap.fromTo(
      chips,
      {
        opacity: 0,
        y: 12,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.07,
        duration: 0.4,
        ease: "back.out(1.4)",
        delay: 0.3,
      },
    );
  }, [isVisible, project.id]);

  return (
    <div className="project-card-inner">
      <div className="project-details page" ref={detailsRef}>
        <span className="project-number">
          {String(project.id).padStart(2, "0")} / Project
        </span>

        <h2 className="project-title">{project.title}</h2>

        <div className="section-divider" />

        <p className="project-description">{project.description}</p>

        <div className="tech-stack">
          {project.technologies.map((tech) => (
            <span className="tech-chip page" key={tech}>
              {tech}
            </span>
          ))}
        </div>

        <div className="project-buttons">
          <a
            href={project.liveLink}
            className="btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="btn-icon">↗</span>
            Live Preview
          </a>

          <a
            href={project.githubLink}
            className="btn-secondary btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="btn-icon">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </span>
            Source Code
          </a>
        </div>
      </div>

      <div
        className="project-image-section"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="image-glow" />

        <div className="image-slider">
          {project.images.map((src, index) => (
            <div
              className={`slide${index === activeSlide ? " active" : ""}`}
              key={index}
              ref={(element) => {
                slidesRef.current[index] = element;
              }}
            >
              <img
                src={src}
                alt={`${project.title} screenshot ${index + 1}`}
                loading="lazy"
              />
            </div>
          ))}

          <div className="slider-overlay" />

          <div className="slider-dots">
            {project.images.map((_, index) => (
              <button
                key={index}
                className={`dot${index === activeSlide ? " active" : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="slider-arrows">
            <button
              className="arrow-btn"
              onClick={() => goToSlide((activeSlide - 1 + total) % total)}
              aria-label="Previous image"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              className="arrow-btn"
              onClick={() => goToSlide((activeSlide + 1) % total)}
              aria-label="Next image"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
