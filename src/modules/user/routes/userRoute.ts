import { Router } from "express";
import authenticated from "../../../shared/middlewares/authenticated.js";
import { isAdmin } from "../../../shared/middlewares/isAdmin.js";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../controller/userController.js";
import { createValidation } from "../validation/createValidation.js";
import { updateValidation } from "../validation/updateValidation.js";

const router = Router();

router.use(authenticated, isAdmin);

router.get("/", getAllUsers);

router.post("/", createValidation, createUser);

router.get("/:id", getUser);

router.patch("/:id", updateValidation, updateUser);

router.delete("/:id", deleteUser);

export default router;
