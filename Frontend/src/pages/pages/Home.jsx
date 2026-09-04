import React, { lazy, Suspense, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { Download, Sparkles, Code2, Braces, X } from "lucide-react";
import "../style/Home.scss";
import { useNavigate } from "react-router-dom";

const SocialLinks = lazy(() => import("../../layout/components/SocialLinks"));
const Banner = lazy(() => import("../../layout/components/Banner"));

const Project = lazy(() =>
  import("./PageExport").then((m) => ({ default: m.Project })),
);

const Skill = lazy(() =>
  import("./PageExport").then((m) => ({ default: m.Skill })),
);

const Contact = lazy(() =>
  import("./PageExport").then((m) => ({ default: m.Contact })),
);

const SimpleAbout = lazy(() =>
  import("./PageExport").then((m) => ({ default: m.SimpleAbout })),
);

const TITLES = ["GENERATIVE AI_", "FULL STACK_", "UI ENGINEER_", "MERN STACK_"];

export default function Home() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [showResume, setShowResume] = useState(false);
const navigate = useNavigate();
const handleToolsClick = () => {
  navigate("/tools");
};
  // Typing effect
  useEffect(() => {
    const title = TITLES[index];

    if (!deleting && subIndex === title.length) {
      const timer = setTimeout(() => setDeleting(true), 1200);
      return () => clearTimeout(timer);
    }

    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % TITLES.length);
      return;
    }

    const timer = setTimeout(
      () => {
        const next = subIndex + (deleting ? -1 : 1);

        setSubIndex(next);
        setText(title.slice(0, next));
      },
      deleting ? 70 : 120,
    );

    return () => clearTimeout(timer);
  }, [index, subIndex, deleting]);

  const handleResumeClick = () => {
    if (window.innerWidth <= 768) {
      window.open("/Resume.pdf", "_blank");
    } else {
      setShowResume(true);
    }
  };

  return (
    <>
      <section className="hero">
        <div className="floating-card floating-card--left">
          <Code2 size={45} />
        </div>

        <div className="floating-card floating-card--right">
          <Braces size={45} />
        </div>

        <div className="hero__content">
          <div className="hero__badge">
            <span className="dot" />
            Available for Projects
          </div>

          <div className="hero__title-wrap">
            <span className="span1">{"</>"}</span>

            <h1>LEXARCODER</h1>

            <span className="span2">{"</>"}</span>
          </div>

          <div className="hero__line">
            <span className="hero__line-circle" />
          </div>

          <h2>
            BUILDING MODERN EXPERIENCES <span>{text}</span>
          </h2>

          <p>
            Full-stack developer focused on scalable architecture, premium UI
            systems, and AI-powered digital experiences.
          </p>

          <div className="hero__buttons">
            <button
              type="button"
              className="btn btn-premium  "
              onClick={handleResumeClick}
            >
              <span>Resume</span>
              <Download size={18} />
            </button>

            <button
              type="button"
              className="btn page"
              onClick={handleToolsClick}
            >
              <span>AI Tools</span>
              <Sparkles size={16} />
            </button>
          </div>

          <div className="scroll">
            <div className="scroll__mouse">
              <div className="scroll__dot" />
            </div>

            <span>SCROLL TO EXPLORE</span>
          </div>
        </div>

        {showResume && (
          <div className="modal-overlay" onClick={() => setShowResume(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="close-btn"
                onClick={() => setShowResume(false)}
                aria-label="Close resume modal"
              >
                <X size={20} />
              </button>

              <iframe
                src="/Resume.pdf"
                title="Resume"
                className="resume-frame"
              />
            </div>
          </div>
        )}
      </section>

      <Suspense fallback={null}>
        <SocialLinks />
        <Project />
        <Skill />
        <SimpleAbout />
        <Contact />
        <Banner />
      </Suspense>
    </>
  );
}
