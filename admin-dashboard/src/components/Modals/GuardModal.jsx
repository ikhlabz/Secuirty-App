import { useEffect, useState } from "react";
import { usePostContext } from "../../context/send-context";

const GuardModal = ({ title, q1, q2, q3, q4, q5, q6, value, id }) => {
  const { UpdateGuardData } = usePostContext();
  const [updatedData, setUpdatedData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    status: "",
  });

  const handleSubmit = async () => {
    await UpdateGuardData(updatedData);
    setUpdatedData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      status: "",
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
                value={updatedData?.firstName}
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
                value={updatedData?.lastName}
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
                disabled
                value={updatedData?.email}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className=" w-full max-w-xs">
              <div className="label">
                <span className="font-semibold label-text">{q4}</span>
              </div>
              <input
                type="text"
                value={updatedData?.phoneNumber}
                onChange={(e) =>
                  setUpdatedData({
                    ...updatedData,
                    phoneNumber: e.target.value,
                  })
                }
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className=" w-full max-w-xs">
              <div className="label">
                <span className="font-semibold label-text">{q5}</span>
              </div>
              <select
                className="input input-bordered w-full max-w-xs"
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, status: e.target.value })
                }
                value={updatedData?.status}
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

export default GuardModal;
