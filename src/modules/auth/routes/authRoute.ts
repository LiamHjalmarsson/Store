import { Router } from "express";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { login, logout, me, register } from "../controller/authController.js";
import authenicated from "../../../shared/middlewares/authenicated.js";
import { loginValidation, registerValidation } from "../../../validations/auth/index.js";

const router = Router();

router.post("/login", loginValidation, validateRequest, login);

router.post("/register", registerValidation, validateRequest, register);

router.post("/logout", authenicated, logout);

router.get("/me", authenicated, me);

export default router;
