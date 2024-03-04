import express from "express";

import verifyUserRoles from "../middleware/verifyUserRoles.js";
import verifyUserToken from "../middleware/verifyUserToken.js";
import {
  createShifts,
  dailyCheckIn,
  dailyCheckOut,
  getShiftById,
  getShiftSwapRequestsForGuard,
  getShifts,
  shiftSwapRequest,
  updateShift,
  updateShiftSwapRequest,
  deleteShift,
} from "../controllers/shiftContoller.js";

const router = express.Router();

router.post("/", verifyUserToken, verifyUserRoles("Admin"), createShifts);
router.get("/", verifyUserToken, getShifts);
router.put(
  "/:id",
  verifyUserToken,
  verifyUserRoles("Admin", "Supervisor"),
  updateShift
);
router.delete(
  "/:id",
  verifyUserToken,
  verifyUserRoles("Admin", "Supervisor"),
  deleteShift
);
router.get("/:id", verifyUserToken, getShiftById);
router.post("/swap", verifyUserToken, shiftSwapRequest);
router.put("/swap/:id", verifyUserToken, updateShiftSwapRequest);
router.get("/swap/:id", verifyUserToken, getShiftSwapRequestsForGuard);
router.put("/checkout/:id", verifyUserToken, dailyCheckOut);
router.post("/checkin", verifyUserToken, dailyCheckIn);

export default router;
