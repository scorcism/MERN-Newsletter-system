import React from "react";

const AuthFormWrapper = ({ children }) => {
  return (
    <>
      <div className="flex min-h-[100vh] min-w-[100vw] items-center justify-center">
        <div className="border border-neutral rounded-md justify-center w-[30vw] h-[50%] p-6 bg-secondary">
          {children}
        </div>
      </div>
    </>
  );
};

export default AuthFormWrapper;
