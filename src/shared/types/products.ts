export interface Product {
	id: number;
	title: string;
	description: string | null;
	price: number;
	category_id: number;
	subcategory_id: number;
	creator_id: number | null;
	image_url: string | null;
	file_url: string | null;
	file_size: number | null;
	is_featured: boolean;
	is_discounted: boolean;
	discounted: number;
	status: "draft" | "published" | "archived";
	created_at: Date;
	updated_at: Date;
	published_at: Date | null;
}

export interface CreateProductPayload {
	title: string;
	description?: string | null;
	price: number;
	category_id: number;
	subcategory_id: number;
	creator_id?: number | null;
	image_url?: string | null;
	file_url?: string | null;
	file_size?: number | null;
	is_featured?: boolean;
	is_discounted?: boolean;
	discounted?: number;
	status?: "draft" | "published" | "archived";
}
