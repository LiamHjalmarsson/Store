import { Router } from "express";
import authenticated from "../../../shared/middlewares/authenticated.js";
import { deleteProfile, getProfile, updateProfile } from "../controller/profileController.js";

const router = Router();

router.use(authenticated);

router.get("/:id", getProfile);

router.put("/:id", updateProfile);

router.delete("/:id", deleteProfile);

export default router;
