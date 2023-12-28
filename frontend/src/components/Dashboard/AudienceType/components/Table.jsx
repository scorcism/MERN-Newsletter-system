import React, { useEffect, useState } from "react";
import TableBody from "./TableBody";
import { useGetAudienceTypeQuery } from "../../../../redux/service/utilApi";

const Table = () => {
  const [audienceTypes, setAudienceTypes] = useState([]);

  const { data, isError, isLoading, isSuccess } = useGetAudienceTypeQuery();

  useEffect(() => {
    if (isSuccess && !isLoading) {
      setAudienceTypes(data.data);
    }
  }, [isError, isLoading]);

  console.log("audience: ", audienceTypes);

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
