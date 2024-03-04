import React, { useState, useEffect } from "react";
import { usePostContext } from "../context/send-context";
import Avatar from "../assets/avatar.png";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../context/fetch-context";

const SingleGuard = () => {
  const { PostGuardData } = usePostContext();
  const { guards } = useDataContext();
  const navigate = useNavigate();

  const [mounted, setMounted] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [pdfPreview, setPdfPreview] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleImage = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    formik.setFieldValue("image", e.target.files[0]);
  };

  const handlePdf = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPdfPreview(true);
      }
    };
    formik.setFieldValue("pdf", e.target.files[0]);
  };

  const handleSubmit = async (values) => {
    // e.preventDefault();
    const formData = new FormData();
    formData.set("firstName", values.firstName);
    formData.set("lastName", values.lastName);
    formData.set("email", values.email);
    formData.set("password", values.password);
    formData.set("phoneNumber", values.phoneNumber);
    formData.set("file", values.image);
    formData.set("pdf", values.pdf);
    await PostGuardData(formData);
    formik.resetForm();
    setImagePreview(null);
    document.getElementById("file").value = "";
    navigate("/guards");
  };

  const AddGuardSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Minimum 6 Characters").required("Required"),
    phoneNumber: Yup.number()
      .max(9999999999, "Max 10 Digits")
      .required("Required"),
    image: Yup.mixed().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      image: "",
      pdf: "",
    },
    validationSchema: AddGuardSchema,
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
          Create Guard
        </h2>
      </div>
      <div className="mt-5 px-5 rounded-lg flex gap-10">
        <div className="min-h-[40%] bg-primary1 px-3 rounded-lg">
          <div className="flex-1 pt-6 rounded-lg flex flex-col justify-center items-center">
            <img
              src={imagePreview || Avatar}
              alt=""
              width={imagePreview ? 250 : 150}
              className="rounded-lg"
            />
            {formik.touched.image && formik.errors.image && (
              <div className="text-slate-100 ml-1">{formik.errors.image}</div>
            )}
            <label className="bg-[#0F2C59] form-control w-full max-w-xs mt-5 flex flex-col items-center">
              <div className="label">
                <span className="label-text text-slate-100 font-bold antialiased">
                  {imagePreview ? "Image Add Successfully" : "Add Image"}
                </span>
              </div>
              <input
                type="file"
                name="file"
                className="file-input file-input-bordered file-input-sm w-full max-w-xs mb-2"
                onChange={handleImage}
                id="file"
              />
            </label>
            <label className="bg-[#0F2C59] form-control w-full max-w-xs mt-5 flex flex-col items-center">
              <div className="label">
                <span className="label-text text-slate-100 font-bold antialiased">
                  {pdfPreview ? "PDF Add Successfully" : "Add PDF"}
                </span>
              </div>
              <input
                type="file"
                name="pdf"
                className="file-input file-input-bordered file-input-sm w-full max-w-xs mb-2"
                onChange={handlePdf}
                id="pdf"
              />
            </label>
          </div>
        </div>
        <div className="flex-1 bg-primary1 p-3 rounded-lg">
          <h2 className="py-4 text-xl capitalize font-bold text-gray-700">
            Enter the data
          </h2>
          <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formik.values.firstName}
              className="p-3 rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="text-slate-100 ml-1">
                {formik.errors.firstName}
              </div>
            )}
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formik.values.lastName}
              className="p-3 rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="text-slate-100 ml-1">
                {formik.errors.lastName}
              </div>
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              className="p-3 rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-slate-100 ml-1">{formik.errors.email}</div>
            )}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              className="p-3 rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-slate-100 ml-1">
                {formik.errors.password}
              </div>
            )}
            <input
              name="phoneNumber"
              type="text"
              placeholder="Phone"
              value={formik.values.phoneNumber}
              className="p-3 rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <div className="text-slate-100 ml-1">
                {formik.errors.phoneNumber}
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

export default SingleGuard;
