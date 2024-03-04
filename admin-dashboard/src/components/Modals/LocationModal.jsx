import { useEffect, useState } from "react";
import { usePostContext } from "../../context/send-context";

const LocationModal = ({ title, q1, q2, q3, q4, value, id }) => {
  const { UpdateLocations } = usePostContext();
  const [updatedData, setUpdatedData] = useState({
    locationName: "",
    locationAddress: {
      latitude: 24.8946207,
      longitude: 67.0640193,
    },
    locationStatus: "",
  });

  const handleSubmit = async () => {
    await UpdateLocations(updatedData);
    setUpdatedData({
      locationName: "",
      locationAddress: {
        latitude: 24.8946207,
        longitude: 67.0640193,
      },
      locationStatus: "",
    });
    document.getElementById(id).close();
  };
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
                value={updatedData?.locationName}
                placeholder="Type here"
                disabled
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className=" w-full max-w-xs">
              <div className="label">
                <span className="font-semibold label-text">{q2}</span>
              </div>
              <input
                type="text"
                value={updatedData?.locationAddress?.latitude}
                disabled
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className=" w-full max-w-xs">
              <div className="label">
                <span className="font-semibold label-text">{q3}</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                value={updatedData?.locationAddress?.longitude}
                disabled
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className=" w-full max-w-xs">
              <div className="label">
                <span className="font-semibold label-text">{q4}</span>
              </div>
              <select
                className="input input-bordered w-full max-w-xs"
                onChange={(e) =>
                  setUpdatedData({
                    ...updatedData,
                    locationStatus: e.target.value,
                  })
                }
                value={updatedData?.locationStatus}
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

export default LocationModal;
