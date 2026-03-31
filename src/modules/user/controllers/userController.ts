import { Request, Response } from "express";
import { pagination } from "../../../shared/utils/http/pagination.js";
import { sendSuccess } from "../../../shared/utils/http/respond.js";
import {
	createUserService,
	deleteUserService,
	getAllUsersService,
	getUserService,
	updateUserService,
} from "../services/userService.js";
import { CreateUserPayload, UpdateUserPayload, UserParams } from "../types/user.js";

export const getAllUsersController = async (req: Request, res: Response) => {
	const { page, limit, offset } = pagination(req.query);

	const result = await getAllUsersService({ page, limit, offset });

	return sendSuccess(res, "Users retrieved successfully", {
		users: result.items,
		meta: {
			page: result.page,
			limit: result.limit,
			total: result.total,
			totalPages: result.totalPages,
		},
	});
};

export const createUserController = async (req: Request, res: Response) => {
	const payload = req.body as CreateUserPayload;

	const user = await createUserService(payload);

	return sendSuccess(res, "User created successfully", { user }, 201);
};

export const getUserController = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const user = await getUserService(id);

	return sendSuccess(res, "User retrieved successfully", { user });
};

export const updateUserController = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const payload = req.body as UpdateUserPayload;

	const user = await updateUserService(id, payload);

	return sendSuccess(res, "User updated successfully", { user });
};

export const deleteUserController = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	await deleteUserService(id);

	return sendSuccess(res, "User deleted successfully", null);
};
