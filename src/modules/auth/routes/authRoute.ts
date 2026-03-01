import { Router } from "express";
import { login, logout, me, register } from "../controller/authController.js";
import authenticated from "../../../shared/middlewares/authenticated.js";
import { loginValidation } from "../../../validations/auth/loginValidation.js";
import { registerValidation } from "../../../validations/auth/registerValidation.js";

const router = Router();

router.post("/login", loginValidation, login);

router.post("/register", registerValidation, register);

router.post("/logout", authenticated, logout);

router.get("/me", authenticated, me);

export default router;
