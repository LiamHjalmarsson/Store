import { body, param } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { requireAtLeastOneField } from "../../../shared/validations/fields/requireAtLeastOneField.js";
import { onlyAllowedFields } from "../../../shared/validations/fields/onlyAllowedFields.js";
import { categoryExistsById } from "./rules/categoryExistsById.js";
import { descriptionField, imageField, isFeaturedField, titleField } from "./fields/validationFields.js";
import { CATEGORY_FIELDS } from "../constants/categoryFields.js";
import { CATEGORY_MESSAGES } from "../constants/categoryMessages.js";

export const updateValidation = validateRequest([
	param("id").isInt({ min: 1 }).withMessage(CATEGORY_MESSAGES.INVALID_ID).bail().custom(categoryExistsById).bail(),

	body().custom(onlyAllowedFields(CATEGORY_FIELDS)).bail(),

	body().custom(requireAtLeastOneField).bail(),

	titleField().optional(),

	descriptionField(),

	imageField(),

	isFeaturedField(),
]);
