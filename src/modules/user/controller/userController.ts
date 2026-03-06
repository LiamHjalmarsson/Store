import { Request, Response } from "express";
import {
	createUserService,
	deleteUserService,
	getAllUsersService,
	getUserService,
	updateUserService,
} from "../service/userService.js";
import { NotFoundError } from "../../../shared/errors/notFound.js";
import { pagination } from "../../../shared/utils/pagination.js";

export const getAllUsers = async (req: Request, res: Response) => {
	const { page, limit, offset } = pagination(req.query);

	const result = await getAllUsersService({ page, limit, offset });

	res.json({
		users: result.items,
		meta: {
			page: result.page,
			limit: result.limit,
			total: result.total,
			totalPages: result.totalPages,
		},
	});
};

export const createUser = async (req: Request, res: Response) => {
	const user = await createUserService(req.body);

	res.status(201).json({ user });
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
