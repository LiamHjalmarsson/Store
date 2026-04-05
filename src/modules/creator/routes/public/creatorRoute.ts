import { Router } from "express";
import { getAllCreatorsController, getCreatorController } from "../../controllers/creatorController.js";

const router = Router();

router.get("/", getAllCreatorsController);

router.get("/:id", getCreatorController);

export default router;
