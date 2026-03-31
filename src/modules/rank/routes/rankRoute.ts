import { Router } from "express";
import { getAllRanksController, getRankController, resolveRankController } from "../controllers/rankController.js";

const router = Router();

router.get("/", getAllRanksController);

router.get("/resolve", resolveRankController);

router.get("/:id", getRankController);

export default router;

