import { Request, Response } from "express";
import { UnauthorizedError } from "../../../shared/errors/unauthorized.js";
import { AuthenticatedRequest } from "../../../shared/middlewares/authenticated.js";
import { pagination } from "../../../shared/utils/http/pagination.js";
import { sendSuccess } from "../../../shared/utils/http/respond.js";
import {
	createCreatorService,
	deleteCreatorService,
	getAllCreatorsService,
	getCreatorService,
	updateCreatorService,
} from "../services/creatorService.js";
import { CreateCreatorData, CreateCreatorPayload, UpdateCreatorPayload } from "../types/creator.js";

export const getAllCreatorsController = async (req: Request, res: Response) => {
	const { page, limit, offset } = pagination(req.query);

	const result = await getAllCreatorsService({ page, limit, offset });

	return sendSuccess(res, "Creators retrieved successfully", {
		creators: result.items,
		meta: {
			page: result.page,
			limit: result.limit,
			total: result.total,
			totalPages: result.totalPages,
		},
	});
};

export const createCreatorController = async (req: AuthenticatedRequest, res: Response) => {
	const userId = getAuthenticatedUserId(req);

	const data = req.body as CreateCreatorData;

	const payload: CreateCreatorPayload = {
		user_id: userId,
		...data,
	};

	const creator = await createCreatorService(payload);

	return sendSuccess(res, "Creator created successfully", { creator }, 201);
};

export const getCreatorController = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const creator = await getCreatorService(id);

	return sendSuccess(res, "Creator retrieved successfully", { creator });
};

export const updateMyCreatorController = async (req: AuthenticatedRequest, res: Response) => {
	const userId = getAuthenticatedUserId(req);

	const payload = req.body as UpdateCreatorPayload;

	const creator = await updateCreatorService(userId, payload);

	return sendSuccess(res, "Creator profile updated successfully", { creator });
};

export const updateCreatorController = async (req: Request, res: Response) => {
	const creatorId = Number(req.params.id);

	const payload = req.body as UpdateCreatorPayload;

	const creator = await updateCreatorService(creatorId, payload);

	return sendSuccess(res, "Creator updated successfully", { creator });
};

export const deleteMyCreatorController = async (req: AuthenticatedRequest, res: Response) => {
	const userId = getAuthenticatedUserId(req);

	await deleteCreatorService(userId);

	return sendSuccess(res, "Creator profile deleted successfully", null);
};

export const deleteCreatorController = async (req: Request, res: Response) => {
	const creatorId = Number(req.params.id);

	await deleteCreatorService(creatorId);

	return sendSuccess(res, "Creator deleted successfully", null);
};

function getAuthenticatedUserId(req: AuthenticatedRequest) {
	const userId = req.user?.id;

	if (!userId) {
		throw new UnauthorizedError("Authentication required");
	}

	return userId;
}

