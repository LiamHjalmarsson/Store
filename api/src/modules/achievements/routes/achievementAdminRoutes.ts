import { Router } from "express";
import {
	awardAchievement,
	deleteAchievement,
	getAchievements,
	updateAchievement,
} from "../controller/achievementController.js";
import authenicated from "../../../middlewares/authenicated.js";
import { isAdmin } from "../../../middlewares/isAdmin.js";
import { createAchievement } from "../model/achievementModel.js";

const router = Router();

router.get("/", authenicated, isAdmin, getAchievements);

router.post("/", authenicated, isAdmin, createAchievement);

router.post("/award", authenicated, isAdmin, awardAchievement);

router.put("/:id", authenicated, isAdmin, updateAchievement);

router.delete("/:id", authenicated, isAdmin, deleteAchievement);

export default router;
