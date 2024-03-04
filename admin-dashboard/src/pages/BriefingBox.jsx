import React, { useEffect, useState } from "react";
import { useDataContext } from "../context/fetch-context";

const BriefingBox = () => {
  const { briefingBox, fetchBriefData } = useDataContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchBriefData();
  }, []);
  return (
    <div className="flex flex-col">
      <div className="flex text-gray-700 justify-between text-center items-center rounded-lg h-16 bg-primary1 mb-5 px-10">
        <h2 className="text-xl antialiased font-bold uppercase ">
          Briefing Box
        </h2>
      </div>
      <div className="overflow-x-auto flex px-2 justify-center transition-opacity ease-in-out duration-500 ">
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-sm  text-gray-700 uppercase bg-primary1  ">
              <tr>
                <th scope="col" className="px-3 py-3 text-center">
                  Message
                </th>
                <th scope="col" className="px-3 py-3 text-center">
                  Posted By
                </th>
                <th scope="col" className="px-3 py-3 text-center">
                  Shift
                </th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {briefingBox && briefingBox.briefs?.length > 0 ? (
                briefingBox.briefs.map((item, index) => (
                  <tr className="bg-white border-b  " key={index}>
                    <td className="px-3 max-w-2xl py-3 text-center ">
                      {item.message}
                    </td>
                    <td className="px-3 py-3 text-center ">
                      {item.postedBy?.firstName}
                    </td>
                    <td className="px-3 py-3 text-center ">
                      {item.shiftID?.shiftName}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No Briefs
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BriefingBox;
