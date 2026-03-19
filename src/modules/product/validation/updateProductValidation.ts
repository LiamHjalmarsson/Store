import { body, param } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { requireAtLeastOneField } from "../../../shared/validation/utils/requireAtLeastOneField.js";
import { onlyAllowedFields } from "../../../shared/validation/utils/onlyAllowedFields.js";
import { productExistsRule } from "./rules/productExistsRule.js";
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

const allowedFields = [
	"title",
	"description",
	"price",
	"category_id",
	"subcategory_id",
	"image_url",
	"file_url",
	"file_size",
	"is_featured",
	"is_discounted",
	"discounted",
] as const;

export const updateProductValidation = validateRequest([
	param("id").isInt({ min: 1 }).withMessage("Invalid product ID").bail().custom(productExistsRule),
	body().custom(requireAtLeastOneField).bail(),
	body().custom(onlyAllowedFields(allowedFields)).bail(),
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
