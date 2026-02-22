import { createNewCategory, deleteCategoryById, updateCategoryById } from "../../../models/category/categoryModel.js";
import { Category } from "../../../types/category.js";

export const createCategoryService = async (data: Partial<Omit<Category, "id" | "created_at" | "updated_at">>) => {
	return await createNewCategory({
		title: data.title ?? "",
		description: data.description ?? null,
		image: data.image ?? null,
		is_featured: data.is_featured ?? false,
	});
};

export const updateCategoryService = async (categoryId: number, data: Category) => {
	return await updateCategoryById(categoryId, data);
};

export const deleteCategoryService = async (categoryId: number): Promise<boolean> => {
	return await deleteCategoryById(categoryId);
};
