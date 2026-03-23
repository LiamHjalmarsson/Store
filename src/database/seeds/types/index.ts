export interface SeedAchievement {
	code: string;
	name: string;
	description: string | null;
	icon: string | null;
	xp_reward: number;
}

export interface SeedCategory {
	title: string;
	description?: string;
	image?: string;
	is_featured?: boolean;
}

export interface SeedProduct {
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

export interface SeedRank {
	name: string;
	min_xp: number;
	badge_url?: string | null;
}

export interface SeedSubcategory {
	category: string;
	items: {
		title: string;
		description: string;
	}[];
}
