import { Router } from "express";
import {
	createAchievementController,
	deleteAchievementController,
	getAllAchievementsController,
	updateAchievementController,
} from "../../controller/achievementController.js";
import authenicated from "../../../../shared/middlewares/authenticated.js";
import { isAdmin } from "../../../../shared/middlewares/isAdmin.js";
import { createAchievementValidation } from "../../validation/createValidation.js";
import { updateAchievementValidation } from "../../validation/updateValidation.js";

const router = Router();

router.use(authenicated, isAdmin);

router.get("/", getAllAchievementsController);

router.post("/", createAchievementValidation, createAchievementController);

router.put("/:id", updateAchievementValidation, updateAchievementController);

router.delete("/:id", deleteAchievementController);

export default router;
