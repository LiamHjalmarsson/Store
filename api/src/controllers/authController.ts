import { Request, Response } from "express";
import { query } from "../config/database.js";
import { createUser, getUserByEmail } from "../models/userModel.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";

export const register = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const hashedPassword = await hashPassword(password);

		let user = await createUser(email, hashedPassword);

		const token = generateToken({ id: user.id, email: user.email });

		return res.status(201).json({ token });
	} catch (error) {
		res.status(500).json({ message: "Server error", error });
	}
};

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const user = await getUserByEmail(email);

		if (!user) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		const isPasswordMatch = await comparePassword(password, user.password);

		if (!isPasswordMatch) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		const token = generateToken({ id: user.id, email: user.email });

		res.json({ message: "Login endpoint", token });
	} catch (error) {
		res.status(500).json({ message: "Server error", error });
	}
};

export const logout = async (req: Request, res: Response) => {
	res.json({ message: "Logout was successfull" });
};
