import { Router } from "express";
import { awardAchievement, getAchievements, getMyAchievements } from "../controller/achievementController.js";
import authenicated from "../../../middlewares/authenicated.js";

const router = Router();

router.get("/", authenicated, getAchievements);

router.get("/me", authenicated, getMyAchievements);

router.post("/award", authenicated, awardAchievement);

export default router;
