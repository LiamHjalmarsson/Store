import { Router } from "express";
import {
	createAchievement,
	deleteAchievement,
	getAllAchievements,
	updateAchievement,
} from "../../controller/achievementController.js";
import authenicated from "../../../../shared/middlewares/authenticated.js";
import { isAdmin } from "../../../../shared/middlewares/isAdmin.js";
import { createValidation } from "../../../../validations/achievement/createValidation.js";
import { updateValidation } from "../../../../validations/achievement/updateValidation.js";

const router = Router();

router.use(authenicated, isAdmin);

router.get("/", getAllAchievements);

router.post("/", createValidation, createAchievement);

router.put("/:id", updateValidation, updateAchievement);

router.delete("/:id", deleteAchievement);

export default router;
