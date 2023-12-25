import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import NewPassword from '../pages/Auth/NewPassword';
import VerifyMail from '../pages/Auth/VerifyMail';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/new-password/:id/:token" element={<NewPassword />} />
      <Route path="/mail-verify/:id" element={<VerifyMail />} />
    </Routes>
  );
};

export default AuthRoutes;
