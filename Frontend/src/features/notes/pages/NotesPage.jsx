import React from "react";
import "../style/NotesPage.scss";
import Notes from "./Notes";
import Banner from "../../../layout/components/Banner"
import SocialLinks from "../../../layout/components/SocialLinks"
const NotesPage = () => {
  return (
    <>
      <div className="lcn-hub-container">
        {/* Visual background textures and subtle lighting fields from image_bf6cb7.jpg */}
        <div className="lcn-chalkboard-overlay" aria-hidden="true"></div>
        <div className="lcn-vignette" aria-hidden="true"></div>

        {/* Top Right Torn Paper: Dev Notes Checklist */}
        <aside
          className="lcn-paper-sheet lcn-paper-sheet--top-right"
          aria-hidden="true"
        >
          <div className="lcn-paper-sheet__torn-edge"></div>
          <div className="lcn-paper-sheet__content">
            <h3 className="lcn-paper-title">Dev Notes</h3>
            <ul className="lcn-checklist">
              <li className="lcn-checklist__item lcn-checklist__item--checked">
                Learn
              </li>
              <li className="lcn-checklist__item lcn-checklist__item--checked">
                Understand
              </li>
              <li className="lcn-checklist__item lcn-checklist__item--checked">
                Build
              </li>
              <li className="lcn-checklist__item lcn-checklist__item--checked">
                Repeat
              </li>
            </ul>
            <div className="lcn-code-tag">&lt;/&gt;</div>
          </div>
        </aside>

        {/* Top Left Chalkboard Hand-written Quote */}
        <div
          className="lcn-chalk-text lcn-chalk-text--top-left"
          aria-hidden="true"
        >
          <p>// Code is not</p>
          <p>&nbsp;&nbsp;just syntax,</p>
          <p>&nbsp;&nbsp;it's logic</p>
          <p>&nbsp;&nbsp;brought to life.</p>
        </div>

        {/* Main Hero Branding Centerpiece */}
        <main className="lcn-main-hero">
          <div className="lcn-title-wrapper">
            {/* Three hand-drawn spark accents above title */}
            <div className="lcn-spark-accent" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <h1 className="lcn-hero-title">
              <spaPagen className="lcn-hero-title__brand">LEXARCODER</spaPagen>
              <span className="lcn-hero-title__hub">Notes HUB</span>
            </h1>

            {/* Underline stroke decorative sweep */}
            <div className="lcn-underline-stroke" aria-hidden="true"></div>
          </div>

          {/* Dynamic Curved Arrow Accent pointing to the Title */}
          <div className="lcn-curved-arrow" aria-hidden="true">
            <svg
              viewBox="0 0 50 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M40,10 Q25,25 10,20" />
              <polyline points="15,13 8,20 17,25" />
            </svg>
          </div>

          {/* Core Subtitle Messaging */}
          <div className="lcn-messaging-block">
            <p className="lcn-messaging-block__tagline">
              Handwritten notes for{" "}
              <span className="lcn-highlight">coders</span>, <br />
              by a lexarCoder.
            </p>
            <p className="lcn-messaging-block__subtext">
              Simple, Structured, and Straight to the point.
            </p>
          </div>
        </main>

        {/* Bottom Left Torn Paper: Topic List */}
        <aside
          className="lcn-paper-sheet lcn-paper-sheet--bottom-left"
          aria-hidden="true"
        >
          <div className="lcn-paper-sheet__content">
            <h3 className="lcn-paper-title lcn-paper-title--underlined">
              Topic List
            </h3>
            <ul className="lcn-topics">
              <li>JavaScript</li>
              <li>React JS</li>
              <li>Node JS</li>
              <li>MongoDB</li>
              <li>C++</li>
              <li>DSA</li>
            </ul>
            <div className="lcn-star-doodle">★</div>
          </div>
          <div className="lcn-paper-sheet__torn-edge lcn-paper-sheet__torn-edge--bottom"></div>
        </aside>

        {/* Bottom Right Hand-written Quote and Accent */}
        <div
          className="lcn-chalk-text lcn-chalk-text--bottom-right"
          aria-hidden="true"
        >
          <p>Consistency</p>
          <p>&nbsp;&nbsp;beats</p>
          <p>&nbsp;&nbsp;motivation.</p>
          <div className="lcn-tiny-star">★</div>
        </div>

        {/* Interactive Glowing Mouse Scroll Indicator */}
        <footer className="lcn-scroll-footer" aria-hidden="true">
          <div className="lcn-mouse-icon">
            <span className="lcn-mouse-icon__wheel"></span>
          </div>
          <span className="lcn-scroll-footer__label">Scroll to explore</span>
        </footer>
      </div>
      <SocialLinks />
      <Notes />
      <Banner />
    </>
  );
};

export default NotesPage;
