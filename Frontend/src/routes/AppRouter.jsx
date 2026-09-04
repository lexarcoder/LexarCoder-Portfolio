import { BrowserRouter } from "react-router-dom";
import PageRouter from "../pages/routes/PageRouter";
import React from "react";
import AuthRouter from "../features/auth/routes/AuthRouter";
import ScrollToTop from "../layout/components/ScrollToTop";
import NotesRouter from "../features/notes/routes/NotesRouter";
import AiRoutes from "../features/Chat/routes/AiRoutes"
function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <PageRouter />
        <AuthRouter />
        <NotesRouter />
        <AiRoutes/>
      </BrowserRouter>
    </>
  );
}

export default AppRouter;
