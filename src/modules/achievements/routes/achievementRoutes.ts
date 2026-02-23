import { Router } from "express";
import { awardAchievement, getAchievements, getMyAchievements } from "../controller/achievementController.js";
import authenicated from "../../../middlewares/authenicated.js";

const router = Router();

router.use(authenicated);

router.get("/", getAchievements);

router.get("/me", getMyAchievements);

router.post("/award", awardAchievement);

export default router;
