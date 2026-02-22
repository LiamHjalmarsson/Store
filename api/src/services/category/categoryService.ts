import { findAllCategories, findCategoryById } from "../../models/category/categoryModel.js";

export const getAllCategoriesService = async () => {
	return await findAllCategories();
};

export const getCategoryService = async (categoryId: number) => {
	return await findCategoryById(categoryId);
};
