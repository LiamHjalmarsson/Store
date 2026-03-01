import { Router } from "express";
import authenticated from "../../../shared/middlewares/authenticated.js";
import { isAdmin } from "../../../shared/middlewares/isAdmin.js";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controller/userController.js";

const router = Router();

router.use(authenticated, isAdmin);

router.get("/", getAllUsers);

router.get("/:id", getUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
