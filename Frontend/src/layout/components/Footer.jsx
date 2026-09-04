import React from "react";
import { NavLink } from "react-router-dom";
import { Code2, Globe, Mail } from "lucide-react";
import "../style/Footer.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer ">
      <div className="footer-container ">
        {/* ========= LEFT ========= */}
        <div className="footer-brand">
          <h2 className="footer-logo">LexarCoder</h2>

          <p className="footer-text">
            Building modern, scalable and high-performance web experiences.
          </p>

          {/* ========= SOCIAL ========= */}
          <div className="footer-socials">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub/Code"
            >
              <Code2 size={20} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Website"
            >
              <Globe size={20} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* ========= LINKS ========= */}
        <div className="footer-links">
          <div className="footer-link-group navigation">
            <h3>Navigation</h3>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/project">Projects</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>

          <div className="footer-link-group">
            <h3>Legal</h3>
            <NavLink to="/privacy-policy">Privacy Policy</NavLink>
            <NavLink to="/security">Security</NavLink>
            <NavLink to="/terms">Terms & Conditions</NavLink>
            <NavLink to="/cookies">Cookie Policy</NavLink>
          </div>

          <div className="footer-link-group">
            <h3>Resources</h3>
            <NavLink to="/notes">Notes</NavLink>
            <NavLink to="/skill">Skills</NavLink>
            <NavLink to="/faq">FAQ</NavLink>
            <NavLink to="/support">Support</NavLink>
          </div>
        </div>
      </div>

      {/* ========= BOTTOM ========= */}
      <div className="footer-bottom">
        <p>© {currentYear} LexarCoder. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
