import Incident from "../models/incidentSchema.js";
import ErrorResponse from "../middleware/errorHandler.js";
import asyncHandler from "../middleware/asyncHandler.js";
import IncidentReportField from "../models/incidenteReportFieldSchema.js";
import cloudinary from "cloudinary";
import { User } from "../models/users.js";
import SecurityGuard from "../models/securityGuardSchema.js";

// @desc      Get all incidents
// @route     GET /api/v1/incidents

export const getAllIncidents = asyncHandler(async (req, res, next) => {
  const incidents = await Incident.find({})
    .populate({
      path: "securityGuardID",
      schema: "SecurityGuard",
    })
    .exec();
  res.status(200).json({
    success: true,
    data: incidents,
  });
});

// @desc      Get single incident
// @route     GET /api/v1/incidents/:id

export const getIncidentByID = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const incident = await Incident.findById(id)
      .populate({
        path: "securityGuardID",
        schema: "SecurityGuard",
      })
      .exec();
    if (!incident) {
      return next(
        new ErrorResponse(`Incident not found with id of ${id}`, 404)
      );
    }
    res.status(200).json({
      success: true,
      data: incident,
    });
  } catch (error) {
    next(error);
  }
});

export const createIncident = asyncHandler(async (req, res, next) => {
  try {
    let images = [];
    if (typeof req.body.incidentAssets === "string") {
      images.push(req.body.incidentAssets);
    } else {
      images = req.body.incidentAssets;
    }
    const incidentArray = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "incident-reports",
      });
      incidentArray.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.incidentAssets = incidentArray;
    req.body.user = req.user.id;

    const incident = await Incident.create(req.body);
    res.status(201).json({
      success: true,
      incident,
    });
  } catch (error) {
    next(error);
  }
});

export const createIncidentReportField = asyncHandler(
  async (req, res, next) => {
    try {
      const field = await IncidentReportField.create(req.body);
      res.status(201).json({
        success: true,
        data: field,
      });
    } catch (error) {
      next(error);
    }
  }
);

export const getIncidentReportFields = asyncHandler(async (req, res, next) => {
  try {
    const fields = await IncidentReportField.find({});
    res.status(200).json({
      success: true,
      data: fields,
    });
  } catch (error) {
    next(error);
  }
});

export const deleteIncidentReportField = asyncHandler(
  async (req, res, next) => {
    const { id } = req.params;
    const deleteField = await IncidentReportField.findByIdAndDelete(id);
    if (!deleteField) {
      return next(new ErrorResponse(`Field not found with id of ${id}`, 404));
    }
    res.status(200).json({
      success: true,
      message: "Field deleted successfully.",
    });
  }
);

export const broadCastMessage = asyncHandler(async (req, res, next) => {
  const { message, title } = req.body;
  const data = {
    title,
    message,
  };
  const users = await User.find({ role: "Supervisor" });
  const guards = await SecurityGuard.find({});
  if (users && guards) {
    const timeStamp = new Date().getTime(); // Generating timestamp

    // Emit messages to users
    users.forEach((user) => {
      req.io.emit("message", {
        ...data,
        timeStamp,
        id: user._id, // Adding user ID to data object
      });
    });

    // Emit messages to guards
    guards.forEach((guard) => {
      req.io.emit("message", {
        ...data,
        timeStamp,
        id: guard._id, // Adding guard ID to data object
      });
    });
  }

  res.status(200).json({
    success: true,
    message: "Message broadcasted successfully.",
  });
});
