import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const LocationDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [locationDetails, setLocationDetails] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getLocationDetails = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://147.182.235.79:5000/api/v1/locations/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              //   Origin: "Whitelisted Origin",
            },
          }
        );
        if (data.success) {
          setLocationDetails(data.data);
        }
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getLocationDetails();
  }, [id]);

  return (
    <div>
      <div className="flex justify-between text-center items-center  w-90 rounded-lg h-16 bg-primary1 mb-4 px-10 ">
        <h2 className="text-xl antialiased font-bold uppercase">
          Location Details
        </h2>
        {locationDetails && loading ? (
          <h2 className="text-lg antialiased  font-bold uppercase">
            Loading...
          </h2>
        ) : (
          <h2 className="text-lg antialiased  font-bold uppercase">
            Location Details fetched
          </h2>
        )}
      </div>
      {locationDetails && (
        <div className="overflow-x-auto rounded-lg transition-opacity ease-in-out mt-5 duration-500 px-5">
          <div className="flex w-full border border-gray-700 rounded-md p-4 flex-col">
            <div className="flex mb-3 py-1 w-full">
              <div className="w-[30%]  flex items-start justify-start ">
                <h2 className=" text-xl font-bold">Location Name:</h2>
              </div>
              <div className="w-[70%] flex items-start justify-start">
                <h2 className=" ml-2 text-xl font-bold">
                  {locationDetails.locationName}
                </h2>
              </div>
            </div>
            <div className="flex mb-3 py-1 w-full">
              <div className="w-[30%] flex items-start justify-start ">
                <h2 className=" text-xl font-bold">Location Latitude:</h2>
              </div>
              <div className="w-[70%] flex items-start justify-start ">
                <h2 className=" ml-2 text-xl font-bold">
                  {locationDetails.locationAddress.latitude}
                </h2>
              </div>
            </div>
            <div className="flex py-1 w-full">
              <div className="w-[30%] flex items-start justify-start ">
                <h2 className=" text-xl font-bold">Location Longitude:</h2>
              </div>
              <div className="w-[70%] flex items-start justify-start ">
                <h2 className=" ml-2 text-xl font-bold">
                  {locationDetails.locationAddress.longitude}
                </h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
