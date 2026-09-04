import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import GlobalBg from "../ui/GlobalBg";
import AiRobot from "../../features/Chat/components/AiRobot";
import "../style/PageLayout.scss";

const PageLayout = () => {
  return (
    <div className="layout">
      <GlobalBg />
      <div className="layout-container">
        <Navbar />
        <main className="layout-content">
          <Outlet />
        </main>
        <Footer />
      </div>
      <AiRobot />
    </div>
  );
};

export default PageLayout;
