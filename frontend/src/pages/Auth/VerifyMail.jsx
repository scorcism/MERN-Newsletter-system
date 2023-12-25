import React, { useEffect, useState } from "react";

import AuthFormWrapper from "../../components/Wrappers/AuthFormWrapper";
import { Link, useParams } from "react-router-dom";
import { api } from "../../config/api";

const VerifyMail = () => {
  const params = useParams();
  let userId = params.id;

  const [message, setMessage] = useState("");

  const postData = async (id) => {
    let res = await api.get(`/auth/mail-verify/${id}`);
    return res;
  };

  const submitData = async (id) => {
    try {
      let response = await postData(id);
      setMessage(response.data.message);
    } catch (error) {
      let errorMessage = error.response.data.message;
      setMessage(errorMessage);
    }
  };

  useEffect(() => {
    submitData(userId);
  }, [userId]);

  return (
    <AuthFormWrapper>
      <h1>{message}</h1>
      <Link className="text-red-700 underline my-2" to={"/auth/login"}>Login</Link>
    </AuthFormWrapper>
  );
};

export default VerifyMail;
