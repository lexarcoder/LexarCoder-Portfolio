import { useNavigate } from "react-router-dom";
import "../style/SimpleAbout.scss";

const SimpleAbout = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/about");
  };

  return (
    <section className="simple-about">
      <div className="glass-card page">
        <span className="badge">ABOUT ME</span>

        <h1>
          Curious About
          <span> Who I Am?</span>
        </h1>

        <p>
          If you want to know more about my journey, skills, experience, passion
          for web development, and the story behind my brand, explore my
          complete About section.
        </p>

        <button className="page" onClick={handleNavigate}>Explore About Me</button>
      </div>
    </section>
  );
};

export default SimpleAbout;
