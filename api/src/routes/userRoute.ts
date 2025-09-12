import { Router } from "express";
import { deleteUser, getAllUsers, updateUser, getUser, createUser } from "../controllers/userController.js";
import { isAdminMiddleware } from "../middlewares/adminMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createUserValidation } from "../validations/userValidate.js";
import { validateRequest } from "../validations/validateRequest.js";

const router = Router();

router.get("/", getAllUsers);

router.post("/", createUserValidation, validateRequest, authMiddleware, isAdminMiddleware, createUser);

router.get("/:id", getUser);

router.put("/:id", authMiddleware, isAdminMiddleware, updateUser);

router.delete("/:id", authMiddleware, isAdminMiddleware, deleteUser);

export default router;
