import { Response } from "express";
import { UnauthorizedError } from "../../../shared/errors/unauthorized.js";
import { AuthenticatedRequest } from "../../../shared/middlewares/authenticated.js";
import { sendSuccess } from "../../../shared/utils/http/respond.js";
import { getCurrentUserService, loginService, registerService } from "../services/authService.js";
import { ERROR_MESSAGES } from "../../../shared/constants/errorMessages.js";
import { LoginRequest, RegisterRequest } from "../types/authRequest.js";
import { AUTH_MESSAGES } from "../constants/authMessages.js";

export const registerController = async (req: RegisterRequest, res: Response) => {
	const payload = req.body;

	const { token, user } = await registerService(payload);

	return sendSuccess(
		res,
		AUTH_MESSAGES.REGISTERED(user.username),
		{
			token,
			user,
		},
		201,
	);
};

export const loginController = async (req: LoginRequest, res: Response) => {
	const payload = req.body;

	const { token, user } = await loginService(payload);

	return sendSuccess(res, AUTH_MESSAGES.LOGGED_IN(user.username), {
		token,
		user,
	});
};

export const logoutController = async (_: AuthenticatedRequest, res: Response) => {
	return sendSuccess(res, AUTH_MESSAGES.USER_LOGGED_OUT, null);
};

export const meController = async (req: AuthenticatedRequest, res: Response) => {
	const userId = getAuthenticatedUserId(req);

	const user = await getCurrentUserService(userId);

	return sendSuccess(res, AUTH_MESSAGES.CURRENT_USER_RETRIEVED(user.username), { user });
};

function getAuthenticatedUserId(req: AuthenticatedRequest) {
	const userId = req.user?.id;

	if (!userId) {
		throw new UnauthorizedError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED);
	}

	return userId;
}
