import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useIsAuthenticated = () => {
  const auth = useSelector((state) => state.auth.data);

  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !Cookies.get("AUTH_TOKEN") ||
      !auth.token ||
      !auth.email ||
      !auth.isLoggedIn
    ) {
      navigate("/auth/login");
    }
  }, []);

  return { data };
};

export default useIsAuthenticated;
