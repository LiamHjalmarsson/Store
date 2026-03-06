export interface Category {
	id: number;
	title: string;
	description: string | null;
	image: string;
	is_featured: boolean;
	created_at: Date;
	updated_at: Date;
}
