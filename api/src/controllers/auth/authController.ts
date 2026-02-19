import { Request, Response } from "express";
import { loginUser, registerUser } from "../../services/authService.js";

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
