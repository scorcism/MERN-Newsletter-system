import React, { useState } from "react";
import Head from "./Head";
import Body from "./Body";

const AudienceType = () => {
  const [toRender, setToRender] = useState({
    form: true,
    table: false,
  });

  

  const changeToRender = (action) => {
    setToRender({
      form: action === 'form',
      table: action === 'table',
    });
  };

  return (
    <div className="flex flex-col gap-16 h-[100%]">
      <Head changeToRender={changeToRender} toRender={toRender}/>
      <Body toRender={toRender} />
    </div>
  );
};

export default AudienceType;
