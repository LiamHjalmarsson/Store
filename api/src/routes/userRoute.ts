import { Router } from "express";
import { deleteUser, getAllUsers, updateUser, getUser } from "../controllers/userController.js";
import { isAdminMiddleware } from "../middlewares/adminMiddleware.js";

const router = Router();

router.get("/", isAdminMiddleware, getAllUsers);

router.get("/:id", getUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
