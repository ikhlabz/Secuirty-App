import express from "express";

const { Router } = express;
import verifyUserToken from "../middleware/verifyUserToken.js";
import {
  addBrief,
  getBriefs,
  getBriefsById,
} from "../controllers/userContoller.js";

const router = Router();

router.post("/post-brief", verifyUserToken, addBrief);
router.get("/get-brief", verifyUserToken, getBriefs);
router.get("/get-brief/:id", verifyUserToken, getBriefsById);

export default router;
