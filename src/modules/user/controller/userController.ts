import { Request, Response } from "express";
import { deleteUserService, getAllUsersService, getUserService, updateUserService } from "../service/userService.js";
import { NotFoundError } from "../../../shared/errors/notFound.js";

export const getAllUsers = async (_: Request, res: Response) => {
	const users = await getAllUsersService();

	res.json({ users });
};

export const getUser = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const user = await getUserService(id);

	if (!user) {
		throw new NotFoundError("User not found");
	}

	res.json({ user });
};

export const updateUser = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const user = await updateUserService(id, req.body);

	if (!user) {
		throw new NotFoundError("User not found");
	}

	res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const deleted = await deleteUserService(id);

	if (!deleted) {
		throw new NotFoundError("User not found");
	}

	res.json({ message: "User deleted" });
};
