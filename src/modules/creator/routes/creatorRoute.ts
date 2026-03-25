import { Router } from "express";
import {
	createCreator,
	deleteCreatorProfile,
	getAllCreators,
	getCreator,
	updateCreatorProfile,
} from "../controllers/creatorController.js";
import authenticated from "../../../shared/middlewares/authenticated.js";
import { becomeCreatorValidation } from "../validations/createValidation.js";
import { updateCreatorValidation } from "../validations/updateValidation.js";

const router = Router();

router.get("/", getAllCreators);

router.post("/become-creator", authenticated, becomeCreatorValidation, createCreator);

router.get("/:id", getCreator);

router.patch("/me", authenticated, updateCreatorValidation, updateCreatorProfile);

router.delete("/me", authenticated, deleteCreatorProfile);

export default router;
