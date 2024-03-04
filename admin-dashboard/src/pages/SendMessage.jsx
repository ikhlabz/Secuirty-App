import React, { useState, useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { usePostContext } from "../context/send-context";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const SendMessage = () => {
  const { PostBroadcastMessage } = usePostContext();

  const handleSubmit = async (values) => {
    await PostBroadcastMessage(values);
    formik.resetForm();
  };

  const SendMessageSchema = Yup.object({
    title: Yup.string()
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
    message: Yup.string()
      .min(2, "Too Short!")
      .max(500, "Too Long!")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      message: "",
    },
    validationSchema: SendMessageSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <div className="transition-opacity ease-in-out duration-500 ">
      <div className="flex items-center w-90 rounded-lg h-16 bg-primary1 mb-2 pl-10">
        <h2 className="text-xl text-gray-700 antialiased font-bold uppercase">
          Send Message
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
              placeholder={"Title"}
              name="title"
              className="p-3 rounded-lg bg-white"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-slate-100 ml-1">{formik.errors.title}</div>
            )}
            <textarea
              rows={8}
              type="text"
              name="message"
              placeholder={"Message"}
              className="p-3 rounded-lg bg-white"
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.message && formik.errors.message && (
              <div className="text-slate-100 ml-1">{formik.errors.message}</div>
            )}
            <button
              type="submit"
              className="font-bold bg-[#0F2C59] text-slate-100 p-3 rounded-lg uppercase"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
