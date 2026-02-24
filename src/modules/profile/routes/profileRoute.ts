import { Router } from "express";
import authenicated from "../../../shared/middlewares/authenicated.js";
import { deleteProfile, getProfile, updateProfile } from "../controller/profileController.js";

const router = Router();

router.use(authenicated);

router.get("/:id", getProfile);

router.put("/:id", updateProfile);

router.delete("/:id", deleteProfile);

export default router;
