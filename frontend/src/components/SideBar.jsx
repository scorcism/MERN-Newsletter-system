import React from "react";
import { SideBarItems } from "../constants/SideBarItems";
import { useDispatch, useSelector } from "react-redux";
import { setToRender } from "../redux/features/ComponentsRender.slice";

const SideBar = () => {
  return (
    <div className="flex gap-6 flex-col">
      {SideBarItems.map((item) => (
        <Item item={item} />
      ))}
    </div>
  );
};

const Item = ({ item }) => {
  const dispatch = useDispatch();
  const toRender = useSelector((state) => state.components.toRender);
  const handleOnClick = (action) => {
    dispatch(setToRender(action));
  };

  const text = item.text;
  const action = item.action;

  return (
    <div
      className={`bg-secondary/80 border-2 hover:bg-secondary cursor-pointer transition duration-300 py-3 text-lg text-center font-semibold rounded-lg  hover:border-neutral hover:shadow-2xl ${
        toRender[action] === true ? "border-primary" : ""
      }`}
      onClick={() => handleOnClick(action)}
    >
      <p>{text}</p>
    </div>
  );
};

export default SideBar;
