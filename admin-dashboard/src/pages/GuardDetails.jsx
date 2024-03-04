import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import img from "../assets/avatar.png";

export const GuardDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [guardDetails, setGuardDetails] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getGuardDetails = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://147.182.235.79:5000/api/v1/users/admin/guard/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              Origin: "Whitelisted Origin",
            },
          }
        );
        if (data.success) {
          setGuardDetails(data.data.guard);
        }
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getGuardDetails();
  }, [id]);
  console.log(guardDetails);
  return (
    <div>
      <div className="flex justify-between text-center items-center  w-90 rounded-lg h-16 bg-primary1 mb-4 px-10 ">
        <h2 className="text-xl antialiased font-bold uppercase">
          Guard Details
        </h2>
        {guardDetails && loading ? (
          <h2 className="text-lg antialiased  font-bold uppercase">
            Loading...
          </h2>
        ) : (
          <h2 className="text-lg antialiased  font-bold uppercase">
            Guard Details fetched
          </h2>
        )}
      </div>
      {guardDetails && (
        <div className="overflow-x-auto rounded-lg transition-opacity ease-in-out mt-5 duration-500 px-5">
          <div className="flex w-full border border-gray-700 overflow-hidden rounded-lg ">
            <div className="w-2/5 min-h-full bg-primary1 flex flex-col items-center justify-center">
              <div className="flex max-h-60 py-4 h-full items-center w-full justify-center">
                <img
                  src={guardDetails?.securityGuardImage?.url || img}
                  alt="checkpoint"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="w-full items-center justify-center flex">
                <a
                  target="_blank"
                  href={guardDetails?.employeePdf?.url}
                  className="bg-[#967222] px-4 py-2 rounded-md font-bold text-slate-100 text-sm"
                >
                  View L.O.E
                </a>
              </div>
            </div>
            <div className="w-3/5">
              <div className="flex w-full items-center bg-primary1 justify-center py-2">
                <h2 className="text-lg uppercase font-semibold">Guard</h2>
              </div>
              <div className="flex w-full items-center justify-center pt-3 pl-3">
                <div className="w-[30%]  flex items-start justify-start ">
                  <h2 className="text-lg font-semibold">First Name:</h2>
                </div>
                <div className="w-[70%] flex items-start justify-start ">
                  <h2 className="text-lg font-semibold ml-1">
                    {guardDetails.firstName}
                  </h2>
                </div>
              </div>
              <div className="flex w-full items-center justify-center pt-3 pl-3">
                <div className="w-[30%]  flex items-start justify-start ">
                  <h2 className="text-lg font-semibold">Last Name:</h2>
                </div>
                <div className="w-[70%]  flex items-start justify-start ">
                  <h2 className="text-lg font-semibold ml-1">
                    {guardDetails.lastName}
                  </h2>
                </div>
              </div>
              <div className="flex w-full items-center justify-center pt-3 pl-3">
                <div className="w-[30%]  flex items-start justify-start ">
                  <h2 className="text-lg font-semibold">Phone Number:</h2>
                </div>
                <div className="w-[70%]  flex items-start justify-start ">
                  <h2 className="text-lg font-semibold ml-1">
                    {guardDetails.phoneNumber}
                  </h2>
                </div>
              </div>
              <div className="flex w-full items-center justify-center pt-3 pl-3">
                <div className="w-[30%]  flex items-start justify-start ">
                  <h2 className="text-lg font-semibold">Email:</h2>
                </div>
                <div className="w-[70%]  flex items-start justify-start ">
                  <h2 className="text-lg font-semibold ml-1">
                    {guardDetails.email}
                  </h2>
                </div>
              </div>
              <div className="flex w-full items-center justify-center pt-3 pl-3">
                <div className="w-[30%]  flex items-start justify-start ">
                  <h2 className="text-lg font-semibold">Default Location:</h2>
                </div>
                <div className="w-[70%]  flex items-start justify-start ">
                  <h2 className="text-lg font-semibold ml-1">
                    {guardDetails.defaultGeoLocation.latitude},{" "}
                    {guardDetails.defaultGeoLocation.longitude}
                  </h2>
                </div>
              </div>
              <div className="flex w-full items-center justify-center py-3 pl-3">
                <div className="w-[30%]  flex items-start justify-start ">
                  <h2 className="text-lg font-semibold">Deafault Radius:</h2>
                </div>
                <div className="w-[70%]  flex items-start justify-start ">
                  <h2 className="text-lg font-semibold ml-1">
                    {guardDetails.defaultRadius}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
