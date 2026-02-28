import { Router } from "express";
import { createCreator, getAllCreators, getCreator } from "../controller/creatorController.js";
import authenicated from "../../../shared/middlewares/authenicated.js";
import { becomeCreatorValidation } from "../../../validations/creator/createValidation.js";

const router = Router();

router.get("/", getAllCreators);

router.post("/become-creator", authenicated, becomeCreatorValidation, createCreator);

router.get("/:id", getCreator);

export default router;
