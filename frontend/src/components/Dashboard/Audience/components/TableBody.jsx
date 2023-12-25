import React from "react";
import { FaRegTrashCan, FaRegPenToSquare } from "react-icons/fa6";

const TableBody = ({ data }) => {
  const handleDelete = (id) => {
    console.log("handle audience row delete: ", id);
  };

  const handleEdit = (id) => {
    console.log("handle audience row edit: ", id);
  };

  return (
    <tr>
      <td>{data.name}</td>
      <td>{JSON.stringify(data.audienceType)}</td>
      <td className="flex flex-row gap-5">
        <p className="cursor-pointer" onClick={() => handleEdit(data.id)}>
          <FaRegPenToSquare />
        </p>
        <p
          className="cursor-pointer text-red-900"
          onClick={() => handleDelete(data.id)}
        >
          <FaRegTrashCan />
        </p>
      </td>
    </tr>
  );
};

export default TableBody;
