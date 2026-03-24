import { Router } from "express";
import authenticated from "../../../shared/middlewares/authenticated.js";
import { deleteProfile, getProfile, updateProfile } from "../controller/profileController.js";

const router = Router();

router.use(authenticated);

router.get("/", getProfile);

router.patch("/", updateProfile);

router.delete("/", deleteProfile);

export default router;
