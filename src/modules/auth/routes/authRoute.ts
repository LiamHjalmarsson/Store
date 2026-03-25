import { Router } from "express";
import { loginController, logoutController, meController, registerController } from "../controllers/authController.js";
import authenticated from "../../../shared/middlewares/authenticated.js";
import { loginValidation } from "../validations/loginValidation.js";
import { registerValidation } from "../validations/registerValidation.js";

const router = Router();

router.post("/login", loginValidation, loginController);

router.post("/register", registerValidation, registerController);

router.post("/logout", authenticated, logoutController);

router.get("/me", authenticated, meController);

export default router;
