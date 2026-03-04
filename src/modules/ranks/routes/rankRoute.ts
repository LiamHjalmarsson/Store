import { Router } from "express";
import { getAllRanks, getRank, resolveRank } from "../controller/rankController.js";

const router = Router();

router.get("/", getAllRanks);
router.get("/resolve", resolveRank);
router.get("/:id", getRank);

export default router;
