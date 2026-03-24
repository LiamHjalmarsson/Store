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
import { updateCreatorValidation } from "../validation/updateValidation.js";

const router = Router();

router.get("/", getAllCreators);

router.post("/become-creator", authenticated, becomeCreatorValidation, createCreator);

router.get("/:id", getCreator);

router.patch("/me", authenticated, updateCreatorValidation, updateCreatorProfile);

router.delete("/me", authenticated, deleteCreatorProfile);

export default router;

