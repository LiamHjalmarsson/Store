import { ERROR_MESSAGES } from "../../../shared/constants/errorMessages.js";
import { NotFoundError } from "../../../shared/errors/notFound.js";
import {
	createCategoryQuery,
	deleteCategoryByIdQuery,
	findCategoriesQuery,
	findCategoryByIdQuery,
	updateCategoryByIdQuery,
} from "../repositories/categoryRepository.js";
import { CreateCategoryPayload, UpdateCategoryPayload } from "../types/category.js";

export const getAllCategoriesService = async () => {
	return findCategoriesQuery();
};

export const createCategoryService = async (payload: CreateCategoryPayload) => {
	return createCategoryQuery(payload);
};

export const getCategoryService = async (categoryId: number) => {
	const category = await findCategoryByIdQuery(categoryId);

	if (!category) {
		throw new NotFoundError(ERROR_MESSAGES.NOT_FOUND("Category"));
	}

	return category;
};

export const updateCategoryService = async (categoryId: number, payload: UpdateCategoryPayload) => {
	const category = await updateCategoryByIdQuery(categoryId, payload);

	if (!category) {
		throw new NotFoundError(ERROR_MESSAGES.NOT_FOUND("Category"));
	}

	return category;
};

export const deleteCategoryService = async (categoryId: number) => {
	const category = await deleteCategoryByIdQuery(categoryId);

	if (!category) {
		throw new NotFoundError(ERROR_MESSAGES.NOT_FOUND("Category"));
	}

	return true;
};
