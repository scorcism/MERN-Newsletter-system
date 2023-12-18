import React from "react";

const AuthFormWrapper = ({ children }) => {
  return (
    <>
      <div className="flex min-h-[100vh] min-w-[100vw] items-center justify-center">
        <div className="border border-white/40 rounded-md justify-center w-[30%] h-[50%] p-6">
          {children}
        </div>
      </div>
    </>
  );
};

export default AuthFormWrapper;
