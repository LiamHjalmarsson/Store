import { Router } from "express";
import { login, logout, me, register } from "../controller/authController.js";
import authenicated from "../../../shared/middlewares/authenicated.js";
import { loginValidation } from "../../../validations/auth/loginValidation.js";
import { registerValidation } from "../../../validations/auth/registerValidation.js";

const router = Router();

router.post("/login", loginValidation, login);

router.post("/register", registerValidation, register);

router.post("/logout", authenicated, logout);

router.get("/me", authenicated, me);

export default router;
