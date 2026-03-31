import { Router } from "express";
import authenticated from "../../../shared/middlewares/authenticated.js";
import { isAdmin } from "../../../shared/middlewares/isAdmin.js";
import {
	createUserController,
	deleteUserController,
	getAllUsersController,
	getUserController,
	updateUserController,
} from "../controllers/userController.js";
import { createValidation } from "../validations/createValidation.js";
import { updateValidation } from "../validations/updateValidation.js";

const router = Router();

router.use(authenticated, isAdmin);

router.get("/", getAllUsersController);

router.post("/", createValidation, createUserController);

router.get("/:id", getUserController);

router.patch("/:id", updateValidation, updateUserController);

router.delete("/:id", deleteUserController);

export default router;
