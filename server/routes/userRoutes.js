import express from "express";
import verifyUserRoles from "../middleware/verifyUserRoles.js";
import verifyUserToken from "../middleware/verifyUserToken.js";
import {
  loginUser,
  registerUser,
  generateNewAccessToken,
  forgotPassword,
  changePassword,
  resetPassword,
  getUserDetails,
  getAllUsers,
  registerGuard,
  loginGuard,
  getSuperVisors,
  updateGuardLocation,
  getGuardDetailsById,
  updateGuard,
  deleteGuard,
  updateSuperVisor,
  deleteSupervisor,
} from "../controllers/userContoller.js";
import singleFile from "../middleware/singleFile.js";
import singlePdf from "../middleware/singlePdf.js";

let router = express.Router();

router.post("/register", singleFile, registerUser);
router.post(
  "/register/guard",
  verifyUserToken,
  verifyUserRoles("Admin", "Supervisor"),
  singlePdf,
  registerGuard
);
router.post("/login/guard", loginGuard);
router.post("/login", loginUser);
router.get("/me", verifyUserToken, getUserDetails);
router.post("/generate-access-token", generateNewAccessToken);
router.post("/change-password", verifyUserToken, changePassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.put("/update-location/:id", verifyUserToken, updateGuardLocation);

// Admin routes

router.get(
  "/admin/users",
  verifyUserToken,
  verifyUserRoles("Admin", "Supervisor"),
  getAllUsers
);

router.get(
  "/admin/supervisor",
  verifyUserToken,
  verifyUserRoles("Admin"),
  getSuperVisors
);

router.delete(
  "/admin/:id",
  verifyUserToken,
  verifyUserRoles("Admin"),
  deleteSupervisor
);
router.put(
  "/admin/:id",
  verifyUserToken,
  verifyUserRoles("Admin"),
  updateSuperVisor
);

router.get(
  "/admin/guard/:id",
  verifyUserToken,
  verifyUserRoles("Admin", "Supervisor"),
  getGuardDetailsById
);

router.delete(
  "/admin/guard/:id",
  verifyUserToken,
  verifyUserRoles("Admin"),
  deleteGuard
);
router.put(
  "/admin/guard/:id",
  verifyUserToken,
  verifyUserRoles("Admin"),
  updateGuard
);

export default router;
