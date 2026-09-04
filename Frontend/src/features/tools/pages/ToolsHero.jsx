import React from "react";
import { ArrowRight, Binary, Code, Flame, Sparkles } from "lucide-react";

import "../style/ToolsHero.scss";
import AllToolsPage from "./AllToolsPage";
import SocialLinks from "../../../layout/components/SocialLinks";

const ToolsHero = () => {
  return (
    <>
      <section className="hero-notes-style-section">
        <div className="subtle-grid-overlay" />
        <div className="ambient-purple-glow" />

        <div className="floating-text-quote top-left">
          <p>// AI is not</p>
          <p>just automation,</p>
          <p>it's productivity</p>
          <p>reimagined.</p>
        </div>

        <div className="floating-text-quote bottom-right">
          <p>Save time.</p>
          <p>Boost productivity.</p>
          <p>Powered by AI.</p>
        </div>

        <div className="sticky-notepad notepad-left">
          <h3 className="notepad-title">Categories</h3>

          <ul className="notepad-list">
            <li>
              <Sparkles size={14} className="bullet-icon" />
              Documents
            </li>

            <li>
              <Sparkles size={14} className="bullet-icon" />
              Images
            </li>

            <li>
              <Sparkles size={14} className="bullet-icon" />
              Generation
            </li>

            <li>
              <Sparkles size={14} className="bullet-icon" />
              Translation
            </li>

            <li>
              <Sparkles size={14} className="bullet-icon" />
              OCR Scanner
            </li>

            <li>
              <Sparkles size={14} className="bullet-icon" />
              Utilities
            </li>
          </ul>

          <div className="notepad-footer-star">★</div>
        </div>

        <div className="hero-center-core">
          <h1 className="main-title-handwritten">LEXARCODER</h1>

          <h2 className="sub-title-neon">AI TOOLS HUB</h2>

          <p className="hero-description-text">
            Powerful AI utilities designed to simplify your workflow, <br />
            boost productivity, and automate repetitive tasks.
          </p>

          <p className="hero-sub-footer-text">
            Practical AI utilities crafted by a lexarCoder.
          </p>

          <a href="#dashboard-controls" className="btn-explore-handwritten">
            Explore Tools
            <ArrowRight size={18} />
          </a>
        </div>

        <div className="sticky-notepad notepad-right">
          <h3 className="notepad-title">AI Power</h3>

          <ul className="notepad-list">
            <li>
              <Binary size={14} className="bullet-icon" />
              Fast Convert
            </li>

            <li>
              <Code size={14} className="bullet-icon" />
              Smart Code
            </li>

            <li>
              <Flame size={14} className="bullet-icon" />
              One-Click AI
            </li>

            <li>
              <Sparkles size={14} className="bullet-icon" />
              Precise OCR
            </li>
          </ul>

          <div className="notepad-footer-code">&lt;/&gt;</div>
        </div>

        <div className="scroll-explorer">
          <div className="mouse-icon">
            <div className="wheel" />
          </div>

          <span>Scroll to explore</span>
        </div>
      </section>

      <SocialLinks />
      <AllToolsPage />
    </>
  );
};

export default ToolsHero;
