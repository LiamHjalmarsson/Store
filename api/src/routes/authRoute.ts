import { Router } from "express";
import { login, logout, register } from "../controllers/authController.js";
import { loginValidation, registerValidation } from "../validations/authValidate.js";
import { validateRequest } from "../validations/validateRequest.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/login", loginValidation, validateRequest, login);

router.post("/register", registerValidation, validateRequest, register);

router.post("/logout", authMiddleware, logout);

export default router;
