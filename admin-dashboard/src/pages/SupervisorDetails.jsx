import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import img from "../assets/avatar.png";

export const SupervisorDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [supervisorDetails, setSupervisorDetails] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getSupervisorDetails = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://147.182.235.79:5000/api/v1/supervisor/get-supervisor/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              //   Origin: "Whitelisted Origin",
            },
          }
        );
        setSupervisorDetails(data?.data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getSupervisorDetails();
  }, [id]);

  return (
    <div>
      <div className="flex justify-between text-center items-center  w-90 rounded-lg h-16 bg-primary1 mb-4 px-10 ">
        <h2 className="text-xl antialiased font-bold uppercase">
          Supervisor Details
        </h2>
        {supervisorDetails && loading ? (
          <h2 className="text-lg antialiased  font-bold uppercase">
            Loading...
          </h2>
        ) : (
          <h2 className="text-lg antialiased  font-bold uppercase">
            Supervisor Details fetched
          </h2>
        )}
      </div>
      <div className="overflow-x-auto rounded-lg transition-opacity ease-in-out mt-5 duration-500 px-5">
        <div className="flex w-full border border-gray-700 overflow-hidden rounded-lg ">
          <div className="w-2/5 min-h-full bg-primary1 flex items-center justify-center">
            <div className="flex max-h-60 py-4 h-full items-center w-full justify-center">
              <img
                src={img}
                alt="checkpoint"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div className="w-3/5">
            <div className="flex w-full items-center bg-primary1 justify-center py-2">
              <h2 className="text-lg uppercase font-semibold">supervisor</h2>
            </div>
            <div className="flex w-full items-center justify-center pt-3 pl-3">
              <div className="w-[30%]  flex items-start justify-start ">
                <h2 className="text-lg font-semibold">First Name:</h2>
              </div>
              <div className="w-[70%] flex items-start justify-start ">
                <h2 className="text-lg font-semibold ml-1">Supervisor</h2>
              </div>
            </div>
            <div className="flex w-full items-center justify-center pt-3 pl-3">
              <div className="w-[30%]  flex items-start justify-start ">
                <h2 className="text-lg font-semibold">Last Name:</h2>
              </div>
              <div className="w-[70%]  flex items-start justify-start ">
                <h2 className="text-lg font-semibold ml-1">Account</h2>
              </div>
            </div>
            <div className="flex w-full items-center justify-center pt-3 pl-3">
              <div className="w-[30%]  flex items-start justify-start ">
                <h2 className="text-lg font-semibold">Phone Number:</h2>
              </div>
              <div className="w-[70%]  flex items-start justify-start ">
                <h2 className="text-lg font-semibold ml-1">90032874</h2>
              </div>
            </div>
            <div className="flex w-full items-center justify-center pt-3 pl-3">
              <div className="w-[30%]  flex items-start justify-start ">
                <h2 className="text-lg font-semibold">Email:</h2>
              </div>
              <div className="w-[70%]  flex items-start justify-start ">
                <h2 className="text-lg font-semibold ml-1">
                  supervisor@mail.com
                </h2>
              </div>
            </div>
            <div className="flex w-full items-center justify-center py-3 pl-3">
              <div className="w-[30%]  flex items-start justify-start ">
                <h2 className="text-lg font-semibold">Guards:</h2>
              </div>
              <div className="w-[70%]  flex items-start justify-start ">
                <h2 className="text-lg font-semibold ml-1">
                  Guard, Guard1, Guard Account
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
