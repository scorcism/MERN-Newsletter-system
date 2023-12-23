import React, { useState } from "react";
import DashboradFormWrapper from "../../../Wrappers/DashboradFormWrapper";

const Form = () => {
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
  const [content, setContent] = useState("");

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <DashboradFormWrapper>
      <div className="flex flex-col gap-6 w-[40vw] py-2">
        <h1 className="text-xl font-extrabold text-center">Send NewsLetter</h1>
        <div className="flex justify-beteween gap-10">
          <input
            type="text"
            className="text-lg outline-none rounded-lg px-5 py-2 flex-1"
            placeholder="Enter Name"
            name="type"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            className="select select-primary outline-none border-none flex-1"
            onChange={(e) => handleSelectChange(e)}
          >
            <option disabled selected>
              Select Audience
            </option>
            {options.map((option) => (
              <option value={option.id}>{option.text}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-row gap-10 w-[100%]">
          <div className="w-full h-full">
            <h2>Content</h2>
            <textarea
              className="textarea textarea-bordered h-full w-full"
              rows={15}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="w-full ">
            <h2>Preview</h2>
            <div
              className="textarea textarea-bordered h-[93%]"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
        <button className="border-2 py-3 bg-primary rounded-lg text-accent text-lg font-extrabold ">Submit</button>
      </div>
    </DashboradFormWrapper>
  );
};

export default Form;
