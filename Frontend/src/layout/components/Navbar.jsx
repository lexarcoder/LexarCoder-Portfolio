
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Code2, LogIn, Menu, X, User as UserIcon, LogOut } from "lucide-react";

import "../style/Navbar.scss";
import { useAuth } from "../../hooks/useAuth";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Project", path: "/project" },
  { name: "Skill", path: "/skill" },
  { name: "About", path: "/about" },
  { name: "Notes", path: "/notes" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { user, profile, handleLogout } = useAuth();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleSignIn = () => {
    closeMenu();
    navigate("/login");
  };

  const handleLogoutClick = async () => {
    await handleLogout();
    closeMenu();
    navigate("/");
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <nav className="premium-navbar">
      <div className="nav-container">
        <NavLink to="/" className="nav-brand" onClick={closeMenu}>
          <div className="logo-wrapper">
            <Code2 className="brand-icon" />
          </div>

          <span className="brand-text">
            <span className="brand-lexar">Lexar</span>
            <span className="brand-coder">Coder</span>
          </span>
        </NavLink>

        <div className={`nav-menu-wrapper ${isMenuOpen ? "is-open" : ""}`}>
          <ul className="nav-links">
            {NAV_LINKS.map((link) => (
              <li key={link.name} className="nav-item">
                <NavLink
                  to={link.path}
                  end={link.path === "/"}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  onClick={closeMenu}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mobile-action">
            {user ? (
              <UserProfileMenu
                user={user}
                profile={profile}
                onNavigate={(path) => {
                  closeMenu();
                  navigate(path);
                }}
                onLogout={handleLogoutClick}
              />
            ) : (
              <button
                className="nav-btn mobile-signin-btn btn-premium"
                onClick={handleSignIn}
              >
                <span>Sign In</span>
                <LogIn size={18} />
              </button>
            )}
          </div>
        </div>

        <div className="nav-actions ">
          {user ? (
            <UserProfileMenu
              user={user}
              profile={profile}
              onNavigate={(path) => navigate(path)}
              onLogout={handleLogoutClick}
            />
          ) : (
            <button
              className="nav-btn  btn-premium"
              onClick={handleSignIn}
            >
              <span>Sign In</span>
              <LogIn size={18} />
            </button>
          )}
        </div>

        <button
          className={`mobile-menu-toggle ${isMenuOpen ? "is-active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
}

function UserProfileMenu({ user, profile, onNavigate, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const firstLetter = user?.username?.charAt(0).toUpperCase() || "U";

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".profile-menu")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="profile-menu">
      <button
        className="profile-avatar"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open profile menu"
        aria-expanded={isOpen}
      >
        {profile?.profileImg || user?.profileImg ? (
          <img
            src={profile?.profileImg || user?.profileImg}
            alt="Profile"
            className="avatar-img"
          />
        ) : (
          firstLetter
        )}
      </button>

      {isOpen && (
        <div className="profile-dropdown page">
          <button
            onClick={() => {
              setIsOpen(false);
              onNavigate("/profile");
            }}
          >
            <UserIcon size={16} />
            <span>Profile</span>
          </button>

          <button
            className="logout-btn"
            onClick={() => {
              setIsOpen(false);
              onLogout();
            }}
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}