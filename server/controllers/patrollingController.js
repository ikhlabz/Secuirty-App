import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { Patrolling } from "../models/patrollingSchema.js";
import QRCODE from "qrcode";
import { v2 as cloudinary } from "cloudinary"; // Import Cloudinary

// @desc   Create patrolling
// @route  POST /api/v1/patrol

export const createPatrolling = asyncHandler(async (req, res, next) => {
  const { patrollingName, patrollingCheckpoints, assignedTo, patrollingArea } =
    req.body;

  // Array to store QR code information
  let qrImageLinks = [];

  // Loop through each patrolling checkpoint
  for (let i = 0; i < patrollingCheckpoints.length; i++) {
    // Generate QR code for each checkpoint
    const qrCode = await QRCODE.toDataURL(
      patrollingCheckpoints[i].checkpointName
    );

    // Upload the QR code image to Cloudinary
    try {
      const result = await cloudinary.uploader.upload(qrCode);
      qrImageLinks.push({
        secure_url: result.secure_url,
        public_id: result.public_id,
      });
    } catch (err) {
      return next(new ErrorResponse("Error uploading QR Code", 500));
    }
  }

  // Assign QR code information to each checkpoint
  patrollingCheckpoints.forEach((checkpoint, index) => {
    checkpoint.checkpointQrCode = qrImageLinks[index];
  });

  let assignedToArr = [];

  // If assignedTo is an array, loop through each assignedTo and add to assignedToArr

  if (Array.isArray(assignedTo)) {
    for (let i = 0; i < assignedTo.length; i++) {
      assignedToArr.push(assignedTo[i]);
    }
  }

  // Create Patrolling instance with the provided details and checkpoints
  await Patrolling.create({
    patrollingName,
    patrollingCheckpoints,
    assingedTo: assignedTo,
    patrollingArea,
  });

  // Send a response indicating successful creation
  res
    .status(201)
    .json({ success: true, data: "Patrolling created successfully" });
});

// @desc   Get all patrolling

export const getPatrolling = asyncHandler(async (req, res, next) => {
  const patrolling = await Patrolling.find({})
    // .populate("assignedTo")
    .populate({
      path: "patrollingArea",
      model: "Location",
    })
    .populate("assingedTo", "firstName lastName email");

  res.status(200).json({
    success: true,
    data: patrolling,
  });
});

export const getPatrollingById = asyncHandler(async (req, res, next) => {
  const patrolling = await Patrolling.findById(req.params.id)
    .populate({
      path: "patrollingArea",
      model: "Location",
    })
    .populate("assingedTo", "firstName lastName email");

  res.status(200).json({
    success: true,
    data: patrolling,
  });
});

export const updatePatrolling = asyncHandler(async (req, res, next) => {
  console.log("PATROLLIGN CHecKPOINTS BODY", req.body.patrollingCheckpoints);
  try {
    if (req.body !== null) {
      const patrolling = await Patrolling.findById(req.params.id);

      const updatedPatrollingData = {
        patrollingName: req.body.patrollingName || patrolling.patrollingName,
        patrollingCheckpoints: req.body.patrollingCheckpoints,
        assingedTo: req.body.assingedTo || patrolling.assingedTo,
        patrollingArea: req.body.patrollingArea || patrolling.patrollingArea,
      };

      let qrImageLinks = [];

      for (
        let i = 0;
        i < updatedPatrollingData.patrollingCheckpoints.length;
        i++
      ) {
        const qrCode = await QRCODE.toDataURL(
          updatedPatrollingData.patrollingCheckpoints[i].checkpointName
        );

        if (req.body.patrollingCheckpoints.length > 0) {
          try {
            console.log("UPDATING QR", qrCode);
            const result = await cloudinary.uploader.upload(qrCode);
            qrImageLinks.push({
              checkpointName:
                updatedPatrollingData.patrollingCheckpoints[i].checkpointName,
              checkpointQrCode: {
                secure_url: result.secure_url,
                public_id: result.public_id,
              },
            });
            console.log(" QR IMAGE LINKS: ", qrImageLinks);
          } catch (err) {
            return next(new ErrorResponse(err, 500));
          }
        } else {
          console.log("AB ELSE");
          qrImageLinks = patrolling.patrollingCheckpoints;
        }
      }
      const update = await Patrolling.findByIdAndUpdate(
        req.params.id,
        {
          patrollingName: updatedPatrollingData.patrollingName,
          patrollingCheckpoints: qrImageLinks,
          assingedTo: updatedPatrollingData.assingedTo,
          patrollingArea: updatedPatrollingData.patrollingArea,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(201).json({
        success: true,
        data: update,
      });
    }
  } catch (error) {
    next(error);
  }
});

export const deletePatrolling = asyncHandler(async (req, res, next) => {
  const patrolling = await Patrolling.findById(req.params.id);

  if (!patrolling) {
    return next(
      new ErrorResponse(`Patrolling not found with id of ${req.params.id}`, 404)
    );
  }

  await Patrolling.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});

export const updateCheckpointQrCodeStatus = asyncHandler(
  async (req, res, next) => {
    try {
      const { id } = req.params;

      console.log("CHECKPOINT ID: ", id);

      // Find the patrolling containing the checkpoint
      const patrolling = await Patrolling.findOne({
        "patrollingCheckpoints._id": id,
      });

      if (!patrolling) {
        return next(
          new ErrorResponse(`Checkpoint not found with id of ${id}`, 404)
        );
      }

      // Find the checkpoint within the patrolling
      const foundCheckpoint = patrolling.patrollingCheckpoints.find(
        (checkpoint) => checkpoint._id.toString() === id
      );

      if (!foundCheckpoint) {
        return next(
          new ErrorResponse(`Checkpoint not found with id of ${id}`, 404)
        );
      }

      // Update the completed status of the checkpoint
      foundCheckpoint.completed = true;

      // Save the changes to the database
      await patrolling.save();

      res.status(202).json({
        success: true,
        data: foundCheckpoint,
      });
    } catch (error) {
      next(error);
    }
  }
);
