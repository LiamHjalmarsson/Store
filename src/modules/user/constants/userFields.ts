import { CreateUserPayload, UpdateUserPayload } from "../types/user.js";

export const CREATE_USER_FIELDS = [
	"email",
	"password",
	"username",
	"firstname",
	"lastname",
	"avatar",
	"role",
	"account_status",
	"signed_to_newsletter",
] as const satisfies (keyof CreateUserPayload)[];

export const UPDATE_USER_FIELDS = [
	"username",
	"firstname",
	"lastname",
	"avatar",
	"role",
	"account_status",
	"signed_to_newsletter",
] as const satisfies (keyof UpdateUserPayload)[];

