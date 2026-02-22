export interface Category {
	id: number;
	title: string;
	// slug: string;
	description: string | null;
	image: string | null;
	is_featured: boolean;
	// parent_id?: number | null;
	created_at: Date;
	updated_at: Date;
}

export interface CreateCategoryPayload {
	title: string;
	slug?: string;
	description?: string;
	image?: string;
	is_featured?: boolean;
	parent_id?: number;
}

export interface UpdateCategoryPayload {
	title?: string;
	slug?: string;
	description?: string;
	image?: string;
	is_featured?: boolean;
}
