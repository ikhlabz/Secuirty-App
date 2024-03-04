import React, { useEffect, useState } from "react";
import { locationDataArray } from "../../data";
import { Link } from "react-router-dom";
import LocationModal from "../components/Modals/LocationModal";
import { useDataContext } from "../context/fetch-context";
import { getCharactersTillFirstComma } from "../helper";
import { usePostContext } from "../context/send-context";

const Location = () => {
  const { locations } = useDataContext();
  const { DeleteLocations } = usePostContext();

  return (
    <div className="flex flex-col">
      <div className="flex justify-between text-gray-700 text-center items-center rounded-lg h-16 bg-primary1 mb-5 px-10">
        <h2 className="text-xl antialiased font-bold uppercase ">Locations</h2>
      </div>
      <div className="overflow-x-auto flex px-2 justify-center transition-opacity ease-in-out duration-500 ">
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-sm text-gray-700 uppercase bg-primary1  ">
              <tr>
                <th scope="col" className="px-3 py-3 text-center">
                  Location Name
                </th>
                <th scope="col" className="px-3 py-3 text-start">
                  Location Longitude
                </th>
                <th scope="col" className="px-3 py-3 text-start">
                  Location Latitude
                </th>
                <th scope="col" className="px-3 py-3 text-start">
                  Location Status
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
              {locations.map((item, index) => (
                <tr className="bg-white border-b  " key={index}>
                  <td
                    scope="row"
                    className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap "
                  >
                    <div className="text-center">
                      {getCharactersTillFirstComma(item.locationName)}
                    </div>
                  </td>
                  <td
                    scope="row"
                    className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {item.locationAddress.longitude}
                  </td>
                  <td
                    scope="row"
                    className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {item.locationAddress.latitude}
                  </td>
                  <td
                    scope="row"
                    className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {item.locationStatus}
                  </td>
                  <td
                    scope="row"
                    className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap "
                  >
                    <Link to={"/location/" + item._id}>
                      <button className="px-3 py-2 rounded-md text-slate-100 font-bold bg-primary1">
                        View
                      </button>
                    </Link>
                  </td>
                  <th
                    scope="row"
                    className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <LocationModal
                      title={"Update"}
                      q1={"Location Name"}
                      q2={"Location Latitude"}
                      q3={"Location Longitude"}
                      q4={"Location Status"}
                      value={item}
                      id={item._id}
                    />
                    <button
                      onClick={() => DeleteLocations(item._id)}
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

export default Location;
