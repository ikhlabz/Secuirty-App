import React, { useState } from "react";
import { usePostContext } from "../context/send-context";
import Avatar from "../assets/avatar.png";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const SingleGuard = () => {
  const { PostSupervisorData } = usePostContext();
  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState(null);

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

  const handleSubmit = async (values) => {
    //e.preventDefault();
    const formData = new FormData();
    formData.set("firstName", values.firstName);
    formData.set("lastName", values.lastName);
    formData.set("email", values.email);
    formData.set("password", values.password);
    formData.set("phoneNumber", values.phoneNumber);
    formData.set("userRole", values.userRole);
    formData.set("file", values.image);
    console.log("Form Data File: ", formData.get("file"));
    await PostSupervisorData(formData);
    setImagePreview(null);
    formik.resetForm();
    setImagePreview(null);
    document.getElementById("file").value = "";
    navigate("/supervisor");
  };

  const AddSuperVisorSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("First Name is Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Last Name is Required"),
    email: Yup.string().email("Invalid email").required("Email is Required"),
    password: Yup.string()
      .min(6, "Minimum 6 Characters")
      .required("Password is Required"),
    phoneNumber: Yup.number()
      .required("Phone Number is Required")
      .max("9999999999", "Max 10 Digits"),
    image: Yup.mixed().required("Image is Required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      userRole: "Supervisor",
      image: null,
    },
    validationSchema: AddSuperVisorSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <>
      <div className="flex items-center w-90 rounded-lg h-16 bg-primary1  pl-10">
        <h2 className="text-xl text-gray-700 antialiased font-bold uppercase">
          Create Supervisor
        </h2>
      </div>
      <div className=" p-10 rounded-lg flex gap-10">
        <div className="min-h-[40%] bg-primary1 px-3 rounded-lg">
          <div className="flex-1 pt-6 rounded-lg flex flex-col justify-center items-center">
            <img
              src={imagePreview || Avatar}
              alt=""
              width={imagePreview ? 300 : 150}
            />
            <label className="bg-[#0F2C59] form-control w-full max-w-xs mt-5">
              <div className="label">
                <span className="label-text text-slate-100 font-bold antialiased">
                  {imagePreview ? "Image Add Successfully" : "Add Image"}
                </span>
              </div>
              <input
                type="file"
                name="image"
                className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                onChange={handleImage}
                id="file"
              />
            </label>
            {formik.touched.image && formik.errors.image && (
              <div className="text-slate-100 ml-1">{formik.errors.image}</div>
            )}
          </div>
        </div>
        <div className="flex-1 bg-primary1 p-3 rounded-lg">
          <h2 className="py-4 text-xl capitalize font-bold text-gray-700">
            Enter the data
          </h2>
          <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
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
              placeholder="Last Name"
              name="lastName"
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
              placeholder="Email"
              name="email"
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
              placeholder="Password"
              value={formik.values.password}
              name="password"
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
              type="number"
              placeholder="Phone"
              value={formik.values.phoneNumber}
              maxLength={10}
              name="phoneNumber"
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
    </>
  );
};

export default SingleGuard;
