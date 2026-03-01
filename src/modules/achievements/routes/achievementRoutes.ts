import { Router } from "express";
import { awardAchievement, getAllAchievements, getMyAchievements } from "../controller/achievementController.js";
import authenticated from "../../../shared/middlewares/authenticated.js";

const router = Router();

router.use(authenticated);

router.get("/", getAllAchievements);

router.get("/me", getMyAchievements);

router.post("/award", awardAchievement);

export default router;
