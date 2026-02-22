import { Request, Response } from "express";
import { loginUserService, meService, registerUserService } from "../service/authService.js";
import { AuthenticatedRequest } from "../../../middlewares/authenicated.js";

export const register = async (req: Request, res: Response) => {
	const { email, password, username } = req.body;

	try {
		const { token, user } = await registerUserService({ email, password, username });

		return res.status(201).json({ token, user });
	} catch (error) {
		res.status(500).json({ message: "Server error", error });
	}
};

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const result = await loginUserService(email, password);

		if (!result) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		const { token, user } = result;

		res.json({ token, user });
	} catch (error) {
		res.status(500).json({ message: "Server error", error });
	}
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
