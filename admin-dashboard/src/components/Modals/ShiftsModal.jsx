import { useState } from "react";
import { useDataContext } from "../../context/fetch-context";
import { usePostContext } from "../../context/send-context";
import { Chip, Select, MenuItem, Box } from "@mui/material";

const ShiftsModal = ({ title, q1, q2, q3, q4, q5, q6, q7, value, id, q8 }) => {
  const { locations, guards } = useDataContext();
  const { UpdateShiftData } = usePostContext();
  const [updatedData, setUpdatedData] = useState({
    shiftName: "",
    locations: [],
    shiftStartTime: "",
    shiftEndTime: "",
    lunchStartTime: "",
    lunchEndTime: "",
    assignedGuards: [],
    shiftStatus: "",
  });
  console.log("Updated Data: ", updatedData);

  const getDateTime = (value) => {
    const date = new Date(value); // Convert timestamp to Date object
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleSubmit = async () => {
    let dataToSend = {
      ...updatedData,
      assignedGuards: [...new Set(updatedData.assignedGuards)],
    };
    await UpdateShiftData(dataToSend);
    setUpdatedData({
      shiftName: "",
      locations: [],
      shiftStartTime: "",
      shiftEndTime: "",
      lunchStartTime: "",
      lunchEndTime: "",
      assignedGuards: [],
      shiftStatus: "",
    });
    document.getElementById(id).close();
  };

  const handleDelete = (value) => {
    setUpdatedData({
      ...updatedData,
      assignedGuards: updatedData.assignedGuards.filter((id) => id !== value),
    });
  };
  console.log("Updated Data: ", updatedData);
  return (
    <>
      <button
        className="px-3 py-2 rounded-md text-slate-100 font-bold bg-green-600"
        onClick={() => {
          setUpdatedData(value);
          document.getElementById(id).showModal();
        }}
      >
        {title}
      </button>
      <dialog id={id} className="modal">
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => document.getElementById(id).close()}
          >
            ✕
          </button>
          <div className="flex flex-col justify-center items-center">
            <h3 className="font-bold text-xl capitalize mb-4">{title}</h3>
            <label className="w-full max-w-xs">
              <div className="label">
                <span className=" font-semibold label-text">{q1}</span>
              </div>
              <input
                type="text"
                value={updatedData?.shiftName}
                placeholder="Type here"
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, shiftName: e.target.value })
                }
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className=" w-full max-w-xs">
              <div className="label">
                <span className="font-semibold label-text">{q2}</span>
              </div>
              <select
                name="locations"
                className="input input-bordered w-full max-w-xs"
                value={
                  updatedData?.locations ? updatedData?.locations[0]?._id : ""
                }
                onChange={(e) =>
                  setUpdatedData({
                    ...updatedData,
                    locations: [e.target.value],
                  })
                }
              >
                <option value="">Select Location</option>
                {locations.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.locationName.substring(0, 40) + "..."}
                  </option>
                ))}
              </select>
              {/* <input
                type="datetime-local"
                value={
                  updatedData?.shiftStartTime
                    ? getDateTime(updatedData?.shiftStartTime)
                    : ""
                }
                onChange={(e) =>
                  setUpdatedData({
                    ...updatedData,
                    shiftStartTime: e.target.value,
                  })
                }
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              /> */}
            </label>
            <label className=" w-full max-w-xs">
              <div className="label">
                <span className="font-semibold label-text">{q3}</span>
              </div>
              <input
                type="datetime-local"
                value={
                  updatedData?.shiftStartTime
                    ? getDateTime(updatedData?.shiftStartTime)
                    : ""
                }
                onChange={(e) =>
                  setUpdatedData({
                    ...updatedData,
                    shiftStartTime: e.target.value,
                  })
                }
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className=" w-full max-w-xs">
              <div className="label">
                <span className="font-semibold label-text">{q4}</span>
              </div>
              <input
                type="datetime-local"
                placeholder="Type here"
                value={
                  updatedData?.shiftEndTime
                    ? getDateTime(updatedData?.shiftEndTime)
                    : ""
                }
                onChange={(e) =>
                  setUpdatedData({
                    ...updatedData,
                    shiftEndTime: e.target.value,
                  })
                }
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className=" w-full max-w-xs">
              <div className="label">
                <span className="font-semibold label-text">{q5}</span>
              </div>
              <input
                type="time"
                value={updatedData?.lunchStartTime}
                onChange={(e) =>
                  setUpdatedData({
                    ...updatedData,
                    lunchStartTime: e.target.value,
                  })
                }
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className=" w-full max-w-xs">
              <div className="label">
                <span className="font-semibold label-text">{q6}</span>
              </div>
              <input
                type="time"
                value={updatedData?.lunchEndTime}
                onChange={(e) =>
                  setUpdatedData({
                    ...updatedData,
                    lunchEndTime: e.target.value,
                  })
                }
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className=" w-full max-w-xs">
              <div className="label">
                <span className="font-semibold label-text">{q8}</span>
              </div>
              <select
                className="input input-bordered w-full max-w-xs"
                onChange={(e) =>
                  setUpdatedData({
                    ...updatedData,
                    assignedGuards: [
                      ...updatedData.assignedGuards,
                      e.target.value,
                    ],
                  })
                }
                value={
                  updatedData.assignedGuards[
                    updatedData.assignedGuards.length - 1
                  ]
                }
              >
                <option value="">No Guards Assigned</option>
                {guards.map((ele, i) => (
                  <option key={i} value={ele._id}>
                    {ele.firstName} {ele.lastName}
                  </option>
                ))}
              </select>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 0.5,
                  backgroundColor: "#fff",
                  marginTop: "20px",
                  marginBottom: "10px",
                }}
              >
                {[...new Set(updatedData.assignedGuards)].map((value) => (
                  <Chip
                    key={value}
                    onDelete={() => handleDelete(value)}
                    label={
                      guards.find((item) => item._id === value)?.firstName +
                      " " +
                      guards.find((item) => item._id === value)?.lastName
                    }
                  />
                ))}
              </Box>
            </label>
            <label className=" w-full max-w-xs">
              <div className="label">
                <span className="font-semibold label-text">{q7}</span>
              </div>
              <select
                className="input input-bordered w-full max-w-xs"
                onChange={(e) =>
                  setUpdatedData({
                    ...updatedData,
                    shiftStatus: e.target.value,
                  })
                }
                value={updatedData?.shiftStatus}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </label>
            <div className="mt-3 max-w-xs gap-3 justify-end flex w-full">
              <label>
                <button
                  onClick={handleSubmit}
                  className="btn btn-success font-bold uppercase"
                >
                  Update
                </button>
              </label>
              <label>
                <button
                  onClick={() => document.getElementById(id).close()}
                  className="btn btn-error text-slate-100 font-bold uppercase"
                >
                  cancel
                </button>
              </label>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ShiftsModal;
