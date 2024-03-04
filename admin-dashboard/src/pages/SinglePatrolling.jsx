import React, { useState, useEffect } from "react";
import { useDataContext } from "../context/fetch-context";
import { usePostContext } from "../context/send-context";
import { useNavigate } from "react-router-dom";
import { Chip, Select, MenuItem, Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

const SinglePatrolling = () => {
  const { guards, locations } = useDataContext();
  const { PostPatrollingData } = usePostContext();
  const navigate = useNavigate();
  const [checkpoint, setCheckpoints] = useState([
    { id: 1, checkpointName: "" },
  ]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (values) => {
    await PostPatrollingData(values, checkpoint);
    formik.resetForm();
    setCheckpoints([{ id: 1, checkpointName: "" }]);
    navigate("/patrolling");
  };

  const updateName = (id, newVal) => {
    setCheckpoints((prevData) => {
      const index = prevData.findIndex((item) => item.id === id);
      if (index !== -1) {
        const newData = [...prevData];
        newData[index] = { ...newData[index], checkpointName: newVal };
        return newData;
      }
      return prevData;
    });
  };
  const removeValue = (objectIdToRemove) => {
    if (checkpoint.length !== 1) {
      const updatedArray = checkpoint.filter(
        (obj) => obj.id !== objectIdToRemove
      );
      setCheckpoints(updatedArray);
    }
  };

  const PatrollingSchema = Yup.object({
    patrollingName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Patrolling Name is Required"),
    patrollingArea: Yup.string().required("Patrolling Area is Required"),
  });

  const formik = useFormik({
    initialValues: {
      patrollingName: "",
      patrollingArea: "",
      assignedTo: "",
      patrollingCheckpoints: checkpoint,
    },
    validationSchema: PatrollingSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <div
      className={`transition-opacity ease-in-out duration-500  ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex items-center w-90 rounded-lg h-16 bg-primary1 mb-2 pl-10">
        <h2 className="text-xl text-gray-700 antialiased font-bold uppercase">
          Create Patrolling
        </h2>
      </div>

      <div className="mt-5 rounded-lg flex gap-20 ">
        <div className="flex-1 bg-primary1 p-3 rounded-lg">
          <h2 className=" pb-3 text-xl capitalize font-bold text-gray-700">
            Enter the Data
          </h2>
          <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
            <input
              type="text"
              placeholder={"Patrolling Name"}
              name="patrollingName"
              className="p-3 rounded-lg"
              value={formik.values.patrollingName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.patrollingName && formik.errors.patrollingName && (
              <div className="text-slate-100 ml-1">
                {formik.errors.patrollingName}
              </div>
            )}
            <select
              className="p-3 rounded-lg"
              name="patrollingArea"
              value={formik.values.patrollingArea}
              placeholder="Patrolling Area"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Patrolling Area</option>
              {locations.map((elem, i) => (
                <option key={i} value={elem._id}>
                  {elem.locationName}
                </option>
              ))}
            </select>
            {formik.touched.patrollingArea && formik.errors.patrollingArea && (
              <div className="text-slate-100 ml-1">
                {formik.errors.patrollingArea}
              </div>
            )}
            <Select
              className="p-3 rounded-lg w-full bg-white"
              value={formik.values.assignedTo}
              onChange={(e) => {
                formik.setFieldValue("assignedTo", [
                  ...new Set([...formik.values.assignedTo, e.target.value]),
                ]);
                // const selectedValue = e.target.value;
                // setFormData((prevFormData) => ({
                //   ...prevFormData,
                //   assignedTo: prevFormData.assignedTo.includes(selectedValue)
                //     ? prevFormData.assignedTo.filter(
                //         (value) => value !== selectedValue
                //       )
                //     : [...prevFormData.assignedTo, selectedValue],
                // }));
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
              MenuProps={MenuProps}
            >
              {guards.map((item, index) => (
                <MenuItem key={index} value={item._id}>
                  {item.firstName + " " + item.lastName}
                </MenuItem>
              ))}
            </Select>
            <p className="font-bold  uppercase pl-2 text-lg">Checkpoints</p>
            <div className="w-full flex gap-y-3 flex-col  ">
              {checkpoint.map((elem, i) => (
                <div
                  className="flex justify-around items-center px-2"
                  key={elem.id}
                >
                  <div
                    onClick={() => removeValue(elem.id)}
                    className="font-bold cursor-pointer bg-[#0F2C59] text-slate-100 px-3 py-2 rounded-lg uppercase"
                  >
                    Remove
                  </div>
                  <input
                    type="text"
                    placeholder={"Checkpoint Name"}
                    name="checkpointName"
                    className="p-3 rounded-lg w-3/5"
                    value={elem.checkpointName}
                    onChange={(e) => updateName(elem.id, e.target.value)}
                  />
                  <div
                    onClick={() =>
                      setCheckpoints((prevData) => {
                        return [
                          ...checkpoint,
                          {
                            id: checkpoint[prevData.length - 1].id + 1,
                            checkpointName: "",
                          },
                        ];
                      })
                    }
                    className="font-bold cursor-pointer bg-[#0F2C59] text-slate-100 px-3 py-2  rounded-lg uppercase"
                  >
                    Add
                  </div>
                </div>
              ))}
            </div>
            {formik.errors.patrollingCheckpoints && (
              <div className="text-slate-100 ml-1">
                {formik.errors.patrollingCheckpoints}
              </div>
            )}
            <button
              type="submit"
              className="font-bold bg-[#0F2C59] text-slate-100 p-3 rounded-lg uppercase"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SinglePatrolling;
