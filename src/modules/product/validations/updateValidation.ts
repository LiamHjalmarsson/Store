import { body, param } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { requireAtLeastOneField } from "../../../shared/validations/fields/requireAtLeastOneField.js";
import { onlyAllowedFields } from "../../../shared/validations/fields/onlyAllowedFields.js";
import { discountConsistencyRule } from "./rules/discountRule.js";
import {
	productCategoryField,
	productDescriptionField,
	productDiscountedField,
	productDiscountValueField,
	productFeaturedField,
	productFileSizeField,
	productFileUrlField,
	productImageUrlField,
	productPriceField,
	productSubcategoryField,
	productTitleField,
} from "./fields/validationFields.js";
import { productExistsRule } from "./rules/productExistsRule.js";
import { UPDATABLE_PRODUCT_FIELDS } from "../constants/productFields.js";
import { PRODUCT_MESSAGES } from "../constants/productMessages.js";

export const updateValidation = validateRequest([
	param("id").isInt({ min: 1 }).withMessage(PRODUCT_MESSAGES.INVALID_ID).bail().custom(productExistsRule),

	body().custom(onlyAllowedFields(UPDATABLE_PRODUCT_FIELDS)).bail(),

	body().custom(requireAtLeastOneField).bail(),

	productTitleField().optional(),

	productPriceField().optional(),

	productCategoryField().optional(),

	productSubcategoryField().optional(),

	productDescriptionField(),

	productImageUrlField(),

	productFileUrlField(),

	productFileSizeField(),

	productFeaturedField(),

	productDiscountedField(),

	productDiscountValueField(),

	body().custom(discountConsistencyRule),
]);
