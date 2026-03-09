export interface Category {
	id: number;
	title: string;
	description: string | null;
	slug: string | null;
	image: string;
	is_featured: boolean;
	created_at: Date;
	updated_at: Date;
}

export interface CategoriesResponse {
	categories: Category[];
}

export interface CategoryResponse {
	category: Category;
}
