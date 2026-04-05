import { Router } from "express";
import authenticated from "../../../../shared/middlewares/authenticated.js";
import { isCreator } from "../../../../shared/middlewares/isCreator.js";
import {
	createCreatorController,
	deleteMyCreatorController,
	updateMyCreatorController,
} from "../../controllers/creatorController.js";
import { createValidation } from "../../validations/createValidation.js";
import { updateValidation } from "../../validations/updateValidation.js";

const router = Router();

router.use(authenticated);

router.post("/become-creator", createValidation, createCreatorController);

router.patch("/me", isCreator, updateValidation, updateMyCreatorController);

router.delete("/me", isCreator, deleteMyCreatorController);

export default router;
