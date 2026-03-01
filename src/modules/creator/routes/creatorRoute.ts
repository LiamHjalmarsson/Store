import { Router } from "express";
import { createCreator, getAllCreators, getCreator } from "../controller/creatorController.js";
import authenticated from "../../../shared/middlewares/authenticated.js";
import { becomeCreatorValidation } from "../../../validations/creator/createValidation.js";

const router = Router();

router.get("/", getAllCreators);

router.post("/become-creator", authenticated, becomeCreatorValidation, createCreator);

router.get("/:id", getCreator);

export default router;
