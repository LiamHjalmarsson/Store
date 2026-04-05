import { Router } from "express";
import authenticated from "../../../../shared/middlewares/authenticated.js";
import {
	awardAchievementController,
	getAllAchievementsController,
	getMyAchievementsController,
} from "../../controllers/achievementController.js";
import { awardValidation } from "../../validations/awardValidation.js";

const router = Router();

router.use(authenticated);

router.get("/", getAllAchievementsController);

router.get("/me", getMyAchievementsController);

router.post("/award", awardValidation, awardAchievementController);

export default router;
