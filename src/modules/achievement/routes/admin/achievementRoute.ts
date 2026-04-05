import { Router } from "express";
import authenticated from "../../../../shared/middlewares/authenticated.js";
import { isAdmin } from "../../../../shared/middlewares/isAdmin.js";
import {
	awardAchievementController,
	createAchievementController,
	deleteAchievementController,
	updateAchievementController,
} from "../../controllers/achievementController.js";
import { awardValidation } from "../../validations/awardValidation.js";
import { createValidation } from "../../validations/createValidation.js";
import { deleteValidation } from "../../validations/deleteValidation.js";
import { updateValidation } from "../../validations/updateValidation.js";

const router = Router();

router.use(authenticated, isAdmin);

router.post("/", createValidation, createAchievementController);

router.patch("/:id", updateValidation, updateAchievementController);

router.delete("/:id", deleteValidation, deleteAchievementController);

router.post("/award", awardValidation, awardAchievementController);

export default router;
