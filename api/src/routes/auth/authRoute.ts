import { Router } from "express";
import { loginValidation, registerValidation } from "../../validations/auth/authValidate.js";
import { validateRequest } from "../../validations/validateRequest.js";
import authMiddleware from "../../middlewares/authenicated.js";
import { login, logout, register } from "../../controllers/auth/authController.js";

const router = Router();

router.post("/login", loginValidation, validateRequest, login);

router.post("/register", registerValidation, validateRequest, register);

router.post("/logout", authMiddleware, logout);

export default router;
