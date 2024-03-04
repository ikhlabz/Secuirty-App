import express from "express";
import {
  broadCastMessage,
  createIncident,
  createIncidentReportField,
  getAllIncidents,
  getIncidentByID,
  getIncidentReportFields,
} from "../controllers/miscController.js";
import verifyUserToken from "../middleware/verifyUserToken.js";
import verifyUserRole from "../middleware/verifyUserRoles.js";

const { Router } = express;

const router = Router();

router.post("/post-incidents", verifyUserToken, createIncident);

router.get(
  "/get-incident/",
  verifyUserToken,
  verifyUserRole("Admin", "Supervisor"),
  getAllIncidents
);
router.get(
  "/get-incident/:id",
  verifyUserToken,
  verifyUserRole("Admin"),
  getIncidentByID
);
router.get("/get-reportfields", getIncidentReportFields);
router.post(
  "/post-reportfields",
  verifyUserToken,
  verifyUserRole("Admin", "Supervisor"),
  createIncidentReportField
);

router.post(
  "/broadcast",
  verifyUserToken,
  verifyUserRole("Admin", "Supervisor"),
  broadCastMessage
);

export default router;
