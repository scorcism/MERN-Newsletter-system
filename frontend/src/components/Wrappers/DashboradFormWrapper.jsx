import React from "react";

const DashboradFormWrapper = ({children}) => {
  return (
    <div className="flex h-[100%] w-[100%]  items-center justify-center">
      <div className="border border-neutral rounded-md justify-center m-w-[30vw]  p-6 bg-secondary">
        {children}
      </div>
    </div>
  );
};

export default DashboradFormWrapper;
