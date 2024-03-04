import React, { useState, useEffect } from "react";
import Avatar from "../assets/avatar.png";
import { useDataContext } from "../context/fetch-context";
import { usePostContext } from "../context/send-context";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Chip, Select, MenuItem, Box } from "@mui/material";
import * as Yup from "yup";
import moment from "moment";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

const SingleShift = () => {
  const { locations, guards } = useDataContext();
  const { PostShiftData } = usePostContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    shiftName: "",
    shiftStartTime: "",
    shiftEndTime: "",
    lunchStartTime: "",
    lunchEndTime: "",
    locations: "",
    guards: "",
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (data) => {
    await PostShiftData(data);
    formik.resetForm();
    navigate("/shifts");
  };

  const AddShiftSchema = Yup.object({
    shiftName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Shift Name is Required"),
    locations: Yup.string().required("Location is Required"),
    shiftStartTime: Yup.date().required("Shift Start-Time is Required"),
    shiftEndTime: Yup.date()
      .min(
        Yup.ref("shiftStartTime"),
        "Shift End-Time must be after Starting Time"
      )
      .required("Shift End-Time is Required"),
    lunchStartTime: Yup.string()
      .test(
        "min",
        "Time must be Between Shift Starting/Ending Time",
        function (value) {
          const { shiftStartTime } = this.parent;
          return moment(value, "HH:mm").isSameOrAfter(
            moment(shiftStartTime, "HH:mm")
          );
        }
      )
      .test(
        "max",
        "Time must be Between Shift Starting/Ending Time",
        function (value) {
          const { shiftEndTime } = this.parent;
          return moment(value, "HH:mm").isSameOrBefore(
            moment(shiftEndTime, "HH:mm")
          );
        }
      ),
    lunchEndTime: Yup.string()
      .test(
        "min",
        "Time must be Between Shift Starting/Ending Time",
        function (value) {
          const { shiftStartTime } = this.parent;
          return moment(value, "HH:mm").isSameOrAfter(
            moment(shiftStartTime, "HH:mm")
          );
        }
      )
      .test(
        "max",
        "Time must be Between Shift Starting/Ending Time",
        function (value) {
          const { shiftEndTime } = this.parent;
          return moment(value, "HH:mm").isSameOrBefore(
            moment(shiftEndTime, "HH:mm")
          );
        }
      )
      .test(
        "min-lunchtime",
        "End Time must be After Lunch Starting Time",
        function (value) {
          const { lunchStartTime } = this.parent;
          return moment(value, "HH:mm").isSameOrAfter(
            moment(lunchStartTime, "HH:mm")
          );
        }
      ),
  });

  const formik = useFormik({
    initialValues: {
      shiftName: "",
      shiftStartTime: "",
      shiftEndTime: "",
      lunchStartTime: "",
      lunchEndTime: "",
      locations: "",
      guards: "",
    },
    validationSchema: AddShiftSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <div
      className={`transition-opacity ease-in-out duration-500 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex items-center w-90 rounded-lg h-16 bg-primary1 mb-2 pl-10">
        <h2 className="text-xl text-gray-700 antialiased font-bold uppercase">
          Create Shift
        </h2>
      </div>

      <div className="mt-5 px-5 rounded-lg flex gap-20 ">
        <div className="flex-1 bg-primary1 p-3 rounded-lg">
          <h2 className=" pb-3 text-xl capitalize font-bold text-gray-700">
            Enter the Data
          </h2>
          <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
            <input
              type="text"
              name="shiftName"
              placeholder={"Shift-Name"}
              value={formik.values.shiftName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="p-3 rounded-lg"
            />
            {formik.touched.shiftName && formik.errors.shiftName && (
              <div className="text-slate-100 ml-1">
                {formik.errors.shiftName}
              </div>
            )}
            <select
              name="locations"
              value={formik.values.locations}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="p-3 rounded-lg"
            >
              <option value="">Select Location</option>
              {locations.map((item, index) => (
                <option key={index} value={item._id}>
                  {item.locationName.substring(0, 40) + "..."}
                </option>
              ))}
            </select>
            {formik.touched.locations && formik.errors.locations && (
              <div className="text-slate-100 ml-1">
                {formik.errors.locations}
              </div>
            )}
            <div className="flex w-full items-center">
              <p className="text-base pl-3 w-1/4 font-bold">
                Shift Start Time:{" "}
              </p>
              <input
                type="datetime-local"
                placeholder="Shift StartTime"
                name="shiftStartTime"
                className="p-3 ml-2 rounded-lg w-3/4"
                value={formik.values.shiftStartTime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.shiftStartTime && formik.errors.shiftStartTime && (
              <div className="text-slate-100 ml-1">
                {formik.errors.shiftStartTime}
              </div>
            )}
            <div className="flex w-full items-center">
              <p className="text-base pl-3 w-1/4 font-bold">Shift End Time:</p>
              <input
                type="datetime-local"
                name="shiftEndTime"
                placeholder="Shift StartTime"
                className="p-3 ml-2 rounded-lg w-3/4"
                value={formik.values.shiftEndTime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.shiftEndTime && formik.errors.shiftEndTime && (
              <div className="text-slate-100 ml-1">
                {formik.errors.shiftEndTime}
              </div>
            )}
            <div className="flex w-full items-center">
              <p className="text-base pl-3 w-1/4 font-bold">
                Lunch Start Time:
              </p>
              <input
                type="time"
                placeholder="Lunch StartTime"
                name="lunchStartTime"
                className="p-3 ml-2 rounded-lg w-3/4"
                value={formik.values.lunchStartTime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.lunchStartTime && formik.errors.lunchStartTime && (
              <div className="text-slate-100 ml-1">
                {formik.errors.lunchStartTime}
              </div>
            )}
            <div className="flex w-full items-center">
              <p className="text-base pl-3 w-1/4 font-bold">Lunch End Time:</p>
              <input
                type="time"
                placeholder="Lunch EndTime"
                className="p-3 ml-2 rounded-lg w-3/4"
                name="lunchEndTime"
                value={formik.values.lunchEndTime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.lunchEndTime && formik.errors.lunchEndTime && (
              <div className="text-slate-100 ml-1">
                {formik.errors.lunchEndTime}
              </div>
            )}
            <div className="flex w-full items-center">
              <p className="text-base pl-3 w-1/4 font-bold">
                Assign Shift to Guards:
              </p>
              <Select
                className="p-3 ml-2 rounded-lg w-3/4 bg-white"
                value={formik.values.guards}
                name="guards"
                onChange={(e) => {
                  formik.setFieldValue("guards", [
                    ...new Set([...formik.values.guards, e.target.value]),
                  ]);
                  // const selectedValue = e.target.value;
                  // setFormData((prevFormData) => ({
                  //   ...prevFormData,
                  //   guards: prevFormData.guards.includes(selectedValue)
                  //     ? prevFormData.guards.filter(
                  //         (value) => value !== selectedValue
                  //       )
                  //     : [...prevFormData.guards, selectedValue],
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
                    {selected?.map((value) => (
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
            </div>
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

export default SingleShift;
