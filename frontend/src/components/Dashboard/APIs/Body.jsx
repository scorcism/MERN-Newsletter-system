import React from "react";
import Form from "./components/Form";

const Body = ({ toRender }) => {
  return (
    <div className="h-[90%]">
      {toRender.form && <Form toRender={toRender} />}
    </div>
  );
};

export default Body;
