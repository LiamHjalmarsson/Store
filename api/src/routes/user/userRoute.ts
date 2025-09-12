import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../../controllers/user/userController.js";
import { createUserValidation } from "../../validations/user/userValidate.js";
import { validateRequest } from "../../validations/validateRequest.js";
import authenicated from "../../middlewares/authenicated.js";
import { isAdmin } from "../../middlewares/isAdmin.js";

const router = Router();

router.get("/", getAllUsers);

router.post("/", createUserValidation, validateRequest, authenicated, isAdmin, createUser);

router.get("/:id", getUser);

router.put("/:id", authenicated, isAdmin, updateUser);

router.delete("/:id", authenicated, isAdmin, deleteUser);

export default router;
