import { Router } from "express";
import { getAllRanks, getRank } from "../controller/rankController";

const router = Router();

router.get("/", getAllRanks);

router.get("/:id", getRank);

export default router;
