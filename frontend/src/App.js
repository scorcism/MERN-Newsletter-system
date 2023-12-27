import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardRoutes from "./routes/DashboardRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import NotFound from "./components/NotFound";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import Alert from "./components/CommonComponents/Alert";
import Guide from "./pages/static/Guide";
import Dummy from "./pages/static/Dummy";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardRoutes />} />
          <Route path="/dashboard" element={<DashboardRoutes />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/dummy" element={<Dummy />} />
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Alert />
    </Provider>
  );
};

export default App;
