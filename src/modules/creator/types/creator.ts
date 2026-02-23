import { CreatorProfile } from "../../user/types/userType";

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

	stripe_account_id: string | null;
	payout_method: "stripe" | "bank" | "other" | null;
}

export type PublicCreator = Omit<CreatorProfile, "stripe_account_id">;

export interface CreateCreatorPayload {
	user_id: number;
	website?: string;
	bio?: string;
	social_twitter?: string;
	social_instagram?: string;
	social_youtube?: string;
	stripe_account_id?: string | null;
	payout_method?: "stripe" | "bank" | "other" | null;
}

export interface UpdateCreatorPayload {
	website?: string | null;
	bio?: string | null;
	social_twitter?: string | null;
	social_instagram?: string | null;
	social_youtube?: string | null;
	verified_creator?: boolean;
	featured?: boolean;

	stripe_account_id?: string | null;
	payout_method?: "stripe" | "bank" | "other" | null;
}
