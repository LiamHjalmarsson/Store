import { body } from "express-validator";

export const productTitleField = () =>
	body("title")
		.trim()
		.notEmpty()
		.withMessage("Title is required")
		.isLength({ min: 3, max: 120 })
		.withMessage("Title must be between 3 and 120 characters");

export const productPriceField = () =>
	body("price")
		.notEmpty()
		.withMessage("Price is required")
		.isFloat({ min: 0 })
		.withMessage("Price must be 0 or higher")
		.toFloat();

export const productCategoryField = () =>
	body("category_id")
		.notEmpty()
		.withMessage("category_id is required")
		.isInt({ min: 1 })
		.withMessage("Invalid category_id")
		.toInt();

export const productSubcategoryField = () =>
	body("subcategory_id")
		.notEmpty()
		.withMessage("subcategory_id is required")
		.isInt({ min: 1 })
		.withMessage("Invalid subcategory_id")
		.toInt();

export const productDescriptionField = () =>
	body("description")
		.optional({ nullable: true })
		.trim()
		.isLength({ max: 2000 })
		.withMessage("Description max 2000 characters");

export const productImageUrlField = () =>
	body("image_url")
		.optional({ nullable: true })
		.isString()
		.withMessage("image_url must be a string")
		.isLength({ max: 500 })
		.withMessage("image_url is too long");

export const productFileUrlField = () =>
	body("file_url")
		.optional({ nullable: true })
		.isString()
		.withMessage("file_url must be a string")
		.isLength({ max: 500 })
		.withMessage("file_url is too long");

export const productFileSizeField = () =>
	body("file_size")
		.optional({ nullable: true })
		.isInt({ min: 0 })
		.withMessage("file_size must be 0 or higher")
		.toInt();

export const productFeaturedField = () =>
	body("is_featured").optional().isBoolean().withMessage("is_featured must be true/false");

export const productDiscountedField = () =>
	body("is_discounted").optional().isBoolean().withMessage("is_discounted must be true/false");

export const productDiscountValueField = () =>
	body("discounted").optional().isFloat({ min: 0 }).withMessage("discounted must be 0 or higher").toFloat();
