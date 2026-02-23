import { Router } from "express";
import authenicated from "../../../middlewares/authenicated.js";
import { isAdmin } from "../../../middlewares/isAdmin.js";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controller/userController.js";

const router = Router();

router.use(authenicated, isAdmin);

router.get("/", getAllUsers);

router.get("/:id", getUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
