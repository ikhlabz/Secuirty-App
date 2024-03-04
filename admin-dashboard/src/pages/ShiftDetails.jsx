import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import img from "../assets/avatar.png";
import Calendar from "react-calendar";
import "../css/calendar.css";
import moment from "moment";
export const ShiftDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [shiftDetails, setShiftDetails] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getShiftDetails = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://147.182.235.79:5000/api/v1/shifts/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              //   Origin: "Whitelisted Origin",
            },
          }
        );
        setShiftDetails(data?.data);
        console.log(data?.data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getShiftDetails();
  }, [id]);

  return (
    <div>
      <div className="flex justify-between text-center items-center  w-90 rounded-lg h-16 bg-primary1 mb-4 px-10 ">
        <h2 className="text-xl antialiased font-bold uppercase">
          Shift Details
        </h2>
        {shiftDetails && loading ? (
          <h2 className="text-lg antialiased  font-bold uppercase">
            Loading...
          </h2>
        ) : (
          <h2 className="text-lg antialiased  font-bold uppercase">
            Shift Details fetched
          </h2>
        )}
      </div>
      <div className="overflow-x-auto rounded-lg transition-opacity ease-in-out duration-500 ">
        {shiftDetails && (
          <div className="flex px-2 flex-col">
            <div className="flex w-full border border-gray-700 rounded-md p-4 flex-col">
              <div className="flex mb-3 py-1 w-full">
                <div className="w-[20%]  flex items-start justify-start ">
                  <h2 className=" text-xl font-bold">Shift Name:</h2>
                </div>
                <div className="w-[80%] flex items-start justify-start">
                  <h2 className=" ml-2 text-xl font-bold">
                    {shiftDetails.shiftName}
                  </h2>
                </div>
              </div>
              <div className="flex mb-3 py-1 w-full">
                <div className="w-[20%]  flex items-start justify-start ">
                  <h2 className=" text-xl font-bold">Location Name:</h2>
                </div>
                <div className="w-[80%] flex items-start justify-start">
                  <h2 className=" ml-2 text-xl font-bold">
                    {shiftDetails?.locations[0]?.locationName}
                  </h2>
                </div>
              </div>
              <div className="flex mb-3 py-1 w-full">
                <div className="w-[20%] flex items-start justify-start ">
                  <h2 className=" text-xl font-bold">Shift Start-Date:</h2>
                </div>
                <div className="w-[80%] flex items-start justify-start ">
                  <h2 className=" ml-2 text-xl font-bold">
                    {new Date(
                      shiftDetails?.shiftStartTime
                    ).toLocaleDateString()}
                  </h2>
                </div>
              </div>
              <div className="flex mb-3 py-1 w-full">
                <div className="w-[20%] flex items-start justify-start ">
                  <h2 className=" text-xl font-bold">Shift End-Date:</h2>
                </div>
                <div className="w-[80%] flex items-start justify-start ">
                  <h2 className=" ml-2 text-xl font-bold">
                    {new Date(shiftDetails?.shiftEndTime).toLocaleDateString()}
                  </h2>
                </div>
              </div>
              <div className="flex mb-3 py-1 w-full">
                <div className="w-[20%] flex items-start justify-start ">
                  <h2 className=" text-xl font-bold">Shift Start-Timing:</h2>
                </div>
                <div className="w-[80%] flex items-start justify-start ">
                  <h2 className=" ml-2 text-xl font-bold">
                    {moment.utc(shiftDetails.shiftStartTime).format("LT")}
                  </h2>
                </div>
              </div>
              <div className="flex mb-3 py-1 w-full">
                <div className="w-[20%] flex items-start justify-start ">
                  <h2 className=" text-xl font-bold">Shift End-Timing:</h2>
                </div>
                <div className="w-[80%] flex items-start justify-start ">
                  <h2 className=" ml-2 text-xl font-bold">
                    {moment.utc(shiftDetails?.shiftEndTime).format("LT")}
                  </h2>
                </div>
              </div>
              <div className="flex mb-3 py-1 w-full">
                <div className="w-[20%] flex items-start justify-start ">
                  <h2 className=" text-xl font-bold">Lunch Start-Time:</h2>
                </div>
                <div className="w-[80%] flex items-start justify-start ">
                  <h2 className=" ml-2 text-xl font-bold">
                    {shiftDetails.lunchStartTime}
                  </h2>
                </div>
              </div>
              <div className="flex mb-3 py-1 w-full">
                <div className="w-[20%] flex items-start justify-start ">
                  <h2 className=" text-xl font-bold">Lunch End-Time:</h2>
                </div>
                <div className="w-[80%] flex items-start justify-start ">
                  <h2 className=" ml-2 text-xl font-bold">
                    {shiftDetails.lunchEndTime}
                  </h2>
                </div>
              </div>
              <div className="flex  py-1 w-full">
                <div className="w-[20%] flex items-start justify-start ">
                  <h2 className=" text-xl font-bold">Shift Status:</h2>
                </div>
                <div className="w-[80%] flex items-start justify-start ">
                  <h2 className=" ml-2 text-xl font-bold">
                    {shiftDetails.shiftStatus}
                  </h2>
                </div>
              </div>
              <div className="flex  py-1 w-full">
                <div className="w-[20%] flex items-start justify-start ">
                  <h2 className=" text-xl font-bold">Assigned Guards:</h2>
                </div>
                <div className="w-[80%] flex items-start justify-start ">
                  <h2 className=" ml-2 text-xl font-bold">
                    {shiftDetails?.assignedGuards?.map(
                      (guard) => `${guard.firstName} ${guard.lastName}, `
                    )}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* <Calendar
          tileClassName="p-3  bg-gray-100"
          value={["2024-2-2", "2024-2-5"]}
          next2Label={null}
          prev2Label={null}
          className="min-h-max rounded-lg border flex flex-col border-gray-400 overflow-hidden"
          tileContent={({ date, view }) => {
            if (view === "month") {
              if (date.getDate() === 2) {
                return (
                  <div className="flex flex-col items-center">
                    <h2 className="text-xl font-bold">Shift Start</h2>
                    <h2 className="text-xl font-bold">10:00 AM</h2>
                  </div>
                );
              }
              if (date.getDate() === 5) {
                return (
                  <div className="flex flex-col items-center">
                    <h2 className="text-xl font-bold">Shift End</h2>
                    <h2 className="text-xl font-bold">06:00 AM</h2>
                  </div>
                );
              }
            }
          }}
        /> */}
    </div>
  );
};
