import { findAllCategories } from "../models/category/categoryModel.js";
import { Category } from "../types/category.js";

export const getAllCategoriesService = async () => {
	return await findAllCategories();
};

export const createCategoryService = async (data: Partial<Omit<Category, "id" | "created_at" | "updated_at">>) => {};

export const getCategoryService = async (categoryId: number) => {};

export const updateCategoryService = async (
	categoryId: number,
	data: Partial<Omit<Category, "id" | "created_at" | "updated_at">>
) => {};

export const deleteCategoryService = async (categoryId: number): Promise<boolean> => {
	return false;
};
