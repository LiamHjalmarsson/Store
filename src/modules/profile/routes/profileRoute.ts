import { Router } from "express";
import {
	deleteProfileController,
	getProfileController,
	updateProfileController,
} from "../controllers/profileController.js";
import { updateValidation } from "../validations/updateValidation.js";
import authenticated from "../../../shared/middlewares/authenticated.js";

const router = Router();

router.use(authenticated);

router.get("/", getProfileController);

router.patch("/", updateValidation, updateProfileController);

router.delete("/", deleteProfileController);

export default router;

