import React, { useEffect, useState } from "react";
import TableBody from "./TableBody";

const datas = [
  {
    id: "3ajsgasa75s7a6sas",
    name: "HTML HTML",
    email: "HTML@gmail.com",
    dateJoined: "Oct 22 2023",
    audience: "HTML",
    status: 1,
  },
  {
    id: "3ajsgasa75s7a6sas",
    name: "CSS CSS",
    email: "CSS@gmail.com",
    dateJoined: "Oct 22 2023",
    audience: "CSS",
    status: 1,
  },
  {
    id: "3ajsgasa75s7a6sas",
    name: "JS JS",
    email: "JS@gmail.com",
    dateJoined: "Oct 22 2023",
    audience: "JS",
    status: 1,
  },
];

const Table = () => {
  return (
    <div className="overflow-x-auto h-full">
      <table className="table text-lg border-2 border-accent px-2">
        <thead className="text-lg text-primary">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date Joined</th>
            <th>Audience</th>
            <th>Status</th>
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
