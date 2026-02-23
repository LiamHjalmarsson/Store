import { Router } from "express";
import { createCreator, getAllCreators, getCreator } from "../controller/creatorController.js";
import authenicated from "../../../middlewares/authenicated.js";

const router = Router();

router.get("/", getAllCreators);

router.post("/become-creator", authenicated, createCreator);

router.get("/:id", getCreator);

export default router;
