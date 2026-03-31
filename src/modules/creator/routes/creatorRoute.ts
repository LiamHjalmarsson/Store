import { Router } from "express";
import {
	createCreatorController,
	deleteMyCreatorController,
	getAllCreatorsController,
	getCreatorController,
	updateMyCreatorController,
} from "../controllers/creatorController.js";
import authenticated from "../../../shared/middlewares/authenticated.js";
import { createValidation } from "../validations/createValidation.js";
import { updateValidation } from "../validations/updateValidation.js";

const router = Router();

router.get("/", getAllCreatorsController);

router.post("/become-creator", authenticated, createValidation, createCreatorController);

router.get("/:id", getCreatorController);

router.patch("/me", authenticated, updateValidation, updateMyCreatorController);

router.delete("/me", authenticated, deleteMyCreatorController);

export default router;
