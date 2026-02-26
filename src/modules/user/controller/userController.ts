import { Request, Response } from "express";
import { deleteUserService, getAllUsersService, getUserService, updateUserService } from "../service/userService.js";

export const getAllUsers = async (req: Request, res: Response) => {
	const users = await getAllUsersService();

	res.json({ users });
};

export const getUser = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const user = await getUserService(id);

	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}

	res.json({ user });
};

export const updateUser = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const user = await updateUserService(id, req.body);

	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}

	res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const deleted = await deleteUserService(id);

	if (!deleted) {
		return res.status(404).json({ message: "User not found" });
	}

	res.json({ message: "User deleted" });
};
