import React, { useState } from "react";

import AuthFormWrapper from "../../components/Wrappers/AuthFormWrapper";
import { useParams } from "react-router-dom";
import { showAlert } from "../../redux/features/ComponentsRender.slice";
import { useDispatch } from "react-redux";
import { api } from "../../config/api";
import { isMinLenght } from "../../helpers";

const NewPassword = () => {
  const params = useParams();

  const id = params.id;
  const token = params.token;

  const [cred, setCred] = useState({
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    setCred({
      ...cred,
      [e.target.name]: e.target.value,
    });
  };

  const dispatch = useDispatch();

  const validateForm = (cred) => {
    if (isMinLenght(cred.password, 6) || isMinLenght(cred.cpassword, 6)) {
      dispatch(
        showAlert({
          alert_type: "error",
          text: "Password should be at least 6 characters long",
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
    let res = await api.post(`/auth/reset-password/${id}/${token}`, {
      ...cred,
    });
    return res;
  };

  const submitForm = async () => {
    if (!validateForm(cred)) {
      try {
        let response = await postData();
        let successMessage = response.data.message;
        dispatch(showAlert({ alert_type: "success", text: successMessage }));
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
        <h1 className="font-extrabold text-xl mb-10">New Password</h1>
        <div className="flex flex-col gap-8 mb-8">
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
          Submit..
        </button>
      </div>
    </AuthFormWrapper>
  );
};

export default NewPassword;
