import { Router } from "express";
import {
	createAchievement,
	deleteAchievement,
	getAllAchievements,
	updateAchievement,
} from "../../controller/achievementController.js";
import authenicated from "../../../../shared/middlewares/authenicated.js";
import { isAdmin } from "../../../../shared/middlewares/isAdmin.js";

const router = Router();

router.use(authenicated, isAdmin);

router.get("/", getAllAchievements);

router.post("/", createAchievement);

router.put("/:id", updateAchievement);

router.delete("/:id", deleteAchievement);

export default router;
