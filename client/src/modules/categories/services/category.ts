import api from "@/api/axios";
import { type CategoryResponse, type CategoriesResponse } from "../types/category";

export const getCategories = () => {
	return api.get<CategoriesResponse>("/categories");
};

export const getCategoryBySlug = (slug: string) => {
	return api.get<CategoryResponse>(`categories/${slug}`);
};
