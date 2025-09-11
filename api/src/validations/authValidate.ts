import { body } from "express-validator";

export const loginValidation = [
	body("email").isEmail().withMessage("Email must be valid"),
	body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
];

export const registerValidation = [
	body("email").isEmail().withMessage("A valid email is required"),
	body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
	body("firstname").optional().isString(),
	body("lastname").optional().isString(),
	body("username").optional().isString(),
];
