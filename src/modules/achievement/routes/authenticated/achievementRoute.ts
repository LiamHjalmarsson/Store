import { Router } from "express";
import authenticated from "../../../../shared/middlewares/authenticated.js";
import {
	getAllAchievementsController,
	getMyAchievementsController,
} from "../../controllers/achievementController.js";

const router = Router();

router.use(authenticated);

router.get("/", getAllAchievementsController);

router.get("/me", getMyAchievementsController);

export default router;
