import { NotFoundError } from "../../../shared/errors/notFound.js";
import {
	createCategoryQuery,
	deleteCategoryByIdQuery,
	findCategoriesQuery,
	findCategoryByIdQuery,
	updateCategoryByIdQuery,
} from "../repositories/categoryRepository.js";
import { CreateCategoryPayload, UpdateCategoryPayload } from "../types/categoryTypes.js";

export const getAllCategoriesService = async () => {
	return await findCategoriesQuery();
};

export const createCategoryService = async (payload: CreateCategoryPayload) => {
	return await createCategoryQuery(payload);
};

export const getCategoryService = async (categoryId: number) => {
	const category = await findCategoryByIdQuery(categoryId);

	if (!category) {
		throw new NotFoundError("Category not found");
	}

	return category;
};

export const updateCategoryService = async (categoryId: number, data: UpdateCategoryPayload) => {
	const category = await updateCategoryByIdQuery(categoryId, data);

	if (!category) {
		throw new NotFoundError("Category not found");
	}

	return category;
};

export const deleteCategoryService = async (categoryId: number) => {
	const category = await deleteCategoryByIdQuery(categoryId);

	if (!category) {
		throw new NotFoundError("Category not found");
	}

	return true;
};
