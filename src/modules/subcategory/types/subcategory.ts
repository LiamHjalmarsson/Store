export interface Subcategory {
	id: number;
	title: string;
	category_id: number;
	description: string | null;
	created_at: Date | string;
}

export interface CreateSubcategoryPayload {
	title: string;
	category_id: number;
	description?: string | null;
}

export type UpdateSubcategoryPayload = Partial<CreateSubcategoryPayload>;
