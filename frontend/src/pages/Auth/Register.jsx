import React, { useState } from "react";

import AuthFormWrapper from "../../components/Wrappers/AuthFormWrapper";

const Register = () => {
  const [cred, setCred] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCred({
      ...cred,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = () => {
    console.log("cred: ", cred);
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
