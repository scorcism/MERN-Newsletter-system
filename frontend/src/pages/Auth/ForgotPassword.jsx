import React, { useState } from "react";
import AuthFormWrapper from "../../components/Wrappers/AuthFormWrapper";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const submitForm = () => {
    console.log(email);
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
        <button onClick={submitForm} className="btn btn-primary text-lg no-animation hover:text-white/80 mb-2">
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
