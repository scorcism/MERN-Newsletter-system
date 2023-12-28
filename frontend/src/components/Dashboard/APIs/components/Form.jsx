import React, { useEffect, useState } from "react";
import DashboradFormWrapper from "../../../Wrappers/DashboradFormWrapper";
import { useDispatch } from "react-redux";
import { FaCopy, FaNoteSticky } from "react-icons/fa6";
import {
  useCreateApiMutation,
  useGetAudienceQuery,
} from "../../../../redux/service/utilApi";

const Form = ({ toRender }) => {
  const dispatch = useDispatch();

  const [options, setOptions] = useState([]);

  const [api, setApi] = useState("");
  const [selectOption, setSelectedOption] = useState("");

  const { data, isError, isSuccess, error } = useGetAudienceQuery();
  const [createApi, createApiResult] = useCreateApiMutation();

  useEffect(() => {
    if (!isError && isSuccess) {
      setOptions(data.data);
    }
  }, [isSuccess]);

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const res = await createApi({
        audienceId: selectOption,
      });
      setApi(res.data.data.apiKey);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const [copyToText, setCopyToText] = useState();

  const CopyAPiKey = () => {
    setCopyToText(true);
    navigator.clipboard.writeText(api);
    setTimeout(() => {
      setCopyToText(false);
    }, 3000);
  };

  return (
    <DashboradFormWrapper>
      <div className="flex flex-col gap-10 my-7 justify-center w-[35vw] ">
        <h2 className="text-lg font-extrabold text-center">Create API</h2>

        <select
          className="select select-primary w-full max-w-full outline-none border-none"
          onChange={(e) => handleSelectChange(e)}
        >
          <option disabled selected>
            Choose Audience
          </option>
          {options.map((option) => (
            <option value={option._id}>{option.title}</option>
          ))}
        </select>
        <div className="flex flex-row relative">
          <input
            type="text"
            className="text-lg outline-none rounded-lg px-5 py-2 flex-1 cursor-pointer  bg-black/80"
            name="api"
            readOnly
            value={api}
            onClick={CopyAPiKey}
          />
          <div onClick={CopyAPiKey}>
            {copyToText && copyToText == true ? (
              <FaNoteSticky className="absolute text-lg top-[-25px] right-[-8px] cursor-pointer" />
            ) : (
              <FaCopy className="absolute text-lg top-[-25px] right-[-8px] cursor-pointer" />
            )}
          </div>
        </div>
        <button
          className="border-2 py-2 rounded-lg bg-primary text-accent text-bold"
          onClick={handleSubmit}
        >
          Get API Key
        </button>
      </div>
    </DashboradFormWrapper>
  );
};

export default Form;
