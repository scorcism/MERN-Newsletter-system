import React, { useState } from "react";

import AuthFormWrapper from "../../components/Wrappers/AuthFormWrapper";
import { api } from "../../config/api";
import { isMinLenght, validateEmail } from "../../helpers";
import { useDispatch } from "react-redux";
import { showAlert } from "../../redux/features/ComponentsRender.slice";

const Register = () => {
  const dispatch = useDispatch();
  const [cred, setCred] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    setCred({
      ...cred,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = (cred) => {
    if (isMinLenght(cred.name, 7)) {
      dispatch(
        showAlert({
          alert_type: "error",
          text: "User name should have atleast 6 characters",
        })
      );
      return true;
    }
    if (!validateEmail(cred.email)) {
      dispatch(showAlert({ alert_type: "error", text: "Enter valid email" }));
      return true;
    }
    if (isMinLenght(cred.password, 6) || isMinLenght(cred.cpassword, 6)) {
      dispatch(
        showAlert({
          alert_type: "error",
          text: "Password shoud be atlas 6 characters long",
        })
      );
      return true;
    }
    if (cred.password != cred.cpassword) {
      dispatch(
        showAlert({ alert_type: "error", text: "Password do not match" })
      );
      return true;
    }
  };

  const postData = async () => {
    let res = await api.post("/auth/register", {
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
        dispatch(showAlert({ alert_type: "success", text: successMessage }));
        setCred({
          name: "",
          email: "",
          password: "",
          cpassword: "",
        });
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
        <h1 className="font-extrabold text-xl mb-10">Register.</h1>
        <div className="flex flex-col gap-8 mb-8">
          <input
            type="name"
            className="text-lg outline-none rounded-lg px-2 py-2"
            placeholder="name.."
            name="name"
            id="name"
            value={cred.name}
            onChange={(e) => handleChange(e)}
          />
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
          <input
            className="text-lg outline-none rounded-lg px-2 py-2"
            type="password"
            placeholder="Confirm Password.."
            name="cpassword"
            id="cpassword"
            value={cred.cpassword}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button
          onClick={submitForm}
          className="btn btn-primary text-lg no-animation hover:text-white/80 mb-2"
        >
          Register..
        </button>
        <h2 className="text-sm">
          Or,{" "}
          <a href="/auth/login" className="underline">
            Login
          </a>
        </h2>
      </div>
    </AuthFormWrapper>
  );
};

export default Register;
