import React, { useEffect, useState } from "react";
import DashboradFormWrapper from "../../../Wrappers/DashboradFormWrapper";
import { useDispatch } from "react-redux";
import { showAlert } from "../../../../redux/features/ComponentsRender.slice";
import {
  useCreateAudienceMutation,
  useGetAudienceTypeQuery,
} from "../../../../redux/service/utilApi";

const Form = ({ toRender }) => {
  const dispatch = useDispatch();

  const [options, setOptions] = useState([]);

  const { data, isLoading, isError, error } = useGetAudienceTypeQuery();
  const [createAudience, createAudienceResult] = useCreateAudienceMutation();

  useEffect(() => {
    if (!isLoading && !isError) {
      setOptions(data.data);
    }
  }, [isLoading]);

  const [name, setName] = useState("");
  const [selectOption, setSelectedOption] = useState([]);

  const handleSelectChange = (e) => {
    // TODO
    // if (selectOption.includes(e.target.value)) {
    //   console.log("log: ", e.target.value);
    //   setSelectedOption((option) => {
    //     selectOption.filter((opt) => opt._id !== e.target.value);
    //   });
    // } else {
      setSelectedOption([...selectOption, e.target.value]);
    // }
  };

  const handleSubmit = async () => {
    try {
      const res = await createAudience({
        title: name,
        audienceTypes: selectOption,
      });
      dispatch(
        showAlert({
          alert_type: "success",
          text: res.data.message,
        })
      );
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    if (createAudienceResult.isError && !createAudienceResult.isSuccess) {
      let error = createAudienceResult.error;
      dispatch(
        showAlert({ alert_type: "error", text: error.data.error.error })
      );
    }
  }, [data, createAudienceResult.isError, createAudienceResult.error]);

  return (
    <DashboradFormWrapper>
      {!isError && (
        <div className="flex flex-col gap-10 my-7 justify-center w-[30vw] ">
          <h2 className="text-lg font-extrabold text-center">
            Create Audience
          </h2>
          <input
            type="text"
            className="text-lg outline-none rounded-lg px-5 py-2"
            placeholder="Name"
            name="type"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select
            className="select select-primary w-full max-w-full outline-none border-none"
            onChange={(e) => handleSelectChange(e)}
          >
            <option disabled selected>
              Choose Audience Type
            </option>
            {options.map((option) => (
              <option
                key={option._id}
                className={`w-full ${
                  selectOption.includes(option._id) == true
                    ? "bg-gray-400 "
                    : " "
                }`}
                value={option._id}
              >
                <p className="">{option.title}</p>
              </option>
            ))}
          </select>

          <button
            className="border-2 py-2 rounded-lg bg-primary text-accent text-bold"
            onClick={handleSubmit}
          >
            Create Type
          </button>
        </div>
      )}
      {isError && <h1>Some Error Occured</h1>}
    </DashboradFormWrapper>
  );
};

export default Form;
