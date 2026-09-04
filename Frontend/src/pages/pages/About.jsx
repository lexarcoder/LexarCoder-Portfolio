
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdDownload } from "react-icons/md";
import {
  personalInfo,
  socials,
  education,
  story,
  services,
  skills,
} from "../Data/AboutData";
import "../style/About.scss";

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaXTwitter,
  FaEnvelope,
};

const SocialIcon = ({ name }) => {
  const Icon = iconMap[name];
  return Icon ? <Icon /> : null;
};

const codeSnippet = `
const dev = {
  name: "LexarCoder",
  stack: ["React", "Node.js", "MongoDB", "GSAP"],
  passion: "Building beautiful digital experiences",
  status: () => "Available 🚀",
};

dev.status();
`;

// ════════════════════════════════════════════════════════════════
// 1. HERO SECTION 
// ════════════════════════════════════════════════════════════════
const HeroSection = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const labelRef = useRef(null);
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const taglineRef = useRef(null);
  const introRef = useRef(null);
  const socialRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    
    if (videoRef.current) {
      gsap.fromTo(
        videoRef.current,
        { scale: 1.1 },
        { scale: 1, duration: 2.5, ease: "power2.out" },
      );
    }

    gsap.fromTo(
      labelRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.65, delay: 0.1 },
    );
    gsap.fromTo(
      ".name-inner",
      { y: "100%", opacity: 0 },
      { y: "0%", opacity: 1, stagger: 0.12, duration: 0.85, delay: 0.3 },
    );
    gsap.fromTo(
      roleRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.5, delay: 0.6 },
    );
    gsap.fromTo(
      taglineRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.55, delay: 0.8 },
    );
    gsap.fromTo(
      introRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, delay: 1.0 },
    );

    gsap.fromTo(
      ".social-link",
      { opacity: 0, x: 20, scale: 0.85 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        stagger: 0.08,
        duration: 0.45,
        ease: "back.out(1.5)",
        delay: 1.2,
      },
    );

    gsap.fromTo(
      scrollRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5, delay: 1.4 },
    );

    gsap.to(videoRef.current, {
      yPercent: 25,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section className="hero" ref={sectionRef}>
      <div className="hero-video-wrap">
        <video
          ref={videoRef}
          src={personalInfo.videoUrl}
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
      <div className="hero-overlay" />

      <div className="hero-content">
        <p className="hero-label" ref={labelRef}>
          {personalInfo.label}
        </p>

        <h1 className="hero-name" ref={nameRef}>
          {personalInfo.name.split(" ").map((word, i) => (
            <span className="name-line" key={i}>
              <span className="name-inner">{word}</span>
            </span>
          ))}
        </h1>

        <span className="hero-role" ref={roleRef}>
          {personalInfo.role}
        </span>

        <h2 className="hero-tagline" ref={taglineRef}>
          {personalInfo.tagline}
          <br />
          <span>{personalInfo.tagline2}</span>
        </h2>

        <p className="hero-intro" ref={introRef}>
          {personalInfo.intro}
        </p>
      </div>

      <div className="social-dock" ref={socialRef}>
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            className="social-link page"
            aria-label={s.label}
            target="_blank"
            rel="noopener noreferrer"
            title={s.label}
          >
            <SocialIcon name={s.icon} />
          </a>
        ))}
      </div>

      <div className="scroll-indicator" ref={scrollRef}>
        <div className="mouse-icon">
          <div className="mouse-dot" />
        </div>
        <span>Scroll to Explore</span>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════════════
