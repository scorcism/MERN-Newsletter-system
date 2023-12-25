import React, { useState } from "react";
import AuthFormWrapper from "../../components/Wrappers/AuthFormWrapper";
import { validateEmail } from "../../helpers";
import { api } from "../../config/api";
import { useDispatch } from "react-redux";
import { showAlert } from "../../redux/features/ComponentsRender.slice";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const validateForm = (email) => {
    if (!validateEmail(email)) {
      dispatch(showAlert({ alert_type: "error", text: "Enter valid email" }));
      return true;
    }
  };

  const postData = async () => {
    let res = await api.post("/auth/forgot-password", {
      email,
    });
    return res;
  };

  const submitForm = async () => {
    if (validateForm(email)) {
      return;
    } else {
      try {
        let response = await postData();
        let successMessage = response.data.message;
        dispatch(
          showAlert({
            alert_type: "success",
            text: successMessage,
          })
        );
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
        <h1 className="font-extrabold text-xl mb-10">Forgot Password.</h1>
        <div className="flex flex-col gap-8 mb-10">
          <input
            type="email"
            className="text-lg outline-none rounded-lg px-2 py-2"
            placeholder="Email.."
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          onClick={submitForm}
          className="btn btn-primary text-lg no-animation hover:text-white/80 mb-2"
        >
          Sent Mail..
        </button>
        <h2 className="text-sm">
          Or ,{" "}
          <a href="/auth/register" className="underline">
            Regsiter
          </a>
        </h2>
      </div>
    </AuthFormWrapper>
  );
};

export default ForgotPassword;
