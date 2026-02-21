import { Router } from "express";
import { getAllCreators, getCreator } from "../../controllers/creator/creatorController.js";

const router = Router();

router.get("/", getAllCreators);

router.get("/:id", getCreator);

export default router;
