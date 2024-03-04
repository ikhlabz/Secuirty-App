import { useEffect, useState } from "react";
import { usePostContext } from "../../context/send-context";
import { useDataContext } from "../../context/fetch-context";
import { Chip, Select, MenuItem, Box } from "@mui/material";

const PatrollingModal = ({ title, q1, q2, q3, q4, q5, q6, value, id }) => {
  const { UpdatePatrollingData } = usePostContext();
  const { guards, locations } = useDataContext();
  const [updatedData, setUpdatedData] = useState({
    patrollingName: "",
    patrollingStatus: "",
    patrollingArea: {},
    patrollingCheckpoints: [],
    assingedTo: [],
  });
  const [newCheckPoints, setNewCheckPoints] = useState([]);

  const handleSubmit = async () => {
    let data = {
      ...updatedData,
      assingedTo: [...new Set(updatedData.assingedTo)],
    };
    await UpdatePatrollingData(data, newCheckPoints);
    setUpdatedData({
      patrollingName: "",
      patrollingStatus: "",
      patrollingArea: {},
      patrollingCheckpoints: [],
      assingedTo: [],
    });
    setNewCheckPoints([]);
    document.getElementById(id).close();
  };

  const handleAdd = () => {
    if (newCheckPoints.length < 1) {
      setNewCheckPoints([{ id: 1, checkpointName: "" }]);
    } else {
      setNewCheckPoints((prevData) => {
        return [
          ...newCheckPoints,
          {
            id: newCheckPoints[prevData.length - 1].id + 1,
            checkpointName: "",
          },
        ];
      });
    }
  };
  const updateName = (id, newVal) => {
    setNewCheckPoints((prevData) => {
      const index = prevData.findIndex((item) => item.id === id);
      if (index !== -1) {
        const newData = [...prevData];
        newData[index] = { ...newData[index], checkpointName: newVal };
        return newData;
      }
      return prevData;
    });
  };
  const removeNewValue = (objectIdToRemove) => {
    if (newCheckPoints.length !== 1) {
      const updatedArray = newCheckPoints.filter(
        (obj) => obj.id !== objectIdToRemove
      );
      setNewCheckPoints(updatedArray);
    }
  };

  const removeValue = (objectIdToRemove) => {
    const updatedArray = updatedData.patrollingCheckpoints.filter(
      (obj) => obj._id !== objectIdToRemove
    );
    setUpdatedData({ ...updatedData, patrollingCheckpoints: updatedArray });
  };

  const handleDelete = (value) => {
    setUpdatedData({
      ...updatedData,
      assingedTo: updatedData.assingedTo.filter((id) => id !== value),
    });
  };

  return (
    <>
      <button
        className="px-3 py-2 rounded-md text-slate-100 font-bold bg-green-600"
        onClick={() => {
          let data = {
            ...value,
            assingedTo: value.assingedTo.map((ele) => ele._id),
          };
          setUpdatedData(data);
          // setFilteredData(value.assingedTo);

          document.getElementById(id).showModal();
        }}
      >
        {title}
      </button>
      <dialog id={id} className="modal">
        <div className="modal-box ">
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
                value={updatedData?.patrollingName}
                onChange={(e) =>
                  setUpdatedData({
                    ...updatedData,
                    patrollingName: e.target.value,
                  })
                }
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className=" w-full max-w-xs">
              <div className="label">
                <span className="font-semibold label-text">{q2}</span>
              </div>
              <select
                className="input input-bordered w-full max-w-xs"
                onChange={(e) =>
                  setUpdatedData({
                    ...updatedData,
                    patrollingArea: e.target.value,
                  })
                }
                value={updatedData?.patrollingArea?._id}
              >
                {locations.map((ele, i) => (
                  <option key={i} value={ele._id}>
                    {ele.locationName.split(",")[0]}
                  </option>
                ))}
              </select>
            </label>
            <label className=" w-full max-w-xs">
              <div className="label">
                <span className="font-semibold label-text">{q3}</span>
              </div>
              <select
                className="input input-bordered w-full max-w-xs"
                onChange={(e) =>
                  setUpdatedData({
                    ...updatedData,
                    patrollingStatus: e.target.value,
                  })
                }
                value={updatedData?.patrollingStatus}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </label>
            <label className=" w-full max-w-xs">
              <div className="label">
                <span className="font-semibold label-text">{q5}</span>
              </div>
              <select
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => {
                  setUpdatedData({
                    ...updatedData,
                    assingedTo: [...updatedData.assingedTo, e.target.value],
                  });
                }}
                value={
                  updatedData?.assingedTo[updatedData.assingedTo.length - 1]
                }
              >
                {guards.map((ele, i) => {
                  return (
                    <option key={i} value={ele._id}>
                      {ele.firstName} {ele.lastName}
                    </option>
                  );
                })}
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
                {[...new Set(updatedData.assingedTo)].map((value) => (
                  <Chip
                    key={value}
                    onDelete={() => handleDelete(value)}
                    label={
                      value._id
                        ? guards.find((item) => item._id === value._id)
                            ?.firstName +
                          " " +
                          guards.find((item) => item._id === value._id)
                            ?.lastName
                        : guards.find((item) => item._id === value)?.firstName +
                          " " +
                          guards.find((item) => item._id === value)?.lastName
                    }
                  />
                ))}
              </Box>
              {/* <Select
                className="p-3 ml-2 rounded-lg w-full bg-white"
                value={updatedData.assingedTo}
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    assingedTo: prevFormData.assingedTo.includes(selectedValue)
                      ? prevFormData.assingedTo.filter(
                          (value) => value !== selectedValue
                        )
                      : [...prevFormData.assingedTo, selectedValue],
                  }));
                }}
                renderValue={(selected) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 0.5,
                      backgroundColor: "#fff",
                    }}
                  >
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={
                          guards.find((item) => item._id === value).firstName +
                          " " +
                          guards.find((item) => item._id === value).lastName
                        }
                      />
                    ))}
                  </Box>
                )}
                MenuProps={{
                  PaperProps: {
                    style: {
                      zIndex: 500,
                      position: "absolute",
                    },
                  },
                }}
              >
                {guards.map((item, index) => (
                  <MenuItem key={index} value={item._id}>
                    {item.firstName + " " + item.lastName}
                  </MenuItem>
                ))}
              </Select> */}
              {/* <select
                className="input input-bordered w-full max-w-xs"
                onChange={handleAssignedToChange}
                value={updatedData.assingedTo}
                multiple
              >
                {guards.map((guard) => (
                  <option key={guard._id} value={guard._id}>
                    {guard.firstName} {guard.lastName}
                  </option>
                ))}
              </select>
              {updatedData.assingedTo.length > 0 && (
                <div className="mt-2">
                  {updatedData.assingedTo.map((ele) => (
                    <div key={ele._id} className="flex items-center mb-2">
                      <span>
                        {
                          guards.find((guard) => guard._id === ele._id)
                            ?.firstName
                        }{" "}
                        {
                          guards.find((guard) => guard._id === ele._id)
                            ?.lastName
                        }
                      </span>
                      <button
                        className="ml-2 text-red-600"
                        onClick={() => handleRemoveAssignedTo(ele._id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )} */}
            </label>
            <div className=" w-full max-w-xs">
              <div className="label">
                <span className="font-semibold label-text">{q6}</span>
              </div>
              {updatedData?.patrollingCheckpoints?.map((ele, i) => (
                <div
                  key={i}
                  className="w-full flex p-2 items-center border border-gray-500 mb-1 rounded-sm justify-between"
                >
                  <div className="p-2 text-sm">{ele.checkpointName}</div>
                  <button
                    onClick={() => removeValue(ele._id)}
                    className="p-2 text-slate-100 bg-red-700 rounded-sm "
                  >
                    Delete
                  </button>
                </div>
              ))}
              <div className="w-full items-center flex flex-col justify-center">
                {newCheckPoints?.map((ele, i) => (
                  <div
                    key={i}
                    className="w-full flex p-2 items-center border border-gray-500 mb-1 rounded-sm justify-between"
                  >
                    <input
                      placeholder="Checkpoint Name"
                      value={ele.checkpointName}
                      onChange={(e) => updateName(ele.id, e.target.value)}
                      className="p-2 text-sm"
                    />
                    <button
                      onClick={() => removeNewValue(ele.id)}
                      className="p-2 text-slate-100 bg-red-700 rounded-sm "
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={handleAdd}
                className="px-4 py-2 text-slate-100 mt-4 bg-[#0F2C59]  rounded-sm "
              >
                Add
              </button>
            </div>
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

export default PatrollingModal;
