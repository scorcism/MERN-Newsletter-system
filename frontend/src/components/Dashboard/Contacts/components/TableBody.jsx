import React from "react";
import { FaRegTrashCan, FaRegPenToSquare } from "react-icons/fa6";

const TableBody = ({ data }) => {
  const handleDelete = (id) => {
    console.log("handle audience row delete: ", id);
  };

  return (
    <tr>
      <td>{data.name}</td>
      <td>{data.email}</td>
      <td>{data.dateJoined}</td>
      <td>{data.audience}</td>
      <td>{data.status == 1 ? "Subscribed" : "unsubscribed"}</td>
      <td>{JSON.stringify(data.audienceType)}</td>
      <td className="cursor-pointer" onClick={() => handleDelete(data.id)}>
        <FaRegTrashCan />
      </td>
    </tr>
  );
};

export default TableBody;
