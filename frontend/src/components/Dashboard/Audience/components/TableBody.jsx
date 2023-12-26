import React, { useEffect } from "react";
import { FaRegTrashCan, FaRegPenToSquare } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { showAlert } from "../../../../redux/features/ComponentsRender.slice";
import { useDeleteAudienceMutation } from "../../../../redux/service/utilApi";

const TableBody = ({ data }) => {
  const [deleteAudience, deleteAudienceResult] =
    useDeleteAudienceMutation();

  const dispatch = useDispatch();

  const handleDelete = async (id, title) => {
    if (window.confirm(`are you sure you want to delete ${title} `)) {
      try {
        const res = await deleteAudience({
          audienceId: id,
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
      deleteAudienceResult.isSuccess &&
      !deleteAudienceResult.isLoading
    ) {
      dispatch(
        showAlert({
          alert_type: "success",
          text: `Deleted audience ${data.title}`,
        })
      );
    }
  }, [deleteAudienceResult.isSuccess]);

  const handleEdit = (id) => {
    console.log("handle audience row edit: ", id);
  };

  return (
    <tr>
      <td>{data.title}</td>
      <td className="">
        <select className="select select-primary outline-none border-none disabled">
          <option disabled selected>
            Audience Types{" "}
          </option>
          {data.audienceTypeId.map((option) => (
            <option key={option._id} disabled>
              <p className="">{option.title}</p>
            </option>
          ))}
        </select>
      </td>
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
