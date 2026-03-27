import { Request, Response } from "express";
import { loginService, meService, registerService } from "../services/authService.js";
import { AuthenticatedRequest } from "../../../shared/middlewares/authenticated.js";
import { UnauthorizedError } from "../../../shared/errors/unauthorized.js";
import { sendSuccess } from "../../../shared/utils/http/respond.js";

export const registerController = async (req: Request, res: Response) => {
	const { email, password, username } = req.body;

	const { token, user } = await registerService({ email, password, username });

	return sendSuccess(
		res,
		`Användare ${user.username} har registrerats`,
		{
			token,
			user,
		},
		201,
	);
};

export const loginController = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const result = await loginService(email, password);

	const { token, user } = result;

	return sendSuccess(res, `Användaren ${user.username} loggades in`, {
		token,
		user,
	});
};

export const logoutController = async (_: AuthenticatedRequest, res: Response) => {
	return sendSuccess(res, `loggades ut.`, null);
};

export const meController = async (req: AuthenticatedRequest, res: Response) => {
	const id = req.user?.id;

	if (!id) {
		throw new UnauthorizedError("Obehörig");
	}

	const user = await meService(id);

	return sendSuccess(res, "Autentiserad användare hämtades", { user });
};
