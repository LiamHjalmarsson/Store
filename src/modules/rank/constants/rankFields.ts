import { CreateRankPayload } from "../types/rank.js";

export const RANK_FIELDS = ["name", "min_xp", "badge_url"] as const satisfies (keyof CreateRankPayload)[];

