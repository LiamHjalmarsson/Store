export interface Category {
	id: number;
	title: string;
	description: string | null;
	image: string | null;
	created_at: Date;
	updated_at: Date;
}
