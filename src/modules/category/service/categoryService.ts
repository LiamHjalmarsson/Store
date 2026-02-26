import {
	createNewCategory,
	deleteCategoryById,
	findAllCategories,
	findCategoryById,
	updateCategoryById,
} from "../model/categoryModel.js";
import { CreateCategoryPayload, UpdateCategoryPayload } from "../types/categoryTypes.js";

export const getAllCategoriesService = async () => {
	return await findAllCategories();
};

export const createCategoryService = async (payload: CreateCategoryPayload) => {
	return await createNewCategory(payload);
};

export const getCategoryService = async (categoryId: number) => {
	return await findCategoryById(categoryId);
};

export const updateCategoryService = async (categoryId: number, data: UpdateCategoryPayload) => {
	return await updateCategoryById(categoryId, data);
};

export const deleteCategoryService = async (categoryId: number): Promise<boolean> => {
	return await deleteCategoryById(categoryId);
};
