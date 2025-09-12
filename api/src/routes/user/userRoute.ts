import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../../controllers/user/userController.js";
import { createUserValidation } from "../../validations/user/userValidate.js";
import { validateRequest } from "../../validations/validateRequest.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import { isAdminMiddleware } from "../../middlewares/adminMiddleware.js";

const router = Router();

router.get("/", getAllUsers);

router.post("/", createUserValidation, validateRequest, authMiddleware, isAdminMiddleware, createUser);

router.get("/:id", getUser);

router.put("/:id", authMiddleware, isAdminMiddleware, updateUser);

router.delete("/:id", authMiddleware, isAdminMiddleware, deleteUser);

export default router;
