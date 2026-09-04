import React, { useRef } from "react";
import "../style/Banner.scss";

const Banner = () => {
  const bannerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!bannerRef.current) return;

    const rect = bannerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    bannerRef.current.style.setProperty("--x", `${x}%`);
    bannerRef.current.style.setProperty("--y", `${y}%`);
  };

  return (
    <section
      ref={bannerRef}
      className="banner-section"
      onMouseMove={handleMouseMove}
    >
      <h1 className="text-base">LEXARCODER</h1>
      <h1 className="text-reveal">LEXARCODER</h1>
    </section>
  );
};

export default Banner;
