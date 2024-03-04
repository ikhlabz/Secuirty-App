import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";

export const PatrollingDetails = () => {
  const { id } = useParams();
  console.log(id);
  const [loading, setLoading] = useState(false);
  const [patrollingDetails, setPatrollingDetails] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getPatrollingDetails = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://147.182.235.79:5000/api/v1/patrolling/get-patrolling/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              //   Origin: "Whitelisted Origin",
            },
          }
        );
        if (data.success) {
          setPatrollingDetails(data.data);
        }
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getPatrollingDetails();
  }, [id]);

  // console.log(patrollingDetails);

  const handleButtonClick = (imageUrl, patrollingName, checkpointName) => {
    fetch(imageUrl, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            `${patrollingName}-${checkpointName}.jpeg`
          ); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // Create a new instance of jsPDF
    // const pdf = new jsPDF({
    //   unit: "px",
    //   format: [800, 600], // Set the desired width and height in pixels
    // });
    // // Add the image to the PDF
    // pdf.addImage(imageUrl, "JPEG", 0, 0, 500, 500); // Adjust the width and height as needed
    // // Save or open the PDF
    // const timeElapsed = Date.now();
    // pdf.save(`checkpointqr-${timeElapsed}.pdf`);
  };
  return (
    <div>
      <div className="flex justify-between text-center items-center  w-90 rounded-lg h-16 bg-primary1 mb-4 px-10 ">
        <h2 className="text-xl antialiased font-bold uppercase">
          Patrolling Details
        </h2>
        {patrollingDetails && loading ? (
          <h2 className="text-lg antialiased  font-bold uppercase">
            Loading...
          </h2>
        ) : (
          <h2 className="text-lg antialiased  font-bold uppercase">
            Patrolling Details fetched
          </h2>
        )}
      </div>
      <div className="overflow-x-auto rounded-lg transition-opacity ease-in-out duration-500 ">
        {patrollingDetails && (
          <div className="flex px-2 flex-col">
            <div className="flex w-full border border-gray-700 rounded-md p-4 flex-col">
              <div className="flex mb-3 py-1 w-full">
                <div className="w-[20%]  flex items-start justify-start ">
                  <h2 className=" text-xl font-bold">Patrolling Name:</h2>
                </div>
                <div className="w-[80%] flex items-start justify-start">
                  <h2 className=" ml-2 text-xl font-bold">
                    {patrollingDetails.patrollingName}
                  </h2>
                </div>
              </div>
              <div className="flex mb-3 py-1 w-full">
                <div className="w-[20%] flex items-start justify-start ">
                  <h2 className=" text-xl font-bold">Patrolling Area:</h2>
                </div>
                <div className="w-[80%] flex items-start justify-start ">
                  <h2 className=" ml-2 text-xl font-bold">
                    {patrollingDetails.patrollingArea.locationAddress.latitude},
                    {patrollingDetails.patrollingArea.locationAddress.longitude}
                  </h2>
                </div>
              </div>
              <div className="flex mb-3 py-1 w-full">
                <div className="w-[20%] flex items-start justify-start ">
                  <h2 className=" text-xl font-bold">Patrolling Status:</h2>
                </div>
                <div className="w-[80%] flex items-start justify-start ">
                  <h2 className=" ml-2 text-xl font-bold">
                    {patrollingDetails.patrollingStatus}
                  </h2>
                </div>
              </div>
              <div className="flex mb-3 py-1 w-full">
                <div className="w-[20%] flex items-start justify-start ">
                  <h2 className=" text-xl font-bold">Location Name:</h2>
                </div>
                <div className="w-[80%] flex items-start justify-start ">
                  <h2 className=" ml-2 text-xl font-bold">
                    {patrollingDetails.patrollingArea.locationName}
                  </h2>
                </div>
              </div>
              <div className="flex mb-3 py-1 w-full">
                <div className="w-[20%] flex items-start justify-start ">
                  <h2 className=" text-xl font-bold">Location Status:</h2>
                </div>
                <div className="w-[80%] flex items-start justify-start ">
                  <h2 className=" ml-2 text-xl font-bold">
                    {patrollingDetails.patrollingArea.locationStatus}
                  </h2>
                </div>
              </div>
              <div className="flex  py-1 w-full">
                <div className="w-[20%] flex items-start justify-start ">
                  <h2 className=" text-xl font-bold">Assigned To:</h2>
                </div>
                <div className="w-[80%] flex items-start justify-start ">
                  <h2 className=" ml-2 text-xl font-bold">
                    {patrollingDetails?.assingedTo?.map(
                      (ele) => `${ele.firstName} ${ele.lastName}, `
                    ) || "None."}
                  </h2>
                </div>
              </div>
            </div>
            <div className="flex mb-2 mt-3 w-full">
              <h2 className=" text-2xl font-bold">CheckPoints:</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full ">
              {patrollingDetails.patrollingCheckpoints.map((item, index) => (
                <div
                  className="flex flex-col justify-center border border-gray-700 overflow-hidden rounded-md mx-2 my-2 items-center"
                  key={index}
                >
                  <div className="flex w-full items-center bg-primary1 justify-center py-2 ">
                    <h2 className="text-lg font-semibold">Checkpoint Name:</h2>
                    <h2 className="text-base font-semibold ml-1">
                      {item.checkpointName}
                    </h2>
                  </div>
                  <div className="flex w-full items-center justify-center pt-3 ">
                    <h2 className="text-base font-semibold">
                      Checkpoint Status:
                    </h2>
                    <h2 className="text-base font-semibold ml-1">
                      {item.checkpointStatus}
                    </h2>
                  </div>
                  <div className="flex w-full items-center justify-center pt-3 ">
                    <h2 className="text-base font-semibold">Completion:</h2>
                    <h2 className="text-base font-semibold ml-1">
                      {item.completed ? "Checked" : "Unchecked"}
                    </h2>
                  </div>
                  <div className="flex w-48 items-center h-48  justify-center  ">
                    <img
                      src={item.checkpointQrCode.secure_url}
                      alt="checkpoint"
                      className="w-full h-full object-fit"
                    />
                  </div>
                  <div className="flex w-full items-center justify-center pb-3 ">
                    <button
                      className="px-4 py-2 bg-primary1 rounded-md font-semibold"
                      onClick={() =>
                        handleButtonClick(
                          item.checkpointQrCode.secure_url,
                          patrollingDetails.patrollingName,
                          item.checkpointName
                        )
                      }
                    >
                      Print Image
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
