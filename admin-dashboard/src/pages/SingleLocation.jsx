import React, { useState, useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { usePostContext } from "../context/send-context";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const SingleLocation = () => {
  const { PostLocations } = usePostContext();
  const navigate = useNavigate();

  const handleSelect = async (selectedAddress) => {
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      const { lat, lng } = latLng;
      formik.setFieldValue("locationName", selectedAddress);
      formik.setFieldValue("locationAddress", {
        latitude: lat,
        longitude: lng,
      });
    } catch (error) {
      console.error("Error selecting address", error);
    }
  };

  const handleSubmit = async (values) => {
    await PostLocations(values);
    formik.resetForm();
    navigate("/locations");
  };

  const LocationSchema = Yup.object({
    locationName: Yup.string().required("Location Name is Required"),
  });

  const formik = useFormik({
    initialValues: {
      locationName: "",
      locationAddress: {
        latitude: "",
        longitude: "",
      },
    },
    validationSchema: LocationSchema,
    onSubmit: (values) => {
      console.log(values);
      handleSubmit(values);
    },
  });

  return (
    <div className="transition-opacity ease-in-out duration-500 ">
      <div className="flex items-center w-90 rounded-lg h-16 bg-primary1 mb-2 pl-10">
        <h2 className="text-xl text-gray-700 antialiased font-bold uppercase">
          Create location
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
            <PlacesAutocomplete
              value={formik.values.locationName}
              onChange={(val) => formik.setFieldValue("locationName", val)}
              onSelect={handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: "Search Places ...",
                      className: "location-search-input p-3 rounded-lg w-full",
                    })}
                  />
                  <div className="autocomplete-dropdown-container rounded-b-2xl overflow-hidden border">
                    {loading && (
                      <div className="cursor-pointer py-2 px-2 bg-white">
                        Loading...
                      </div>
                    )}
                    {suggestions.map((suggestion) => {
                      const style = {
                        backgroundColor: suggestion.active ? "#DAC0A3" : "#fff",
                      };
                      return (
                        <div
                          className="cursor-pointer py-2 px-2 "
                          key={suggestion.placeId}
                          {...getSuggestionItemProps(suggestion, { style })}
                        >
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
            {formik.errors.locationName && (
              <div className="text-slate-100 ml-1">
                {formik.errors.locationName}
              </div>
            )}
            <input
              type="text"
              placeholder={"Location Latitude"}
              className="p-3 rounded-lg bg-white"
              value={formik.values.locationAddress.latitude}
              disabled
            />
            <input
              type="text"
              placeholder={"Location Longitude"}
              className="p-3 rounded-lg bg-white"
              value={formik.values.locationAddress.longitude}
              disabled
            />
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

export default SingleLocation;
