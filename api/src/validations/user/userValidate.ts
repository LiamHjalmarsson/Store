import { body } from "express-validator";

export const createUserValidation = [
	body("email").isEmail().withMessage("Email must be valid"),
	body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
];
