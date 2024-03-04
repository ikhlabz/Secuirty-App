import { DailyShift, Shift } from "../models/shiftSchema.js";
import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "../middleware/asyncHandler.js";
import ShiftSwapNotification from "../models/shiftSwapNotificationSchema.js";
import SecurityGuard from "../models/securityGuardSchema.js";
import { sendShiftAssignmentEmail } from "../utils/mail.js";

// @desc    Get all shifts
// @route   GET /api/v1/shifts

export const getShifts = asyncHandler(async (req, res, next) => {
  const shifts = await Shift.find({}).populate({
    path: "locations",
    model: "Location",
  }); // Find all shifts

  res.status(200).json({
    success: true,
    data: shifts,
  });
});

// @desc  Create a shift
// @route POST /api/v1/shifts

export const createShifts = asyncHandler(async (req, res, next) => {
  try {
    if (
      !req.body.shiftName ||
      !req.body.shiftStartTime ||
      !req.body.shiftEndTime
    ) {
      return next(
        new ErrorResponse("Please provide all the required fields", 400)
      );
    }
    const shiftData = {
      shiftName: req.body.shiftName,
      shiftStartTime: req.body.shiftStartTime,
      shiftEndTime: req.body.shiftEndTime,
      lunchStartTime: req.body.lunchStartTime,
      lunchEndTime: req.body.lunchEndTime,
      locations: req.body.locations,
      createdBy: req.body.createdBy,
      assignedGuards: req.body.guards,
    };

    const shift = await Shift.create(shiftData);

    const fetchShift = await Shift.findById(shift._id).populate({
      path: "locations",
      model: "Location",
    });

    const guards = await SecurityGuard.find({ _id: { $in: req.body.guards } });

    guards.forEach((guard) => {
      sendShiftAssignmentEmail(guard.email, fetchShift);
    });

    res.status(201).json({
      success: true,
      data: shift,
    });
  } catch (error) {
    next(error);
  }
});

//@desc    Update a shift
//@route   PUT /api/v1/shifts/:id

export const updateShift = asyncHandler(async (req, res, next) => {
  try {
    if (req.body !== null) {
      const shift = await Shift.findById(req.params.id);

      if (!shift) {
        return next(
          new ErrorResponse(`Shift not found with id of ${req.params.id}`, 404)
        );
      }

      const shiftData = {
        shiftName: req.body.shiftName || shift.shiftName,
        shiftStartTime: req.body.shiftStartTime || shift.shiftStartTime,
        shiftEndTime: req.body.shiftEndTime || shift.shiftEndTime,
        shiftStatus: req.body.shiftStatus || shift.shiftStatus,
        lunchStartTime: req.body.lunchStartTime || shift.lunchStartTime,
        lunchEndTime: req.body.lunchEndTime || shift.lunchEndTime,
        locations: req.body.locations || shift.locations,
        createdBy: req.body.createdBy || shift.createdBy,
        assignedGuards: req.body.assignedGuards || shift.assignedGuards,
        isCompleted: req.body.isCompleted || shift.isCompleted,
      };

      const updatedShift = await Shift.findByIdAndUpdate(
        req.params.id,
        shiftData,
        {
          new: true,
          runValidators: true,
        }
      );

      res.status(200).json({
        success: true,
        data: updatedShift,
      });
    }
  } catch (error) {
    next(error);
  }
});

//@desc    Delete a shift
//@route   DELETE /api/v1/shifts/:id

export const deleteShift = asyncHandler(async (req, res, next) => {
  try {
    const shift = await Shift.findById(req.params.id);

    if (!shift) {
      return next(
        new ErrorResponse(`Shift not found with id of ${req.params.id}`, 404)
      );
    }

    await Shift.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Shift deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});

// xx@xxxx get shift by id
// xx@xxxxx GET /api/v1/shifts/:id

export const getShiftById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const shift = await Shift.findById(id)
    .populate({
      path: "locations",
      model: "Location",
    })
    .populate({
      path: "createdBy",
      model: "User",
    })
    .populate("assignedGuards", "firstName lastName email")
    .exec();

  res.status(200).json({
    success: true,
    data: shift,
  });
});

// @desc    Shift Swap Request Notification

