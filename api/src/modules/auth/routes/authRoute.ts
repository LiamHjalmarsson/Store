import { Router } from "express";
import { loginValidation, registerValidation } from "../../../validations/auth/authValidate.js";
import { validateRequest } from "../../../validations/validateRequest.js";
import { login, logout, me, register } from "../controller/authController.js";
import authenicated from "../../../middlewares/authenicated.js";

const router = Router();

router.post("/login", loginValidation, validateRequest, login);

router.post("/register", registerValidation, validateRequest, register);

router.post("/logout", authenicated, logout);

router.get("/me", authenicated, me);

export default router;
