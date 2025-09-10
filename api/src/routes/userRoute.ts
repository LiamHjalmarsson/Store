import { Router } from "express";
import { deleteUser, getAllUsers, updateUser, getUser } from "../controllers/userController.js";

const router = Router();

router.get("/", getAllUsers);

router.get("/:id", getUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
