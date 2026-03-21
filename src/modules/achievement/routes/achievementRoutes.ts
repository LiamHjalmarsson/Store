import { Router } from "express";
import authenticated from "../../../shared/middlewares/authenticated.js";
import {
	awardAchievementController,
	getAllAchievementsController,
	getMyAchievementsController,
} from "../controller/achievementController.js";

const router = Router();

router.use(authenticated);

router.get("/", getAllAchievementsController);

router.get("/me", getMyAchievementsController);

router.post("/award", awardAchievementController);

export default router;
