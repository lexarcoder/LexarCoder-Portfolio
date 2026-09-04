

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
// import robot from "../../../assets/lottie_Files/Livechatbot.lottie";
import "../style/AiRobot.scss";
import { useNavigate } from "react-router-dom";

export default function AiRobot() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/lexar-ai");
  };

  return (
    <div className="ai-robot" onClick={handleClick}>
      <DotLottieReact
        src="https://res.cloudinary.com/drcn7lttj/raw/upload/v1783530173/Livechatbot_xiihsy.lottie"
        loop
        autoplay
      />
    </div>
  );
}