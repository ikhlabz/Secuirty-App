import React, { useState, useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { usePostContext } from "../context/send-context";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
const SingleIncidentField = () => {
  const { PostIncidentField } = usePostContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fieldName: "",
    fieldType: "",
  });

  const handleSubmit = async (values) => {
    await PostIncidentField(values);
    formik.resetForm();
    navigate("/incidents");
  };

  const AddFieldSchema = Yup.object({
    fieldName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    fieldType: Yup.string().max(50, "Too Long!"),
  });

  const formik = useFormik({
    initialValues: {
      fieldName: "",
      fieldType: "",
    },
    validationSchema: AddFieldSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <div className="transition-opacity ease-in-out duration-500 ">
      <div className="flex items-center w-90 rounded-lg h-16 bg-primary1 mb-2 pl-10">
        <h2 className="text-xl text-gray-700 antialiased font-bold uppercase">
          Create Field
        </h2>
      </div>
      <div className="mt-5 px-5 rounded-lg flex gap-20">
        <div className="flex-1 bg-primary1 px-3 rounded-lg">
          <h2 className="py-4 text-xl capitalize font-bold text-gray-700 ">
            Enter the data
          </h2>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4 pb-4"
          >
            <input
              type="text"
              name="fieldName"
              placeholder={"Field Name"}
              className="p-3 rounded-lg bg-white"
              value={formik.values.fieldName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.fieldName && formik.errors.fieldName && (
              <div className="text-slate-100 ml-1">
                {formik.errors.fieldName}
              </div>
            )}
            <input
              type="text"
              name="fieldType"
              placeholder={"Incident Field Type"}
              className="p-3 rounded-lg bg-white"
              value={formik.values.fieldType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.fieldType && formik.errors.fieldType && (
              <div className="text-slate-100 ml-1">
                {formik.errors.fieldType}
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

export default SingleIncidentField;
