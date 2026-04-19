import { CreateCreatorPayload, UpdateCreatorPayload } from "../types/creator.js";

export const CREATOR_FIELDS = [
	"website",
	"bio",
	"stripe_account_id",
	"payout_method",
] as const satisfies readonly (keyof CreateCreatorPayload)[];

export const ADMIN_CREATOR_FIELDS = [
	"website",
	"bio",
	"verified_creator",
	"featured",
	"stripe_account_id",
	"payout_method",
] as const satisfies readonly (keyof UpdateCreatorPayload)[];

export const UPDATABLE_CREATOR_FIELDS = [
	"website",
	"bio",
	"verified_creator",
	"featured",
	"stripe_account_id",
	"payout_method",
] as const satisfies readonly (keyof UpdateCreatorPayload)[];
