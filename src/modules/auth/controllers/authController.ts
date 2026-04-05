import { Request, Response } from "express";
import { UnauthorizedError } from "../../../shared/errors/unauthorized.js";
import { AuthenticatedRequest } from "../../../shared/middlewares/authenticated.js";
import { NoParams, NoResponseBody } from "../../../shared/types/request.js";
import { sendSuccess } from "../../../shared/utils/http/respond.js";
import { getCurrentUserService, loginService, registerService } from "../services/authService.js";
import { LoginPayload, RegisterPayload } from "../types/auth.js";
import { ERROR_MESSAGES } from "../../../shared/constants/errorMessages.js";

type RegisterRequest = Request<NoParams, NoResponseBody, RegisterPayload>;

type LoginRequest = Request<NoParams, NoResponseBody, LoginPayload>;

export const registerController = async (req: RegisterRequest, res: Response) => {
	const payload = req.body;

	const { token, user } = await registerService(payload);

	return sendSuccess(
		res,
		`User ${user.username} registered successfully`,
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

	return sendSuccess(res, `User ${user.username} logged in successfully`, {
		token,
		user,
	});
};

export const logoutController = async (_: AuthenticatedRequest, res: Response) => {
	return sendSuccess(res, "User logged out successfully", null);
};

export const meController = async (req: AuthenticatedRequest, res: Response) => {
	const userId = getAuthenticatedUserId(req);

	const user = await getCurrentUserService(userId);

	return sendSuccess(res, `User ${user.username} retrieved successfully`, { user });
};

function getAuthenticatedUserId(req: AuthenticatedRequest) {
	const userId = req.user?.id;

	if (!userId) {
		throw new UnauthorizedError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED);
	}

	return userId;
}
