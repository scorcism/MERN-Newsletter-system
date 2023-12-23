import React from "react";

const Head = ({ changeToRender, toRender }) => {

  return (
    <div className="flex flex-row justify-start items-start gap-10 h-[10%]">
      <p
        onClick={() => changeToRender("form")}
        className={`border-2 px-6 py-2 rounded-lg bg-secondary text-primary font-bold hover:bg-secondary/90 transition duration-200 hover:border-neutral cursor-pointer  ${
          toRender.form === true ? "border-black" : ""
        }`}
      >
        Create API
      </p>
      <p
        onClick={() => changeToRender("table")}
        className={`border-2 px-6 py-2 rounded-lg bg-secondary text-primary font-bold hover:bg-secondary/90 transition duration-200 hover:border-neutral cursor-pointer  ${
          toRender.table === true ? "border-black" : ""
        }`}
      >
        List APIs
      </p>
    </div>
  );
};

export default Head;
