import api from "../../../api/axios";
import type { Category } from "../types/category";

export interface GetCategoriesResponse {
	categories: Category[];
}

export const getCategories = () => {
	return api.get<GetCategoriesResponse>("/categories");
};

export const getCategoryBySlug = (slug: string) => {
	return api.get(`categories/${slug}`);
};
