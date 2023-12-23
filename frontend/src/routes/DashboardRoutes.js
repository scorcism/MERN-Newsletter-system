import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Provider } from "react-redux";
import store from "../redux/store/store";

const DashboardRoutes = () => {
  return (
    <Provider store={store}>
      <div className="h-[100vh]">
        <Header />
        <Routes>
          <Route index path="/" element={<Dashboard />} />
        </Routes>
        <Footer />
      </div>
    </Provider>
  );
};

export default DashboardRoutes;
