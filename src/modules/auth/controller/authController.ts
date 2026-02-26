import { Request, Response } from "express";
import { loginService, meService, registerService } from "../service/authService.js";
import { AuthenticatedRequest } from "../../../shared/middlewares/authenicated.js";
import { UnauthenticatedError } from "../../../shared/errors/unauthenticated.js";

export const register = async (req: Request, res: Response) => {
	const { email, password, username } = req.body;

	try {
		const { token, user } = await registerService({ email, password, username });

		return res.status(201).json({ token, user });
	} catch (error) {
		res.status(500).json({ message: "Server error", error });
	}
};

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const result = await loginService(email, password);

	if (!result) {
		throw new UnauthenticatedError("Invalid credentials");
	}

	const { token, user } = result;

	res.json({ token, user });
};

export const logout = async (req: Request, res: Response) => {
	res.json({ message: "Logout was successfull" });
};

export const me = async (req: AuthenticatedRequest, res: Response) => {
	const id = req.user?.id;

	if (!id) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	const user = await meService(id);

	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}

	return res.json({ user });
};
