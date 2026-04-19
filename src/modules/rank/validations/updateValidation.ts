import { body, param } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { requireAtLeastOneField } from "../../../shared/validations/fields/requireAtLeastOneField.js";
import { onlyAllowedFields } from "../../../shared/validations/fields/onlyAllowedFields.js";
import { rankExistsById } from "./rules/rankExistsById.js";
import { badgeUrlField, minXpField, nameField } from "./fields/validationFields.js";
import { RANK_FIELDS } from "../constants/rankFields.js";

export const updateValidation = validateRequest([
	param("id").isInt({ min: 1 }).withMessage("Invalid rank ID").bail().custom(rankExistsById).bail(),

	body().custom(onlyAllowedFields(RANK_FIELDS)).bail(),

	body().custom(requireAtLeastOneField).bail(),

	nameField().optional(),

	minXpField().optional(),

	badgeUrlField(),
]);
