import React, { useEffect } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
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

  return (
    <tr>
      <td>
        <h3>{data.title}</h3>
      </td>
      <td className="flex flex-row gap-5">
        <p
          className="cursor-pointer"
          onClick={() => {
            handleDelete(data._id, data.title);
          }}
        >
          <FaRegTrashCan />
        </p>
      </td>
    </tr>
  );
};

export default TableBody;
