import React, { useState } from "react";
import { skillData } from "../Data/SkillData";
import "../style/Skill.scss";

// Simple helper component to map category icons based on string names
const CategoryIcon = ({ type }) => {
  switch (type) {
    case "code":
      return (
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      );
    case "monitor":
      return (
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      );
    case "database-stack":
    case "database":
      return (
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
          <path d="M3 5V19A9 3 0 0 0 21 19V5"></path>
          <path d="M3 12A9 3 0 0 0 21 12"></path>
        </svg>
      );
    case "wrench":
      return (
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
        </svg>
      );
    default:
      return (
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="9" y1="9" x2="15" y2="9"></line>
          <line x1="9" y1="13" x2="15" y2="13"></line>
          <line x1="9" y1="17" x2="15" y2="17"></line>
        </svg>
      );
  }
};

const Skill = () => {
  // Defaulting to the 'Frontend' category tab (index 1) to perfectly align with your example image
  const [activeTab, setActiveTab] = useState(1);
  const currentData = skillData[activeTab];

  return (
    <section className="skills-section ">
      <div className="skills-container">
        {/* Top Tag & Main Header */}
        <header className="skills-header ">
          <div className="skills-header__badge-top ">
            <span className="dot">✦</span> MY SKILLS
            <span className="dot">✦</span>
          </div>
          <p className="skills-header__subtitle">
            A comprehensive overview of my technical stack, tools, and areas of
            expertise. Continuous growth driven by modern web solutions.
          </p>
        </header>

        {/* Tab Row Navigation Controllers */}
        <div className="skills-tabs-container">
          <div className="skills-tabs-scroll">
            {skillData.map((item, index) => (
              <button
                key={item.id}
                className={`skills-tab-btn  ${activeTab === index ? "skills-tab-btn--active" : ""}`}
                onClick={() => setActiveTab(index)}
              >
                <span className="skills-tab-btn__icon">
                  <CategoryIcon type={item.icon} />
                </span>
                <span className="skills-tab-btn__name">{item.category}</span>
                <span className="skills-tab-btn__count">
                  {item.skills.length}
                </span>

                {/* Visual arrow pointer below active item */}
                {activeTab === index && (
                  <div className="skills-tab-btn__indicator-arrow" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Display Showcase Panel Block */}
        <div className="skills-display-panel page  ">
          {/* Subtle glowing vector illustration element mapped on right side of image */}
          <div className="skills-display-panel__graphic ">
            <div className="mock-window ">
              <div className="mock-window__dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="mock-window__code">&lt;/&gt;</div>
            </div>
            <div className="mock-window__orb"></div>
          </div>

          <div className="skills-display-panel__header">
            <div className="skills-display-panel__icon-badge">
              <CategoryIcon type={currentData.icon} />
            </div>
            <div className="skills-display-panel__info ">
              <h2>{currentData.category}</h2>
              <span>{currentData.skills.length} Skills</span>
            </div>
          </div>

          {/* 2 Column Inner Responsive Layout Grid */}
          <div className="skills-grid ">
            {currentData.skills.map((skill, index) => (
              <div key={index} className="skill-card ">
                <div className="skill-card__left">
                  <div className="skill-card__logo-wrapper  ">
                    <img
                      src={skill.logo}
                      alt={skill.name}
                      className="skill-card__logo"
                    />
                  </div>
                  <span className="skill-card__name">{skill.name}</span>
                </div>
                <a
                  href={skill.docLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="skill-card__doc-btn"
                >
                  Doc
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skill;
