import { Router } from "express";
import {
	createAchievementController,
	deleteAchievementController,
	getAllAchievementsController,
	updateAchievementController,
} from "../../controllers/achievementController.js";
import authenicated from "../../../../shared/middlewares/authenticated.js";
import { isAdmin } from "../../../../shared/middlewares/isAdmin.js";
import { createAchievementValidation } from "../../validations/achievementCreateValidation.js";
import { updateAchievementValidation } from "../../validations/achievementUpdateValidation.js";

const router = Router();

router.use(authenicated, isAdmin);

router.get("/", getAllAchievementsController);

router.post("/", createAchievementValidation, createAchievementController);

router.patch("/:id", updateAchievementValidation, updateAchievementController);

router.delete("/:id", deleteAchievementController);

export default router;