// 2. EDUCATION SECTION 
// ════════════════════════════════════════════════════════════════
const EducationSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const timelineRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
      },
    );

    // 2. टाइमलाइन की लाइन का नीचे की तरफ बढ़ना
    gsap.fromTo(
      lineRef.current,
      { height: 0 },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 70%",
          end: "bottom 60%",
          scrub: 1,
        },
      },
    );

    // 3. एजुकेशन कार्ड्स का एक-एक करके स्क्रीन पर आना
    gsap.fromTo(
      ".edu-card",
      { opacity: 0, x: -60, scale: 0.95 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".timeline",
          start: "top 82%",
        },
      },
    );
  }, []);

  return (
    <section className="education" ref={sectionRef}>
      <div className="section-container">
        <div ref={headingRef}>
          <h2 className="section-heading">
            Education <span>Journey</span>
          </h2>
          <p className="section-sub">
            The academic path that shaped my technical foundation.
          </p>
        </div>

        <div className="timeline" ref={timelineRef}>
          <div
            ref={lineRef}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "1px",
              height: 0,
              background:
                "linear-gradient(to bottom, #a78bfa, rgba(167,139,250,0.1))",
            }}
          />

          {education.map((item) => (
            <div className="timeline-item" key={item.id}>
              <div className={`edu-card${item.isCurrent ? " current" : ""} page`}>
                <span className="edu-icon">{item.icon}</span>
                <div className="edu-level">{item.level}</div>
                <div className="edu-school">{item.school}</div>

                <div className="edu-meta">
                  {item.board && <span>📋 {item.board}</span>}
                  {item.degree && (
                    <span>
                      🎓 {item.degree} — {item.branch}
                    </span>
                  )}
                  <span>📅 {item.year}</span>
                  {item.score && <span>📊 {item.score}</span>}
                </div>

                {item.score && <span className="edu-badge">{item.score}</span>}
                {item.isCurrent && (
                  <>
                    <span className="edu-badge">{item.branch}</span>
                    <p className="edu-status">● {item.status}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="resume-wrap">
          <a href={personalInfo.resumeUrl} className="resume-btn page" download>
            <MdDownload className="btn-icon" />
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════════════
// 3. WHY WEB DEV SECTION (डिटेल्स, सर्विसेज और स्किल्स)
// ════════════════════════════════════════════════════════════════
const WhySection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const devCardRef = useRef(null);
  const skillsRef = useRef(null);

  useEffect(() => {
    // 1. मेन हेडिंग एनीमेशन
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
      },
    );

    // 2. स्टोरी ब्लॉक्स (कहानियों वाले डिब्बे) का एनीमेशन
    gsap.fromTo(
      ".story-block",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".story-blocks", start: "top 85%" },
      },
    );

    // 3. विजुअल कोड कार्ड का ज़ूम-इन और फ्लोटिंग एनीमेशन
    if (devCardRef.current) {
      gsap.fromTo(
        devCardRef.current,
        { opacity: 0, scale: 0.88 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: devCardRef.current, start: "top 80%" },
        },
      );

      // हवा में तैरने (Floating) का इफ़ेक्ट
      gsap.to(devCardRef.current, {
        y: -14,
        duration: 3.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }

    // 4. सर्विस कार्ड्स का स्क्रॉल होने पर आना
    gsap.fromTo(
      ".service-card",
      { opacity: 0, y: 40, scale: 0.94 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".services-grid", start: "top 88%" },
      },
    );

    // 5. टेक स्टैक स्किल्स के टैग्स का बबल्स की तरह तैरना
    gsap.fromTo(
      ".skill-tag",
      { opacity: 0, y: 20, scale: 0.88 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        stagger: 0.05,
        ease: "back.out(1.5)",
        scrollTrigger: { trigger: skillsRef.current, start: "top 85%" },
      },
    );

    // हर स्किल टैग को थोड़ा अलग तरीके से हवा में हिलाना (Gentle Floating)
    gsap.utils.toArray(".skill-tag").forEach((el, i) => {
      gsap.to(el, {
        y: gsap.utils.random(-8, 8),
        duration: gsap.utils.random(2.5, 4),
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: i * 0.05,
      });
    });
  }, []);

  return (
    <section className="why-section" ref={sectionRef}>
      <div className="why-container">
        <div ref={headingRef} style={{ marginBottom: "4rem" }}>
          <h2 className="section-heading">
            Why I Chose <span>Web Dev</span>
          </h2>
          <p className="section-sub">
            A story of curiosity, code, and creation.
          </p>
        </div>

        <div className="story-grid">
          <div className="story-blocks ">
            {story.map((s, i) => (
              <div className="story-block page" key={i}>
                <span className="story-emoji">{s.emoji}</span>
                <div>
                  <div className="story-title">{s.title}</div>
                  <p className="story-text">{s.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="dev-visual">
            <div className="dev-card page" ref={devCardRef}>
              <div className="code-overlay">{codeSnippet}</div>
            </div>
          </div>
        </div>

        <h3 className="services-heading">
          What I <span>Build</span>
        </h3>
        <div className="services-grid">
          {services.map((svc, i) => (
            <div className="service-card page" key={i}>
              <span className="svc-icon">{svc.icon}</span>
              <div className="svc-title">{svc.title}</div>
              <p className="svc-desc">{svc.desc}</p>
            </div>
          ))}
        </div>

        <div ref={skillsRef}>
          <h3 className="skills-heading">
            Tech <span>Stack</span>
          </h3>
          <div className="skills-cloud">
            {skills.map((skill) => (
              <span className="skill-tag page" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════════════
// MAIN ROOT COMPONENT
// ════════════════════════════════════════════════════════════════
const About = () => {
  return (
    <div className="about-root">
      <HeroSection />
      <EducationSection />
      <WhySection />
    </div>
  );
};

export default About;