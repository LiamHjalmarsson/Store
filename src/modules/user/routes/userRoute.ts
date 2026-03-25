import { Router } from "express";
import authenticated from "../../../shared/middlewares/authenticated.js";
import { isAdmin } from "../../../shared/middlewares/isAdmin.js";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../controllers/userController.js";
import { createValidation } from "../validations/createValidation.js";
import { updateValidation } from "../validations/updateValidation.js";

const router = Router();

router.use(authenticated, isAdmin);

router.get("/", getAllUsers);

router.post("/", createValidation, createUser);

router.get("/:id", getUser);

router.patch("/:id", updateValidation, updateUser);

router.delete("/:id", deleteUser);

export default router;
