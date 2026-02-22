import { Router } from "express";
import { awardAchievement, getAchievements } from "../controller/achievementController.js";
import authenicated from "../../../middlewares/authenicated.js";

const router = Router();

router.get("/", authenicated, getAchievements);

router.post("/award", authenicated, awardAchievement);

export default router;
