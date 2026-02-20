import { Request, Response } from "express";
import { loginUser, registerUser } from "../../services/authService.js";
import { findUserById } from "../../models/user/userModel.js";
import { AuthenticatedRequest } from "../../middlewares/authenicated.js";

export const register = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const { token, user } = await registerUser(email, password);

		return res.status(201).json({ token });
	} catch (error) {
		res.status(500).json({ message: "Server error", error });
	}
};

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const result = await loginUser(email, password);

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
	if (!req.user?.id) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	const user = await findUserById(req.user.id);

	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}

	const safeUser = {
		id: user.id,
		email: user.email,
		firstname: user.firstname,
		lastname: user.lastname,
		avatar: user.avatar,
		username: user.username,
		role: user.role,
	};

	return res.json({ user: safeUser });
};
