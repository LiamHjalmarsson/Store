export interface Category {
	id: number;
	title: string;
	description: string | null;
	image: string | null;
	is_featured: boolean;
	created_at: Date;
	updated_at: Date;
}

export interface CreateCategoryPayload {
	title: string;
	description?: string;
	image?: string;
	is_featured?: boolean;
}

export type UpdateCategoryPayload = Partial<CreateCategoryPayload>;
