import { Router } from "express";
import { deleteUser, getAllUsers, getUser, updateUser } from "../../controllers/user/userController.js";
import authenicated from "../../middlewares/authenicated.js";
import { isAdmin } from "../../middlewares/isAdmin.js";

const router = Router();

router.get("/", getAllUsers);

router.get("/:id", getUser);

router.put("/:id", authenicated, isAdmin, updateUser);

router.delete("/:id", authenicated, isAdmin, deleteUser);

export default router;
