import { Router } from "express";
import authenicated from "../../middlewares/authenicated.js";
import { deleteProfile, getProfile, updateProfile } from "../../controllers/user/profileController.js";

const router = Router();

router.get("/:id", authenicated, getProfile);

router.put("/:id", authenicated, updateProfile);

router.delete("/:id", authenicated, deleteProfile);

export default router;
