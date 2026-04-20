import { Request, Response } from "express";
import { getPaginationMeta, pagination } from "../../../shared/utils/http/pagination.js";
import { sendSuccess } from "../../../shared/utils/http/respond.js";
import {
	createUserService,
	deleteUserService,
	getAllUsersService,
	getUserService,
	updateUserService,
} from "../services/userService.js";
import { CreateUserPayload, UpdateUserPayload } from "../types/user.js";
import { USER_MESSAGES } from "../constants/userMessages.js";

export const getAllUsersController = async (req: Request, res: Response) => {
	const { page, limit, offset } = pagination(req.query);

	const result = await getAllUsersService({ page, limit, offset });

	return sendSuccess(res, USER_MESSAGES.RETRIEVED_ALL, {
		users: result.items,
		meta: getPaginationMeta(result),
	});
};

export const createUserController = async (req: Request, res: Response) => {
	const payload = req.body as CreateUserPayload;

	const user = await createUserService(payload);

	return sendSuccess(res, USER_MESSAGES.CREATED, { user }, 201);
};

export const getUserController = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const user = await getUserService(id);

	return sendSuccess(res, USER_MESSAGES.RETRIEVED, { user });
};

export const updateUserController = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const payload = req.body as UpdateUserPayload;

	const user = await updateUserService(id, payload);

	return sendSuccess(res, USER_MESSAGES.UPDATED, { user });
};

export const deleteUserController = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	await deleteUserService(id);

	return sendSuccess(res, USER_MESSAGES.DELETED, null);
};
