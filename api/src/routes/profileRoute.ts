import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { deleteProfile, profile, updateProfile } from "../controllers/profileController.js";

const router = Router();

router.get("/:id", authMiddleware, profile);

router.put("/:id", authMiddleware, updateProfile);

router.delete("/:id", authMiddleware, deleteProfile);

export default router;
