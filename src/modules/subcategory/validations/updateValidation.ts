import { body, param } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { requireAtLeastOneField } from "../../../shared/validations/fields/requireAtLeastOneField.js";
import { onlyAllowedFields } from "../../../shared/validations/fields/onlyAllowedFields.js";
import { subcategoryExistsById } from "./rules/subcategoryExistsById.js";
import { SUBCATEGORY_FIELDS, categoryIdField, descriptionField, titleField } from "./fields/validationFields.js";

export const updateValidation = validateRequest([
	param("id").isInt({ min: 1 }).withMessage("Invalid subcategory ID").bail().custom(subcategoryExistsById).bail(),

	body().custom(onlyAllowedFields(SUBCATEGORY_FIELDS)).bail(),

	body().custom(requireAtLeastOneField).bail(),

	titleField().optional(),

	categoryIdField().optional(),

	descriptionField(),
]);
