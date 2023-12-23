import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { hideAlert } from "../../redux/features/ComponentsRender.slice";

const Alert = () => {
  const alert = useSelector((state) => state.components.alert);

  const dispatch = useDispatch();

  return (
    <>
      {alert.toRender && (
        <div
          className={`indicator absolute bottom-10 left-10 border-2 ${
            alert.type === "error"
              ? "border-red-900 bg-red-400"
              : "border-green-900 bg-green-300"
          }  px-8 py-3 rounded-lg text-md text-primary max-w-[25em]`}
        >
          <div
            className=""
            onClick={() => {
              hideAlert();
            }}
          >
            <span
              className="indicator-item badge cursor-pointer"
              onClick={() => dispatch(hideAlert())}
            >
              <FaRegTrashCan />
            </span>
            {alert.text}
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
