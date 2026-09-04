import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import PageLayout from "../../layout/components/PageLayout";
import Loading from "../../features/auth/components/Loading";
import Protected from "../../features/auth/components/Protected";

// Pages
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Project = lazy(() => import("../pages/projects/Project"));
const Skill = lazy(() => import("../pages/Skill"));
const UserProfile = lazy(() => import("../pages/UserProfile"));

// Features
const Contact = lazy(() => import("../../features/email/components/Contact"));
const ToolsHero = lazy(() => import("../../features/tools/pages/ToolsHero"));

const PageRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Public Routes */}
        <Route element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/project" element={<Project />} />
          <Route path="/skill" element={<Skill />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/profile"
            element={
              <Protected>
                <UserProfile />
             </Protected>
            }
          />

          {/* Protected Route */}
          <Route
            path="/tools"
            element={
              <Protected>
                <ToolsHero />
               </Protected>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default PageRoutes;
