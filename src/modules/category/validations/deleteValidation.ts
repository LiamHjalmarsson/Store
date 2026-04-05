import { param } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { categoryExistsById } from "./rules/categoryExistsById.js";

export const deleteValidation = validateRequest([
	param("id").isInt({ min: 1 }).withMessage("Invalid Category ID").bail().custom(categoryExistsById).bail(),
]);
