import React, { useState } from "react";

import AuthFormWrapper from "../../components/Wrappers/AuthFormWrapper";
import { api } from "../../config/api";
import { validateEmail } from "../../helpers";
import { showAlert } from "../../redux/features/ComponentsRender.slice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { logginUser } from "../../redux/features/userAuth.slice";

const Login = () => {
  const [cred, setCred] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleChange = (e) => {
    setCred({
      ...cred,
      [e.target.name]: e.target.value,
    });
  };
  const validateForm = (cred) => {
    if (!validateEmail(cred.email)) {
      dispatch(showAlert({ alert_type: "error", text: "Enter valid email" }));
      return true;
    }
  };

  const postData = async () => {
    let res = await api.post("/auth/login", {
      ...cred,
    });
    return res;
  };

  const submitForm = async () => {
    if (validateForm(cred)) {
      return;
    } else {
      try {
        let response = await postData();
        let successMessage = response.data.message;
        let data = response.data.data;

        Cookies.set("AUTH_TOKEN", data.token);
        Cookies.set("AUTH_EMAIL", data.email);

        dispatch(showAlert({ alert_type: "success", text: successMessage }));
        dispatch(logginUser({ token: data.token, email: data.email }));
        
        navigation("/");
      } catch (error) {
        let errorMessage = error.response.data.message;
        dispatch(
          showAlert({
            alert_type: "error",
            text: `${errorMessage ? errorMessage : "Internal server error"}`,
          })
        );
      }
    }
  };

  return (
    <AuthFormWrapper>
      <div className="flex flex-col px-10 py-5">
        <h1 className="font-extrabold text-xl mb-10">Login</h1>
        <div className="flex flex-col gap-8">
          <input
            type="email"
            className="text-lg outline-none rounded-lg px-2 py-2"
            placeholder="Email.."
            name="email"
            id="email"
            value={cred.email}
            onChange={(e) => handleChange(e)}
          />
          <input
            className="text-lg outline-none rounded-lg px-2 py-2"
            type="password"
            placeholder="Password.."
            name="password"
            id="password"
            value={cred.password}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <a href="/auth/forgot-password" className="underline text-sm mb-8 mt-1">
          forgot-password
        </a>
        <button
          onClick={submitForm}
          className="btn btn-primary text-lg no-animation hover:text-white/80 mb-2"
        >
          Login..
        </button>
        <h2 className="text-sm">
          Create an Account,{" "}
          <a href="/auth/register" className="underline">
            Register
          </a>
        </h2>
      </div>
    </AuthFormWrapper>
  );
};

export default Login;
