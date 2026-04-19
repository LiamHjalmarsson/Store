import { body } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { onlyAllowedFields } from "../../../shared/validations/fields/onlyAllowedFields.js";
import { categoryIdField, descriptionField, titleField } from "./fields/validationFields.js";
import { SUBCATEGORY_FIELDS } from "../constants/subcategoryFields.js";

export const createValidation = validateRequest([
	body().custom(onlyAllowedFields(SUBCATEGORY_FIELDS)).bail(),

	titleField(),

	categoryIdField(),

	descriptionField(),
]);

