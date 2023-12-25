import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Provider, useDispatch } from "react-redux";
import store from "../redux/store/store";
import Cookies from "js-cookie";
import { logginUser } from "../redux/features/userAuth.slice";

const DashboardRoutes = () => {

  const dispatch = useDispatch();
  if (Cookies.get("AUTH_TOKEN") && Cookies.get("AUTH_EMAIL")) {
    dispatch(
      logginUser({
        token: Cookies.get("AUTH_TOKEN"),
        email: Cookies.get("AUTH_EMAIL"),
      })
    );
  }

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
