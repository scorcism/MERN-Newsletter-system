import React, { useEffect, useState } from "react";
import DashboradFormWrapper from "../../../Wrappers/DashboradFormWrapper";
import {
  useCreateSendMailMutation,
  useGetAudienceQuery,
} from "../../../../redux/service/utilApi";

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
  const [content, setContent] = useState(`<h1>Hello <b>$name</b> </h2>  
  <p>Hope you are having a good day.</p>    <br/>
  <p>Your signed account: <b>$email<b/><p>`);

  const { data, isError, isSuccess, error } = useGetAudienceQuery();
  const [createSendMail, createSendMailResult] = useCreateSendMailMutation();

  useEffect(() => {
    if (isSuccess && !isError) {
      setOptions(data.data);
    }
  }, [isSuccess]);

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const res = await createSendMail({
        subject: name,
        content,
        audienceId: selectOption,
      });
      console.log("apple: ", res);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <DashboradFormWrapper>
      <div className="flex flex-col gap-6 w-[40vw] py-2">
        <h1 className="text-xl font-extrabold text-center">Send NewsLetter</h1>
        <div className="flex justify-beteween gap-10">
          <input
            type="text"
            className="text-lg outline-none rounded-lg px-5 py-2 flex-1"
            placeholder="Enter Title"
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
              <option value={option._id}>{option.title}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-row gap-10 w-[100%]">
          <div className="w-full h-full">
            <div className="indicator">
              <div className="grid w-24">content</div>
              <span
                className="indicator-item badge badge-primary"
                title="You can use $name and $email for the users.
This will be replaced by the actual user name an user email"
              >
                note*
              </span>
            </div>
            <textarea
              className="textarea textarea-bordered h-full w-full"
              rows={15}
              value={content}
              placeholder="You can use $name and $email for the users.
              This will be replaced by the actual user name an user email"
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
        <button
          onClick={handleSubmit}
          className="border-2 py-3 bg-primary rounded-lg text-accent text-lg font-extrabold "
        >
          Submit
        </button>
      </div>
    </DashboradFormWrapper>
  );
};

export default Form;
