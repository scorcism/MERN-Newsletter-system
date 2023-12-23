import React from "react";

const Head = () => {
  return (
    <div className="flex flex-row justify-start items-start gap-10 h-[10%]">
      <p
        className={`border-2 px-6 py-2 rounded-lg bg-secondary text-primary font-bold hover:bg-secondary/90 transition duration-200 hover:border-neutral cursor-pointer `}
      >
        Contacts
      </p>
    </div>
  );
};

export default Head;
