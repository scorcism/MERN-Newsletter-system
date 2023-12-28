import React, { useEffect, useState } from "react";
import { FaRegTrashCan, FaRegPenToSquare } from "react-icons/fa6";
import { useDeleteAudienceTypeMutation } from "../../../../redux/service/utilApi";
import { useDispatch } from "react-redux";
import { showAlert } from "../../../../redux/features/ComponentsRender.slice";

const TableBody = ({ data }) => {
  const [deleteAudienceType, deleteAudienceTypeResult] =
    useDeleteAudienceTypeMutation();

  const dispatch = useDispatch();

  const handleDelete = async (id, title) => {
    if (window.confirm(`are you sure you want to delete ${title} type`)) {
      try {
        const res = await deleteAudienceType({
          typeId: id,
        });
      } catch (error) {
        dispatch(
          showAlert({
            alert_type: "error",
            text: `Some Error occured, please reaload`,
          })
        );
      }
    }
  };

  useEffect(() => {
    if (
      deleteAudienceTypeResult.isSuccess &&
      !deleteAudienceTypeResult.isLoading
    ) {
      dispatch(
        showAlert({
          alert_type: "success",
          text: `Deleted audience type ${data.title}`,
        })
      );
    }
  }, [deleteAudienceTypeResult.isSuccess]);

  const [update, setUpdate] = useState(false);
  const [name, setName] = useState(data.title);

  const handleEdit = (id) => {
    console.log(id, name)
  };

  return (
    <tr>
      <td>
        {/* {update == false &&  */}
        <h3>{name}</h3>
        {/* } */}
        {/* {update == true && <input type="text" value={name} onChange={(e)=> { */}
          {/* setName(e.target.value) */}
        {/* }}/>} */}
      </td>
      <td className="flex flex-row gap-5">
        {/* {update === false && ( */}
          <p
            className="cursor-pointer"
            onClick={() => {
              setUpdate(true);
            }}
          >
            <FaRegPenToSquare />
          </p>
        {/* )} */}
        {/* {update === true && (
          <p
            className="cursor-pointer"
            onClick={() => {
              setUpdate(false);
              handleEdit(data._id);
            }}
          >
            OK
          </p>
        )} */}

        <p
          className="cursor-pointer text-red-900"
          onClick={() => handleDelete(data._id, data.title)}
        >
          <FaRegTrashCan />
        </p>
      </td>
    </tr>
  );
};

export default TableBody;
