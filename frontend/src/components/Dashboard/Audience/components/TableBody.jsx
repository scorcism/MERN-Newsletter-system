import React, { useEffect, useState } from "react";
import { FaRegTrashCan, FaRegPenToSquare } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { showAlert } from "../../../../redux/features/ComponentsRender.slice";
import {
  useDeleteAudienceMutation,
  useUpdateAudienceMutation,
} from "../../../../redux/service/utilApi";

const TableBody = ({ data }) => {
  const [deleteAudience, deleteAudienceResult] = useDeleteAudienceMutation();
  const [updateAudience, updateAudienceResult] = useUpdateAudienceMutation();
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
    if (deleteAudienceResult.isSuccess && !deleteAudienceResult.isLoading) {
      dispatch(
        showAlert({
          alert_type: "success",
          text: `Deleted audience ${data.title}`,
        })
      );
    }
  }, [deleteAudienceResult.isSuccess]);

  const [isUpdating, setIsUpdating] = useState(false);
  const [title, setTitle] = useState(data.title);

  const handleEdit = async (id) => {
    console.log(" edit: ", id, title);
    try {
      let res = await updateAudience({
        title,
        audienceId: data._id,
        audienceTypes: data.audienceTypeId,
      });
    } catch (error) {
      dispatch(
        showAlert({
          alert_type: "error",
          text: "Internal Server error",
        })
      );
    }
  };

  useEffect(() => {
    if (updateAudienceResult.isError || deleteAudienceResult.isError) {
      dispatch(
        showAlert({
          alert_type: "error",
          text: "Internal Server error",
        })
      );
    }
  }, [updateAudienceResult.isError, deleteAudienceResult.isError]);

  useEffect(() => {
    if (updateAudienceResult.isSuccess) {
      dispatch(
        showAlert({
          alert_type: "success",
          text: "Audience updated succcessfully",
        })
      );
    }
  }, [updateAudienceResult.isLoading, updateAudienceResult.isSuccess]);

  return (
    <tr>
      <td>
        {!isUpdating && <h4>{title}</h4>}
        {isUpdating && (
          <input
            type="text"
            name="audienceName"
            id="audienceName"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        )}
      </td>
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
        {!isUpdating && (
          <p
            className="cursor-pointer"
            onClick={() => {
              setIsUpdating(true);
            }}
          >
            <FaRegPenToSquare />
          </p>
        )}
        {isUpdating && (
          <h3
            className="cursor-pointer"
            onClick={() => {
              handleEdit(data._id);
              setIsUpdating(false);
            }}
          >
            OK
          </h3>
        )}
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
