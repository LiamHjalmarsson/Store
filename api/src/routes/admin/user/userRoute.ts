import { Router } from "express";
import { deleteUser, getAllUsers, getUser, updateUser } from "../../../controllers/admin/user/userController.js";
import authenicated from "../../../middlewares/authenicated.js";
import { isAdmin } from "../../../middlewares/isAdmin.js";

const router = Router();

router.get("/", authenicated, isAdmin, getAllUsers);

router.get("/:id", authenicated, isAdmin, getUser);

router.put("/:id", authenicated, isAdmin, updateUser);

router.delete("/:id", authenicated, isAdmin, deleteUser);

export default router;
