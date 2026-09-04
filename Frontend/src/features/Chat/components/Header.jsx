import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Check,
  Download,
  LogOut,
  Menu,
  MoreHorizontal,
  MoreVertical,
  Share2,
  Sparkles,
  User,
} from "lucide-react";

import { useAuth } from "../../../hooks/useAuth";
import "../style/Header.scss";

function Header({ onMenuClick, onExportChat }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const desktopMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const copyTimerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        desktopMenuRef.current &&
        !desktopMenuRef.current.contains(event.target)
      ) {
        setIsMoreMenuOpen(false);
      }

      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearTimeout(copyTimerRef.current);
    };
  }, []);

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "LexarAi - AI Chatbot",
          text: "Check out this AI conversation on LexarAi!",
          url,
        });
      } catch {
        // User cancelled sharing
      }

      return;
    }

    try {
      await navigator.clipboard.writeText(url);

      setIsCopied(true);

      clearTimeout(copyTimerRef.current);

      copyTimerRef.current = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch {
      console.error("Failed to copy link");
    }
  };

  const handleLogout = async () => {
    setIsMobileMenuOpen(false);
    setIsMoreMenuOpen(false);

    try {
      if (logout) {
        await logout();
      }
    } finally {
      navigate("/login");
    }
  };

  const handleExport = () => {
    setIsMobileMenuOpen(false);
    setIsMoreMenuOpen(false);

    if (onExportChat) {
      onExportChat();
    }
  };

  return (
    <header className="header-nav page">
      <div className="header-left-zone">
        <button
          className="menu-toggle-btn"
          type="button"
          aria-label="Toggle Sidebar"
          onClick={onMenuClick}
        >
          <Menu size={22} />
        </button>
      </div>

      <div className="header-center-zone">
        <Link to="/" className="brand-logo">
          <Sparkles
            size={22}
            className="logo-icon"
            fill="currentColor"
          />
          <span className="logo-text">LexarAi</span>
        </Link>
      </div>

      <div className="header-right-zone">
        {/* Desktop Actions */}
        <div className="desktop-actions">
          <button
            className="share-btn page"
            type="button"
            onClick={handleShare}
          >
            {isCopied ? <Check size={16} /> : <Share2 size={16} />}

            <span>{isCopied ? "Link Copied!" : "Share"}</span>
          </button>

          <Link
            to="/contact"
            className="contact-icon-link"
            aria-label="Contact"
          >
            <User size={18} />
          </Link>

          <div className="more-menu-wrapper" ref={desktopMenuRef}>
            <button
              className={`more-btn ${isMoreMenuOpen ? "active" : ""}`}
              type="button"
              aria-label="More options"
              onClick={() => setIsMoreMenuOpen((prev) => !prev)}
            >
              <MoreHorizontal size={20} />
            </button>

            {isMoreMenuOpen && (
              <div className="more-dropdown-menu">
                <Link
                  to="/profile"
                  className="dropdown-item"
                  onClick={() => setIsMoreMenuOpen(false)}
                >
                  <User size={16} />
                  <span>Profile</span>
                </Link>

                <button
                  className="dropdown-item"
                  type="button"
                  onClick={handleExport}
                >
                  <Download size={16} />
                  <span>Export Chat</span>
                </button>

                <div className="dropdown-divider" />

                <button
                  className="dropdown-item danger"
                  type="button"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="mobile-actions" ref={mobileMenuRef}>
          <button
            className="mobile-trigger-btn"
            type="button"
            aria-label="More options"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <MoreVertical size={22} />
          </button>

          {isMobileMenuOpen && (
            <div className="mobile-dropdown-menu page">
              <button
                className="dropdown-item"
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleShare();
                }}
              >
                {isCopied ? <Check size={16} /> : <Share2 size={16} />}

                <span>
                  {isCopied ? "Link Copied!" : "Share Chat"}
                </span>
              </button>

              <Link
                to="/profile"
                className="dropdown-item"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User size={16} />
                <span>Profile</span>
              </Link>

              <button
                className="dropdown-item"
                type="button"
                onClick={handleExport}
              >
                <Download size={16} />
                <span>Export Chat</span>
              </button>

              <div className="dropdown-divider" />

              <button
                className="dropdown-item danger"
                type="button"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;