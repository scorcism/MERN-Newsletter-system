import React from "react";
import Form from "./components/Form";
import Table from "./components/Table";

const Body = ({ toRender }) => {
  return (
    <div className="h-[90%]">
      {toRender.form && <Form toRender={toRender} />}
      {toRender.table && <Table />}
    </div>
  );
};

export default Body;
