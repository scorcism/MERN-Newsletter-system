import React, { useState } from "react";

import AuthFormWrapper from "../../components/Wrappers/AuthFormWrapper";

const NewPassword = () => {
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

  const submitForm = () => {
    console.log("cred: ", cred);
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
