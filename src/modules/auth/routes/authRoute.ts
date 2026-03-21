import { Router } from "express";
import { loginController, logoutController, meController, registerController } from "../controller/authController.js";
import authenticated from "../../../shared/middlewares/authenticated.js";
import { loginValidation } from "../validation/loginValidation.js";
import { registerValidation } from "../validation/registerValidation.js";

const router = Router();

router.post("/login", loginValidation, loginController);

router.post("/register", registerValidation, registerController);

router.post("/logout", authenticated, logoutController);

router.get("/me", authenticated, meController);

export default router;
