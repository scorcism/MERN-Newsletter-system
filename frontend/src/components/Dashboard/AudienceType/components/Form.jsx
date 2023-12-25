import React, { useEffect, useState } from "react";
import DashboradFormWrapper from "../../../Wrappers/DashboradFormWrapper";
import { useDispatch } from "react-redux";
import { showAlert } from "../../../../redux/features/ComponentsRender.slice";
import { useCreateAudienceTypeMutation } from "../../../../redux/service/utilApi";

const Form = () => {
  const [type, setType] = useState("");

  const dispatch = useDispatch();

  const [createAudienceType, { isLoading, isError, error }] =
    useCreateAudienceTypeMutation();

  const handleFormSubmit = async () => {
    try {
      const res = await createAudienceType(type);
      setType("");
      dispatch(showAlert({ alert_type: "success", text: res.data.data.data }));
    } catch (error) {
      dispatch(
        showAlert({ alert_type: "error", text: "Internal server error" })
      );
    }
  };

  useEffect(() => {
    if (isError && !isLoading) {
      setType("");
      dispatch(
        showAlert({ alert_type: "error", text: error.data.error.error })
      );
    }
  }, [isLoading]);

  return (
    <DashboradFormWrapper>
      <div className="flex flex-col gap-10 my-7 justify-center w-[30vw]">
        <h2 className="text-lg font-extrabold text-center">
          Create Audience Type
        </h2>
        <input
          type="text"
          className="text-lg outline-none rounded-lg px-5 py-2"
          placeholder="Type Name"
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <button
          className="border-2 py-2 rounded-lg bg-primary text-accent text-bold"
          onClick={handleFormSubmit}
        >
          Create Type
        </button>
      </div>
    </DashboradFormWrapper>
  );
};

export default Form;
