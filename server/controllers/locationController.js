import asyncHandler from "../middleware/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";
import Location from "../models/locationSchema.js";

// @desc   Get all locations
// @route  GET /api/v1/locations

export const getLocations = asyncHandler(async (req, res, next) => {
  const locations = await Location.find({}); // Find all locations

  res.status(200).json({
    success: true,
    data: locations,
  });
});

// @desc   Create a location
// @route  POST /api/v1/locations

export const createLocation = asyncHandler(async (req, res, next) => {
  try {
    const { locationName, locationAddress } = req.body;

    if (!locationName) {
      return next(new ErrorResponse("Please provide a location name", 400));
    } else if (!locationAddress.latitude || !locationAddress.longitude) {
      return next(new ErrorResponse("Please provide a location address", 400));
    } else {
      const location = await Location.create(req.body);
      res.status(201).json({
        success: true,
        data: location,
      });
    }
  } catch (error) {
    next(error);
  }
});

// @desc   Update a location
// @route  PUT /api/v1/locations/:id

export const updateLocation = asyncHandler(async (req, res, next) => {
  try {
    if (req.body !== null) {
      const location = await Location.findById(req.params.id);

      if (!location) {
        return next(
          new ErrorResponse(
            `Location not found with id of ${req.params.id}`,
            404
          )
        );
      }

      const locationData = {
        locationName: req.body.locationName || location.locationName,
        locationAddress: req.body.locationAddress || location.locationAddress,
        locationStatus: req.body.locationStatus || location.locationStatus,
      };

      const updatedLocation = await Location.findByIdAndUpdate(
        req.params.id,
        locationData,
        {
          new: true,
          runValidators: true,
        }
      );

      res.status(200).json({
        success: true,
        data: updatedLocation,
      });
    }
  } catch (error) {
    next(error);
  }
});

// @desc   Delete a location
// @route  DELETE /api/v1/locations/:id

export const deleteLocation = asyncHandler(async (req, res, next) => {
  try {
    const location = await Location.findById(req.params.id);

    if (!location) {
      return next(
        new ErrorResponse(`Location not found with id of ${req.params.id}`, 404)
      );
    }

    await Location.findByIdAndDelete(req.params.id); // call the softDelete method on the location document

    res.status(200).json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
});

// @desc   Get a single location
// @route  GET /api/v1/locations/:id

export const getLocation = asyncHandler(async (req, res, next) => {
  try {
    const location = await Location.findById(req.params.id);

    if (!location) {
      return next(
        new ErrorResponse(`Location not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: location,
    });
  } catch (error) {
    next(error);
  }
});
