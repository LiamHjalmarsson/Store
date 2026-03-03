import { Router } from "express";
import {
	createCreator,
	deleteCreatorProfile,
	getAllCreators,
	getCreator,
	updateCreatorProfile,
} from "../controller/creatorController.js";
import authenticated from "../../../shared/middlewares/authenticated.js";
import { becomeCreatorValidation } from "../validation/createValidation.js";
import { isCreator } from "../../../shared/middlewares/isCreator.js";
import { updateCreatorValidation } from "../validation/updateValidation.js";

const router = Router();

router.get("/", getAllCreators);

router.post("/become-creator", authenticated, becomeCreatorValidation, createCreator);

router.get("/:id", getCreator);

router.patch("/me", authenticated, isCreator, updateCreatorValidation, updateCreatorProfile);

router.delete("/me", authenticated, isCreator, deleteCreatorProfile);

export default router;
