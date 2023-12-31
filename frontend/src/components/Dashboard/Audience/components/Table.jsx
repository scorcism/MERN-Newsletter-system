import React, { useEffect, useState } from "react";
import TableBody from "./TableBody";
import { useGetAudienceQuery } from "../../../../redux/service/utilApi";

const Table = () => {
  const [audiences, setAudiences] = useState([]);

  const { data, isError, isLoading, isSuccess } = useGetAudienceQuery();

  useEffect(() => {
    if (isSuccess && !isLoading) {
      setAudiences(data.data);
    }
  }, [isError, isLoading]);

  // console.log("data: ", data);

  return (
    <div className="overflow-x-auto h-full ">
      {isSuccess == true ? (
        <table className="table text-lg border-2 border-accent">
          <thead className="text-lg text-primary">
            <tr>
              <th>Name</th>
              <th>Audience Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {audiences.map((data) => (
              <TableBody data={data} />
            ))}
          </tbody>
        </table>
      ) : (
        <h2>Reload the page</h2>
      )}
    </div>
  );
};

export default Table;
