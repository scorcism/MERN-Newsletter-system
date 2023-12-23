import React from "react";
import { StatisticsItems } from "../../../constants/StatsItem";

const Home = () => {
  const date = new Date();

  return (
    <div className="flex flex-col gap-8">
      <StatisticsBox />
      <div className="flex justify-end">
        <div className="tooltip tooltip-primary tooltip-bottom" data-tip={date.toLocaleDateString()}>
          <h3 className="text-[#EFF2C0] font-bold text-lg cursor-pointer">{date.toDateString()}</h3>
        </div>
      </div>
    </div>
  );
};

const StatisticsBox = () => {
  return (
    <div className="flex flex-row  justify-between items-center w-full rounded-lg border-2 border-white py-7 px-7 bg-secondary h-[25vh]">
      <div className="text flex flex-col gap-7 pl-12">
        <h1 className="text-xl font-extrabold">Engagement</h1>
        <p>General Statistics</p>
      </div>
      <div className="flex flex-row justify-between items-center gap-20">
        {StatisticsItems.map((item) => (
          <StatesItem item={item} />
        ))}
      </div>
    </div>
  );
};

// item = {text, value};
const StatesItem = ({ item }) => {
  return (
    <div className="rounded-lg w-44 h-44 flex flex-col justify-center items-center gap-10 bg-[#AAA5A5] border-2 border-transparent hover:border-primary transition-all duration-300 cursor-pointer">
      <h3 className="text-lg font-bold">{item.text}</h3>
      <h3 className="bg-primary px-10 py-3 rounded-lg text-[#FFFFFF]">
        {item.value}+
      </h3>
    </div>
  );
};

export default Home;
