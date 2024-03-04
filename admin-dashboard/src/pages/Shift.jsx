import React, { useEffect, useState } from "react";
import { shiftDataArray } from "../../data";
import { Link } from "react-router-dom";
import ShiftsModal from "../components/Modals/ShiftsModal";
import { useDataContext } from "../context/fetch-context";
import { usePostContext } from "../context/send-context";
import moment from "moment";

const Shift = () => {
  const { shifts } = useDataContext();
  const { DeleteShiftData } = usePostContext();

  return (
    <div className="flex flex-col">
      <div className="flex text-gray-700 justify-between text-center items-center rounded-lg h-16 bg-primary1 mb-5 px-10">
        <h2 className="text-xl antialiased  font-bold uppercase ">Shifts</h2>
      </div>
      <div className="overflow-x-auto flex px-2 justify-center transition-opacity ease-in-out duration-500 ">
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-sm  text-gray-700 uppercase bg-primary1  ">
              <tr className="">
                <th scope="col" className="px-3 py-3 text-center">
                  Shift Name
                </th>
                <th scope="col" className="px-3 py-3 text-center">
                  Shift Start-Time
                </th>
                <th scope="col" className="px-3 py-3 text-center">
                  Shift End-Time
                </th>
                <th scope="col" className="px-3 py-3 text-center">
                  Details
                </th>
                <th scope="col" className="px-3 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {shifts.map((item, index) => (
                <tr className="bg-white border-b  " key={index}>
                  <td
                    scope="row"
                    className="px-3 py-3 font-medium  whitespace-nowrap "
                  >
                    {item.shiftName}
                  </td>
                  <td
                    scope="row"
                    className="px-3 py-3 font-medium  whitespace-nowrap "
                  >
                    {moment.utc(item.shiftStartTime).format("lll")}
                  </td>
                  <td
                    scope="row"
                    className="px-3 py-3 font-medium  whitespace-nowrap "
                  >
                    {moment.utc(item.shiftEndTime).format("lll")}
                  </td>
                  <td
                    scope="row"
                    className="px-3 py-3 font-medium  whitespace-nowrap "
                  >
                    <Link to={"/shift/" + item._id}>
                      <button className="px-3 py-2 rounded-md text-slate-100 font-bold bg-primary1">
                        View
                      </button>
                    </Link>
                  </td>
                  <th
                    scope="row"
                    className="px-3 py-3 font-medium  whitespace-nowrap  "
                  >
                    <ShiftsModal
                      title={"Update"}
                      q1={"Shift Name"}
                      q2={"Shift Location"}
                      q3={"Shift Start-Time"}
                      q4={"Shift End-Time"}
                      q5={"Lunch Start-Time"}
                      q6={"Lunch End-Time"}
                      q7={"Shift Status"}
                      q8={"Assign To"}
                      value={item}
                      id={item._id}
                    />

                    <button
                      onClick={() => DeleteShiftData(item._id)}
                      className="px-3 py-2 rounded-md text-slate-100 font-bold bg-red-500 ml-4"
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Shift;

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
