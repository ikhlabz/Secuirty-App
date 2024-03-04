import express from "express";
import patrollingRoutes from "./patrollingRoutes.js";

let router = express.Router();

// User Routes

import userRoutes from "./userRoutes.js";
import locationRoutes from "./locationRoutes.js";
import shiftRoutes from "./shiftsRoutes.js";
import miscRoutes from "./miscRoutes.js";
import briefRoutes from "./breifingRoutes.js";

router.use("/v1/users", userRoutes);
router.use("/v1/patrolling", patrollingRoutes);
router.use("/v1/locations", locationRoutes);
router.use("/v1/shifts", shiftRoutes);
router.use("/v1/misc", miscRoutes);
router.use("/v1/briefing", briefRoutes);

export default router;
