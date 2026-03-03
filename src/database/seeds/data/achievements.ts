import { CreateAchievementPayload } from "../../../modules/achievements/types/achievementTypes.js";

export const achievements: CreateAchievementPayload[] = [
	{
		code: "FIRST_PURCHASE",
		name: "First Purchase",
		description: "Completed your first purchase",
		xp_reward: 100,
		icon: null,
	},
	{
		code: "FIRST_SALE",
		name: "First Sale",
		description: "Sold your first product",
		xp_reward: 250,
		icon: null,
	},
	{
		code: "TOP_CREATOR",
		name: "Top Creator",
		description: "Reached 100 sales",
		xp_reward: 1000,
		icon: null,
	},
	{
		code: "PROFILE_COMPLETE",
		name: "Profile Complete",
		description: "Completed your creator profile",
		xp_reward: 150,
		icon: null,
	},
	{
		code: "FIVE_PURCHASES",
		name: "Shopping Spree",
		description: "Completed 5 purchases",
		xp_reward: 200,
		icon: null,
	},
	{
		code: "TEN_SALES",
		name: "Rising Seller",
		description: "Reached 10 total sales",
		xp_reward: 400,
		icon: null,
	},
	{
		code: "HUNDRED_PURCHASES",
		name: "Power Buyer",
		description: "Completed 100 purchases",
		xp_reward: 1200,
		icon: null,
	},
	{
		code: "FEATURED_PRODUCT",
		name: "Featured Creator",
		description: "Had a product featured on the homepage",
		xp_reward: 800,
		icon: null,
	},
	{
		code: "FIRST_REVIEW",
		name: "First Feedback",
		description: "Received your first product review",
		xp_reward: 150,
		icon: null,
	},
];
