import React, { useEffect, useState } from "react";
import TableBody from "./TableBody";
import { useGetAudienceQuery } from "../../../../redux/service/utilApi";

const datas = [
  {
    id: "1ajsgasa75s7a6sas",
    name: "HTML",
  },
  {
    id: "2ajsgasa75s7a6sas",
    name: "CSS",
  },
  {
    id: "3ajsgasa75s7a6sas",
    name: "JS",
  },
  {
    id: "4ajsgasa75s7a6sas",
    name: "PHP",
  },
  {
    id: "5ajsgasa75s7a6sas",
    name: "MYSQL",
  },
];

const Table = () => {
  const [audienceTypes, setAudienceTypes] = useState([]);

  const { data, isError, isLoading, isSuccess } = useGetAudienceQuery();

  useEffect(() => {
    if (isSuccess && !isLoading) {
      setAudienceTypes(data.data);
    }
  }, [isError, isLoading]);

  return (
    <div className="overflow-x-auto h-full ">
      <table className="table text-lg border-2 border-accent ">
        <thead className="text-lg text-primary">
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {audienceTypes.map((data) => (
            <TableBody data={data} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
