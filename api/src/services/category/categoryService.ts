import {
	createNewCategory,
	deleteCategoryById,
	findAllCategories,
	findCategoryById,
	updateCategoryById,
} from "../../models/category/categoryModel.js";
import { Category } from "../../types/category.js";

export const getAllCategoriesService = async () => {
	return await findAllCategories();
};

export const createCategoryService = async (data: Partial<Omit<Category, "id" | "created_at" | "updated_at">>) => {
	return await createNewCategory({
		title: data.title ?? "",
		description: data.description ?? null,
		image: data.image ?? null,
		is_featured: data.is_featured ?? false,
	});
};

export const getCategoryService = async (categoryId: number) => {
	return await findCategoryById(categoryId);
};

export const updateCategoryService = async (categoryId: number, data: Category) => {
	return await updateCategoryById(categoryId, data);
};

export const deleteCategoryService = async (categoryId: number): Promise<boolean> => {
	return await deleteCategoryById(categoryId);
};
