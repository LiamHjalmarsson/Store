import { UpdateProfilePayload } from "../types/profile.js";

export const PROFILE_FIELDS = [
	"firstname",
	"lastname",
	"avatar",
	"username",
	"signed_to_newsletter",
] as const satisfies (keyof UpdateProfilePayload)[];
