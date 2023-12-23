import React, { useState } from "react";
import DashboradFormWrapper from "../../../Wrappers/DashboradFormWrapper";
import { useDispatch } from "react-redux";
import { showAlert } from "../../../../redux/features/ComponentsRender.slice";

const Form = ({ toRender }) => {
  const dispatch = useDispatch();

  const [options, setOptions] = useState([
    {
      id: "12",
      text: "HTML",
    },
    {
      id: "34",
      text: "JS",
    },
    {
      id: "56",
      text: "CSS",
    },
  ]);

  const [name, setName] = useState("");
  const [selectOption, setSelectedOption] = useState("");

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <DashboradFormWrapper>
      <div className="flex flex-col gap-10 my-7 justify-center w-[30vw] ">
        <h2 className="text-lg font-extrabold text-center">Create Audience</h2>
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
            <option value={option.id}>{option.text}</option>
          ))}
        </select>

        <button
          className="border-2 py-2 rounded-lg bg-primary text-accent text-bold"
          onClick={() =>
            dispatch(
              showAlert({
                alert_type: "success",
                text: "Lorem ipsum dolor sit  ",
              })
            )
          }
        >
          Create Type
        </button>
      </div>
    </DashboradFormWrapper>
  );
};

export default Form;
