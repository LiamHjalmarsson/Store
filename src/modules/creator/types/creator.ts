export interface Creator {
	user_id: number;
	website: string | null;
	bio: string | null;
	social_twitter: string | null;
	social_instagram: string | null;
	social_youtube: string | null;
	verified_creator: boolean;
	featured: boolean;
	total_sales: number;
	total_earnings: number;
	created_at: Date;
	updated_at: Date;
}

export interface PublicCreator {
	id: number;
	email: string;
	firstname: string;
	lastname: string;
	avatar: string | null;
	username: string;
	role: string;
	account_status: string;
	signed_to_newsletter: boolean;
	created_at: Date;

	website: string | null;
	bio: string | null;
	social_twitter: string | null;
	social_instagram: string | null;
	social_youtube: string | null;
	verified_creator: boolean;
	featured: boolean;
	total_sales: number;
	total_earnings: number;
}

export interface CreateCreatorPayload {
	user_id: number;
	website?: string;
	bio?: string;
	social_twitter?: string;
	social_instagram?: string;
	social_youtube?: string;
}

export interface UpdateCreatorPayload {
	website?: string | null;
	bio?: string | null;
	social_twitter?: string | null;
	social_instagram?: string | null;
	social_youtube?: string | null;
	verified_creator?: boolean;
	featured?: boolean;
}
