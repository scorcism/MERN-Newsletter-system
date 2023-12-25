import React from "react";
import { FaRegTrashCan, FaRegPenToSquare } from "react-icons/fa6";
import { useDeleteAudienceTypeMutation } from "../../../../redux/service/utilApi";

const TableBody = ({ data }) => {
  const [deleteAudienceType, deleteAudienceTypeResult] =
    useDeleteAudienceTypeMutation();

  const handleDelete = async (id) => {
    try {
      const res = await deleteAudienceType({
        typeId: id,
      });

      console.log("res: ", res);
    } catch (error) {
      console.log("erorr: ", error);
    }
  };
  

  const handleEdit = (id) => {
    console.log("handle delete: ", id);
  };

  return (
    <tr>
      <td>{data.title}</td>
      <td className="flex flex-row gap-5">
        <p className="cursor-pointer" onClick={() => handleEdit(data._id)}>
          <FaRegPenToSquare />
        </p>
        <p
          className="cursor-pointer text-red-900"
          onClick={() => handleDelete(data._id)}
        >
          <FaRegTrashCan />
        </p>
      </td>
    </tr>
  );
};

export default TableBody;
