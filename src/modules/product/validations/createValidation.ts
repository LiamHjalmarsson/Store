import { body } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { onlyAllowedFields } from "../../../shared/validations/fields/onlyAllowedFields.js";
import { discountConsistencyRule } from "./rules/discountRule.js";
import { productTitleUniqueForCreatorRule } from "./rules/productTitleUniqueForCreatorRule.js";
import {
	PRODUCT_FIELDS,
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

export const createValidation = validateRequest([
	body().custom(onlyAllowedFields(PRODUCT_FIELDS)).bail(),

	productTitleField().custom(productTitleUniqueForCreatorRule),

	productPriceField(),

	productCategoryField(),

	productSubcategoryField(),

	productDescriptionField(),

	productImageUrlField(),

	productFileUrlField(),

	productFileSizeField(),

	productFeaturedField(),

	productDiscountedField(),

	productDiscountValueField(),

	body().custom(discountConsistencyRule),
]);
