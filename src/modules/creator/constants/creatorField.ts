export const CREATOR_FIELDS = ["website", "bio", "stripe_account_id", "payout_method"] as const;

export const ADMIN_CREATOR_FIELDS = [
	"website",
	"bio",
	"verified_creator",
	"featured",
	"stripe_account_id",
	"payout_method",
] as const;

export const UPDATABLE_CREATOR_FIELDS = [
	"website",
	"bio",
	"verified_creator",
	"featured",
	"stripe_account_id",
	"payout_method",
] as const;
