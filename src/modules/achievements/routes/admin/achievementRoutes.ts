import { Router } from "express";
import {
	createAchievement,
	deleteAchievement,
	getAchievements,
	updateAchievement,
} from "../../controller/achievementController.js";
import authenicated from "../../../../middlewares/authenicated.js";
import { isAdmin } from "../../../../middlewares/isAdmin.js";

const router = Router();

router.use(authenicated, isAdmin);

router.get("/", getAchievements);

router.post("/", createAchievement);

router.put("/:id", updateAchievement);

router.delete("/:id", deleteAchievement);

export default router;
