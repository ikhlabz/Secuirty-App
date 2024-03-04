import express from "express";
import {
  getLocations,
  createLocation,
  updateLocation,
  deleteLocation,
  getLocation,
} from "../controllers/locationController.js";
import verifyUserRoles from "../middleware/verifyUserRoles.js";
import verifyUserToken from "../middleware/verifyUserToken.js";

const router = express.Router();

router.post(
  "/",
  verifyUserToken,
  verifyUserRoles("Admin", "Supervisor"),
  createLocation
);
router.get("/", verifyUserToken, getLocations);
router.get("/:id", verifyUserToken, getLocation);
router.put(
  "/:id",
  verifyUserToken,
  verifyUserRoles("Admin", "Supervisor"),
  updateLocation
);
router.delete(
  "/:id",
  verifyUserToken,
  verifyUserRoles("Admin", "Supervisor"),
  deleteLocation
);

export default router;
