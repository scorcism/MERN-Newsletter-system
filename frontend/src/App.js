import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardRoutes from "./routes/DashboardRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardRoutes />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