export const shiftSwapRequest = asyncHandler(async (req, res, next) => {
  try {
    const shift1 = await Shift.findById(req.body.shiftId1);
    const shift2 = await Shift.findById(req.body.shiftId2);
    if (!shift1 || !shift2) {
      return next(
        new ErrorResponse(`Shift not found with id of ${req.params.id}`, 404)
      );
    }
    const shiftSwapNotification = await ShiftSwapNotification.create({
      shiftId1: shift1._id,
      shiftId2: shift2._id,
      requestingGuardId: req.body.requestingGuardId,
      requestedGuardId: req.body.requestedGuardId,
    });

    const updateGuardRequest = await SecurityGuard.findByIdAndUpdate(
      req.body.requestingGuardId,
      { $push: { shiftSwapRequests: shiftSwapNotification._id } },
      { new: true, runValidators: true }
    );

    req.io.emit("shiftSwapRequest", {
      data: "Shift swap request",
      guardId: req.body.requestedGuardId,
      fetchGuard: updateGuardRequest.shiftSwapRequests,
    });

    res.status(200).json({
      success: true,
      data: shiftSwapNotification,
      shiftRequest: "Shift swap request sent successfully",
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get all shift swap request notifications for a guard

export const getShiftSwapRequest = asyncHandler(async (req, res, next) => {
  const shiftSwapNotification = await ShiftSwapNotification.find({
    requestingGuardId: req.params.id,
  });

  res.status(200).json({
    success: true,
    data: shiftSwapNotification,
  });
});

// @desc    Update shift swap request notification
// @route   PUT /api/v1/shifts/swap/:id

export const updateShiftSwapRequest = asyncHandler(async (req, res, next) => {
  try {
    const shiftSwapNotification = await ShiftSwapNotification.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (req.body.status === "Approved") {
      const shift1 = await Shift.findById(shiftSwapNotification.shiftId1);
      const shift2 = await Shift.findById(shiftSwapNotification.shiftId2);
      if (!shift1 || !shift2) {
        return next(
          new ErrorResponse(`Shift not found with id of ${req.params.id}`, 404)
        );
      }
      const shift1AssignedGuards = shift1.assignedGuards;
      const shift2AssignedGuards = shift2.assignedGuards;

      shift1.assignedGuards = shift2AssignedGuards;
      shift2.assignedGuards = shift1AssignedGuards;

      await shift1.save();
      await shift2.save();

      req.io.emit("shiftSwapApproved", {
        data: "Shift swap request approved",
        guardId: shiftSwapNotification.requestingGuardId,
      });

      req.io.emit("shiftSwapApproved", {
        data: "Shift swap request approved",
        guardId: shiftSwapNotification.requestedGuardId,
      });
      res.status(200).json({
        success: true,
        data: shiftSwapNotification,
      });
    } else {
      req.io.emit("shiftSwapRejected", {
        data: "Shift swap request rejected",
        guardId: shiftSwapNotification.requestingGuardId,
      });

      req.io.emit("shiftSwapRejected", {
        data: "Shift swap request rejected",
        guardId: shiftSwapNotification.requestedGuardId,
      });
      res.status(200).json({
        success: true,
        data: shiftSwapNotification,
      });
    }
  } catch (error) {
    next(error);
  }
});

// @desc    Get all shift swap request notifications for a guard
// @route   GET /api/v1/shifts/swap/:id

export const getShiftSwapRequestsForGuard = asyncHandler(
  async (req, res, next) => {
    const guard = await SecurityGuard.findById(req.params.id);

    if (!guard) {
      return next(
        new ErrorResponse(`Guard not found with id of ${req.params.id}`, 404)
      );
    } else {
      const shiftSwapNotification = await ShiftSwapNotification.find({
        requestingGuardId: req.params.id,
      });

      res.status(200).json({
        success: true,
        data: shiftSwapNotification,
      });
    }
  }
);

export const dailyCheckIn = asyncHandler(async (req, res, next) => {
  try {
    const { shiftId, guardId, checkInTime } = req.body;
    const shift = await Shift.findById(shiftId);
    const guard = await SecurityGuard.findById(guardId);
    if (!shift || !guard) {
      return next(
        new ErrorResponse(
          `Shift or guard not found with id of ${req.params.id}`,
          404
        )
      );
    }

    const dailyShiftLogin = await DailyShift.create({
      date: new Date(),
      shift: shiftId,
      guard: guardId,
      login: checkInTime,
    });

    res.status(200).json({
      success: true,
      data: dailyShiftLogin,
    });
  } catch (error) {
    next(error);
  }
});

export const dailyCheckOut = asyncHandler(async (req, res, next) => {
  try {
    const { shiftId, guardId, checkOutTime, dailyShiftId } = req.body;
    const shift = await Shift.findById(shiftId);
    const guard = await SecurityGuard.findById(guardId);
    if (!shift || !guard) {
      return next(
        new ErrorResponse(
          `Shift or guard not found with id of ${req.params.id}`,
          404
        )
      );
    }

    const dailyShiftLogout = await DailyShift.findByIdAndUpdate(
      dailyShiftId,
      { logout: checkOutTime, isCompleted: true },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: dailyShiftLogout,
    });
  } catch (error) {
    next(error);
  }
});
