import api from "../axios";

export interface Category {
	id: number;
	title: string;
	description?: string | null;
	image?: string | null;
	is_featured: boolean;
	created_at: Date;
	updated_at: Date;
}

export interface GetCategoriesResponse {
	categories: Category[];
}

export const getCategories = () => {
	return api.get<GetCategoriesResponse>("/categories");
};
