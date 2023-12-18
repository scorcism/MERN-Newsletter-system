import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Header from "../components/Header";
import Footer from "../components/Footer";

const DashboardRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route index path="/" element={<Dashboard />} />
      </Routes>
      <Footer />
    </>
  );
};

export default DashboardRoutes;
