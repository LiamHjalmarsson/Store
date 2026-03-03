export type PayoutMethod = "stripe" | "bank" | "other" | null;

export interface Creator {
	user_id: number;
	website: string | null;
	bio: string | null;
	verified_creator: boolean;
	featured: boolean;
	total_sales: number;
	total_earnings: number;
	created_at: Date | string;
	updated_at: Date | string;
	stripe_account_id: string | null;
	payout_method: PayoutMethod;
}

export type PublicCreator = Omit<Creator, "stripe_account_id">;

export interface CreateCreatorPayload {
	user_id: number;
	website?: string | null;
	bio?: string | null;
	stripe_account_id?: string | null;
	payout_method?: PayoutMethod;
}

export interface UpdateCreatorPayload {
	website?: string | null;
	bio?: string | null;
	verified_creator?: boolean;
	featured?: boolean;
	stripe_account_id?: string | null;
	payout_method?: PayoutMethod;
}
