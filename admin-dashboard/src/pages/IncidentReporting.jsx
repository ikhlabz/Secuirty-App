import React, { useEffect, useState } from "react";
import { shiftDataArray } from "../../data";
import { Link } from "react-router-dom";
import ShiftsModal from "../components/Modals/ShiftsModal";
import { useDataContext } from "../context/fetch-context";

const IncidentReporting = () => {
  const { incidents, fetchIncidentData } = useDataContext();
  const [mounted, setMounted] = useState(false);
  console.log(incidents);

  useEffect(() => {
    setMounted(true);
    fetchIncidentData();
  }, []);
  return (
    <div className="flex flex-col">
      <div className="flex justify-between text-center text-gray-700 items-center rounded-lg h-16 bg-primary1 mb-5 px-10">
        <h2 className="text-xl antialiased font-bold uppercase ">Incidents</h2>
      </div>
      <div className="overflow-x-auto flex px-2 justify-center transition-opacity ease-in-out duration-500 ">
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-sm  text-gray-700 uppercase bg-primary1  ">
              <tr>
                <th scope="col" className="px-3 py-3 text-center">
                  Location
                </th>
                <th scope="col" className="px-3 py-3 text-center">
                  Narative
                </th>
                <th scope="col" className="px-3 py-3 text-center">
                  Security Guard
                </th>
                <th scope="col" className="px-3 py-3 text-center">
                  Posted Date
                </th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {incidents && incidents.length > 0 ? (
                incidents.map((item, index) => (
                  <tr className="bg-white border-b  " key={index}>
                    <td className="px-3 py-3 text-center ">
                      {item.locationDetails}
                    </td>

                    <td className="px-3 py-3 text-center ">{item.narrative}</td>
                    <td className="px-3 py-3 text-center ">
                      {item.securityGuardID?.firstName}{" "}
                      {item.securityGuardID?.lastName}
                    </td>

                    <td className="px-3 py-3 text-center ">{item.updatedAt}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>No data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IncidentReporting;

{
  /* <AddModal
title={"Add Shift"}
q1={"Shift-Name"}
q2={"Shift-StartTime"}
q3={"Shift-EndTime"}
q4={"Shift-Status"}
q5={"Lunch-StartTime"}
q6={"Lunch-EndTime"}
/> */
}
