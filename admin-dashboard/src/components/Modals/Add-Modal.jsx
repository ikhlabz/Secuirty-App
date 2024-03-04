import React from "react";

const AddModal = ({ title, q1, q2, q3, q4, q5, values }) => {
  console.log(values);
  return (
    <>
      <button
        className="btn text-sm btn-success antialiased font-bold uppercase text-slate-100"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        {title}
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="flex flex-col justify-center items-center">
            <h3 className="font-bold text-lg capitalize mb-4">{title}</h3>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">{q1}</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">{q2}</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">{q3}</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">{q4}</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>

            {q5 === "Image" && (
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">{q5}</span>
                </div>
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                />
              </label>
            )}
            <label className="form-control w-full max-w-xs mt-5">
              <button className="btn btn-success font-bold uppercase">
                Add
              </button>
            </label>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AddModal;
