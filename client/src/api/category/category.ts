import type { Category } from "../../types/category";
import api from "../axios";

export interface GetCategoriesResponse {
	categories: Category[];
}

export const getCategories = () => {
	return api.get<GetCategoriesResponse>("/categories");
};

export const getCategoryBySlug = (slug: string) => {
	return api.get(`categories/${slug}`);
};
