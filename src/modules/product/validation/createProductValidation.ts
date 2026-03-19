import { body } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { productTitleUniqueForCreatorRule } from "./rules/productTitleUniqueForCreatorRule.js";
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

export const createProductValidation = validateRequest([
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
	productDiscountValueField(),
	body().custom(discountConsistencyRule),
]);
