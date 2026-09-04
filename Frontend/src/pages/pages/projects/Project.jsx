import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ProjectCard from "./ProjectCard";
import ProjectData from "./../../Data/ProjectData";

import "../../style/Project.scss";

const Project = () => {
  // Get all categories
  const categories = [...new Set(ProjectData.map((item) => item.category))];

  // Active category
  const [active, setActive] = useState(categories[0]);

  // Current project
  const [currentProject, setCurrentProject] = useState(
    ProjectData.find((item) => item.category === categories[0]),
  );

  const [isAnimating, setIsAnimating] = useState(false);

  const sectionRef = useRef(null);
  const projectRef = useRef(null);

  // Section animation
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const header = section.querySelector(".section-header");
        const categories = section.querySelector(".category-nav-wrapper");
        const project = projectRef.current;

        // Only project animation is important.
        // Header and category buttons stay static.
        if (header) {
          gsap.set(header, {
            opacity: 1,
            y: 0,
          });
        }

        if (categories) {
          gsap.set(categories, {
            opacity: 1,
            y: 0,
          });
        }

        if (project) {
          gsap.fromTo(
            project,
            {
              opacity: 0,
              y: 20,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
            },
          );
        }

        observer.disconnect();
      },
      {
        threshold: 0.15,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Change project
  const changeProject = (category) => {
    if (category === active || isAnimating) return;

    const newProject = ProjectData.find((item) => item.category === category);

    if (!newProject || !projectRef.current) return;

    setIsAnimating(true);

    // Animate only project
    gsap.to(projectRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        // Change active category
        setActive(category);

        // Change project
        setCurrentProject(newProject);

        // Show new project
        gsap.fromTo(
          projectRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => {
              setIsAnimating(false);
            },
          },
        );
      },
    });
  };

  return (
    <section
      className="project-section"
      ref={sectionRef}
      aria-label="Project Showcase"
    >
      <div className="project-container">
        <div className="section-header">
          <h1 className="section-title">My Projects</h1>

          <p className="section-subtitle">
            A collection of projects built using modern web technologies.
          </p>
        </div>

        {/* Categories */}
        <div className="category-nav-wrapper">
          <nav className="category-nav page" aria-label="Project categories">
            {categories.map((category) => (
              <button
                key={category}
                className={`cat-btn  ${active === category ? "active" : ""}`}
                onClick={() => changeProject(category)}
                aria-pressed={active === category}
                disabled={isAnimating}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>

        {/* Project */}
        <div className="project-showcase" ref={projectRef}>
          {currentProject && <ProjectCard className="page" project={currentProject} />}
        </div>

        {/* Scroll Hint */}
        <div className="scroll-hint" aria-hidden="true">
          <div className="scroll-line" />
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  );
};

export default Project;
