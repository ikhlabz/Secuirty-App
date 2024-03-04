import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PatrollingModal from "../components/Modals/PatrollingModal";
import { useDataContext } from "../context/fetch-context";
import { usePostContext } from "../context/send-context";

const Patrolling = () => {
  const { patrollings } = useDataContext();
  const { DeletePatrollingData } = usePostContext();

  function getCharactersTillFirstComma(text) {
    const commaIndex = text.indexOf(",");

    const extractedCharacters = text.substring(0, Math.min(commaIndex));

    return extractedCharacters;
  }

  // Example usage
  return (
    <div className="flex flex-col">
      <div className="flex justify-between text-gray-700 text-center items-center rounded-lg h-16 bg-primary1 mb-5 px-10">
        <h2 className="text-xl antialiased font-bold uppercase">Patrolling</h2>
      </div>
      <div className="overflow-x-auto flex px-2 justify-center transition-opacity ease-in-out duration-500 ">
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-sm text-gray-700 uppercase bg-primary1  ">
              <tr>
                <th scope="col" className="px-3 py-3 text-start">
                  Patrolling Name
                </th>
                <th scope="col" className="px-3 py-3 text-start">
                  Patrolling Area
                </th>
                <th scope="col" className="px-3 py-3 text-center">
                  Checkpoints No.
                </th>
                <th scope="col" className="px-3 py-3 text-center">
                  Assigned To
                </th>
                <th scope="col" className="px-3 py-3 text-center">
                  Checkpoints Details
                </th>
                <th scope="col" className="px-3 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {patrollings.map((item, index) => (
                <tr className="bg-white border-b  " key={index}>
                  <td
                    scope="row"
                    className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {item?.patrollingName}
                  </td>
                  <td
                    scope="row"
                    className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {item?.patrollingArea?.locationName
                      ? getCharactersTillFirstComma(
                          item?.patrollingArea?.locationName
                        )
                      : "No Location Found"}
                  </td>
                  <td
                    scope="row"
                    className="px-3 py-3 text-center font-medium text-gray-900 whitespace-nowrap "
                  >
                    {item?.patrollingCheckpoints?.length}
                  </td>
                  <td
                    scope="row"
                    className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {item?.assingedTo?.length
                      ? item?.assingedTo?.map(
                          (ele) => `${ele.firstName} ${ele.lastName}, `
                        )
                      : "Not Assigned"}
                  </td>
                  <td
                    scope="row"
                    className="px-3 py-3 text-center font-medium text-gray-900 whitespace-nowrap "
                  >
                    <Link to={"/patrolling/" + item._id}>
                      <button className="px-3 py-2 rounded-md text-slate-100 font-bold bg-primary1">
                        View
                      </button>
                    </Link>
                  </td>
                  <th
                    scope="row"
                    className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap "
                  >
                    <PatrollingModal
                      title={"Update"}
                      q1={"Patrolling Name"}
                      q2={"Patrolling Area"}
                      q3={"Patrolling Status"}
                      q4={"Location Name"}
                      q5={"Assigned To"}
                      q6={"CheckPoints"}
                      value={item}
                      id={item._id}
                    />
                    <button
                      onClick={() => DeletePatrollingData(item._id)}
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

export default Patrolling;
