import React, { useState } from "react";

import AuthFormWrapper from "../../components/Wrappers/AuthFormWrapper";
import { api } from "../../config/api";

const Login = () => {
  const [cred, setCred] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCred({
      ...cred,
      [e.target.name]: e.target.value,
    });
  };

  const postData = async () => {
    let res = await api("/auth/health");
    console.log("res: ", res);
  }

  const submitForm = () => {
    console.log("cred: ", cred);
    // postData();
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
