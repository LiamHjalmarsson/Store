import { Request, Response } from "express";
import { deleteUserById, findAllUsers, findUserById, updateUserById } from "../../models/userModel.js";

export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const users = await findAllUsers();

		res.json({ users });
	} catch (err) {
		res.status(500).json({ message: "Server error", error: err });
	}
};
export const createUser = async (req: Request, res: Response) => {};

export const getUser = async (req: Request, res: Response) => {
	try {
		const id = Number(req.params.id);

		const user = await findUserById(id);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.json({ user });
	} catch (error) {
		res.status(500).json({ message: "Server error", error });
	}
};

export const updateUser = async (req: Request, res: Response) => {
	try {
		const id = Number(req.params.id);

		const user = await updateUserById(id, req.body);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.json(user);
	} catch (err) {
		res.status(500).json({ message: "Server error", error: err });
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const id = Number(req.params.id);

		const deleted = await deleteUserById(id);

		if (!deleted) {
			return res.status(404).json({ message: "User not found" });
		}

		res.json({ message: "User deleted" });
	} catch (err) {
		res.status(500).json({ message: "Server error", error: err });
	}
};
