import React from "react";
import TableBody from "./TableBody";

const datas = [
  {
    id: "1ajsgasa75s7a6sas",
    name: "Learn HTML in 5 days",
    audienceType: "HTML",
  },
  {
    id: "2ajsgasa75s7a6sas",
    name: "Learn CSS in 5 days",
    audienceType: "CSS",
  },
  {
    id: "3ajsgasa75s7a6sas",
    name: "Learn JS in 5 days",
    audienceType: "JS",
  },
];

const Table = () => {
  return (
    <div className="overflow-x-auto h-full ">
      <table className="table text-lg border-2 border-accent">
        <thead className="text-lg text-primary">
          <tr>
            <th>Name</th>
            <th>Audience Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data) => (
            <TableBody data={data} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
