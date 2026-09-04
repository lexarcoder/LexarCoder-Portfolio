import React from "react";
import "../style/GlobalBg.scss";

// ── DOT CONFIG ─────────────────────────────
const DOT_DATA = [
  { size: "lg", top: "10%", left: "44%", dur: "3.2s", delay: "0s", op: 0.9 },
  { size: "lg", top: "38%", left: "64%", dur: "4s", delay: "1.2s", op: 0.8 },
  { size: "lg", top: "60%", left: "32%", dur: "3.8s", delay: "2s", op: 0.85 },
  { size: "lg", top: "48%", left: "84%", dur: "5s", delay: "0.5s", op: 0.7 },
  { size: "lg", top: "72%", left: "52%", dur: "3.4s", delay: "1.8s", op: 0.9 },
  { size: "lg", top: "18%", left: "82%", dur: "4.5s", delay: "0.8s", op: 0.75 },

  { size: "md", top: "5%", left: "30%", dur: "4.2s", delay: "0.3s", op: 0.7 },
  { size: "md", top: "25%", left: "52%", dur: "3s", delay: "1.6s", op: 0.65 },
  { size: "md", top: "44%", left: "18%", dur: "5.2s", delay: "0.1s", op: 0.7 },
  { size: "md", top: "80%", left: "44%", dur: "4.8s", delay: "2.2s", op: 0.6 },

  { size: "sm", top: "8%", left: "56%", dur: "3.2s", delay: "0.6s", op: 0.7 },
  { size: "sm", top: "20%", left: "22%", dur: "4.4s", delay: "1.4s", op: 0.6 },
  { size: "sm", top: "30%", left: "76%", dur: "3.8s", delay: "2.1s", op: 0.65 },

  { size: "xs", top: "3%", left: "8%", dur: "2.8s", delay: "0.4s", op: 0.5 },
  { size: "xs", top: "12%", left: "90%", dur: "3.5s", delay: "1.1s", op: 0.45 },
  { size: "xs", top: "22%", left: "42%", dur: "4.2s", delay: "2.4s", op: 0.4 },
];

// ── FLOATING PARTICLES ─────────────────────────────
const FLOATING_PARTICLES = [
  { left: "12%", top: "18%", size: 3, dur: "8s", delay: "0s" },
  { left: "22%", top: "72%", size: 4, dur: "6s", delay: "1s" },
  { left: "48%", top: "36%", size: 2, dur: "7s", delay: "2s" },
  { left: "66%", top: "58%", size: 5, dur: "9s", delay: "0.5s" },
  { left: "82%", top: "24%", size: 3, dur: "6.5s", delay: "1.8s" },
  { left: "90%", top: "78%", size: 4, dur: "8.2s", delay: "2.5s" },
];

export default function GlobalBg() {
  return (
    <div className="global-bg">
      {/* GRID */}
      <div className="hero__grid" />
      <div className="hero__grid-mask" />

      {/* ORBS */}
      <div className="floating-orbs">
        <span className="orb orb--1" />
        <span className="orb orb--2" />
        <span className="orb orb--3" />
      </div>

      {/* MICRO PARTICLES (FIXED STRUCTURE) */}
      <div className="micro-particles">
        {Array.from({ length: 60 }).map((_, i) => (
          <span
            key={i}
            className="micro-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      {/* BLURS */}
      <div className="hero__blur hero__blur--top" />
      <div className="hero__blur hero__blur--left" />
      <div className="hero__blur hero__blur--right" />

      {/* NEBULA */}
      <div className="global-bg__nebula global-bg__nebula--main" />
      <div className="global-bg__nebula global-bg__nebula--left" />
      <div className="global-bg__nebula global-bg__nebula--right" />

      {/* FLOATING PARTICLES */}
      <div className="particles">
        {FLOATING_PARTICLES.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: p.dur,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* STARS */}
      <div className="global-bg__stars" aria-hidden="true">
        {DOT_DATA.map((d, i) => (
          <span
            key={i}
            className={`glow-dot glow-dot--${d.size}`}
            style={{
              top: d.top,
              left: d.left,
              "--dur": d.dur,
              "--delay": d.delay,
              "--base-op": d.op,
            }}
          />
        ))}
      </div>

      <div className="wave wave--left" />
      <div className="wave wave--right" />

    </div>
  );
}
