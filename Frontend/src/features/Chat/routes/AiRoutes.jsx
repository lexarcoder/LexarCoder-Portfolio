import { Routes, Route } from "react-router-dom";
// import Protected from "../../auth/components/Protected";
import AIChatBot from "../page/AIChatBot";

const AiRoutes = () => {
  return (
    <Routes>
      <Route
        path="/lexar-ai"
        element={
          // <Protected>
            <AIChatBot />
          // </Protected>
        }
      />
    </Routes>
  );
};

export default AiRoutes;
