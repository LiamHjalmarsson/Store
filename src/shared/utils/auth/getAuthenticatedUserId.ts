import { ERROR_MESSAGES } from "../../constants/errorMessages.js";
import { UnauthorizedError } from "../../errors/unauthorized.js";
import type { AuthenticatedRequest } from "../../middlewares/authenticated.js";

export function getAuthenticatedUserId(req: AuthenticatedRequest) {
	const userId = req.user?.id;

	if (userId === undefined || userId === null) {
		throw new UnauthorizedError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED);
	}

	return userId;
}

