import { AccountRole, AccountStatus } from "../../../shared/types/user.js";

export type PayoutMethod = "stripe" | "bank" | "other" | null;

export interface Creator {
	user_id: number;
	website: string | null;
	bio: string | null;
	verified_creator: boolean;
	featured: boolean;
	total_sales: number | string;
	total_earnings: number | string;
	created_at: Date | string;
	updated_at: Date | string;
	stripe_account_id: string | null;
	payout_method: PayoutMethod;
}

export interface PublicCreator {
	id: number;
	email: string;
	firstname: string | null;
	lastname: string | null;
	avatar: string | null;
	username: string;
	role: AccountRole;
	account_status: AccountStatus;
	signed_to_newsletter: boolean;
	website: string | null;
	bio: string | null;
	verified_creator: boolean;
	featured: boolean;
	total_sales: number | string;
	total_earnings: number | string;
	payout_method: PayoutMethod;
	created_at: Date | string;
	updated_at: Date | string;
}

export interface CreateCreatorPayload {
	user_id: number;
	website?: string | null;
	bio?: string | null;
	stripe_account_id?: string | null;
	payout_method?: PayoutMethod;
}

export type CreateCreatorData = Omit<CreateCreatorPayload, "user_id">;

export interface UpdateCreatorPayload {
	website?: string | null;
	bio?: string | null;
	verified_creator?: boolean;
	featured?: boolean;
	stripe_account_id?: string | null;
	payout_method?: PayoutMethod;
}
