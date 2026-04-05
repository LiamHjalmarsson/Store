import { body } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { onlyAllowedFields } from "../../../shared/validations/fields/onlyAllowedFields.js";
import { descriptionField, imageField, isFeaturedField, titleField } from "./fields/validationFields.js";
import { CATEGORY_FIELDS } from "../constants/categoryFields.js";

export const createValidation = validateRequest([
	body().custom(onlyAllowedFields(CATEGORY_FIELDS)).bail(),

	titleField(),

	descriptionField(),

	imageField(),

	isFeaturedField(),
]);
