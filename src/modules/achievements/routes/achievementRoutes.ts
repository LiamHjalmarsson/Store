import { Router } from "express";
import { awardAchievement, getAllAchievements, getMyAchievements } from "../controller/achievementController.js";
import authenicated from "../../../shared/middlewares/authenicated.js";

const router = Router();

router.use(authenicated);

router.get("/", getAllAchievements);

router.get("/me", getMyAchievements);

router.post("/award", awardAchievement);

export default router;
