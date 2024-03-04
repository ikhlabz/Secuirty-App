import express from "express";
import verifyUserRoles from "../middleware/verifyUserRoles.js";
import verifyUserToken from "../middleware/verifyUserToken.js";
import {
  createPatrolling,
  deletePatrolling,
  getPatrolling,
  getPatrollingById,
  updateCheckpointQrCodeStatus,
  updatePatrolling,
} from "../controllers/patrollingController.js";

let router = express.Router();

// Patrolling Routes

router.post(
  "/create-patrolling",
  verifyUserToken,
  verifyUserRoles("Admin", "Supervisor"),
  createPatrolling
);

router.get("/get-patrolling", verifyUserToken, getPatrolling);

router.get("/get-patrolling/:id", verifyUserToken, getPatrollingById);

router.put("/update-patrolling/:id", verifyUserToken, updatePatrolling);

router.delete(
  "/delete-patrolling/:id",
  verifyUserToken,
  verifyUserRoles("Admin", "Supervisor"),
  deletePatrolling
);

router.put("/verify-qr/:id", verifyUserToken, updateCheckpointQrCodeStatus);

export default router;
