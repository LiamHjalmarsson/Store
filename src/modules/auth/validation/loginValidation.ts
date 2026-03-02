import { body } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";

export const loginValidation = validateRequest([
	body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Email must be valid"),
	body("password").notEmpty().withMessage("Password is required"),
]);
