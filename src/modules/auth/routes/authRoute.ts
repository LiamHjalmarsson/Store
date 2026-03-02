import { Router } from "express";
import { login, logout, me, register } from "../controller/authController.js";
import authenticated from "../../../shared/middlewares/authenticated.js";
import { loginValidation } from "../validation/loginValidation.js";
import { registerValidation } from "../validation/registerValidation.js";

const router = Router();

router.post("/login", loginValidation, login);

router.post("/register", registerValidation, register);

router.post("/logout", authenticated, logout);

router.get("/me", authenticated, me);

export default router;
