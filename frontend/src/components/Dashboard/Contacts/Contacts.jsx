import React from "react";
import Head from "./Head";
import Body from "./Body";

const Contacts = () => {
  return (
    <div className="flex flex-col gap-16 h-[100%]">
      <Head />
      <Body />
    </div>
  );
};

export default Contacts;
