import { Router } from "express";
import authenticated from "../../../shared/middlewares/authenticated.js";
import { loginController, logoutController, meController, registerController } from "../controllers/authController.js";
import { validateLoginRequest } from "../validations/loginValidation.js";
import { validateRegisterRequest } from "../validations/registerValidation.js";

const authRouter = Router();

authRouter.post("/login", validateLoginRequest, loginController);

authRouter.post("/register", validateRegisterRequest, registerController);

authRouter.post("/logout", authenticated, logoutController);

authRouter.get("/me", authenticated, meController);

export default authRouter;

