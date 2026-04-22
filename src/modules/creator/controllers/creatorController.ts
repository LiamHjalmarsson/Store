import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../../shared/middlewares/authenticated.js";
import { getPaginationMeta, pagination } from "../../../shared/utils/http/pagination.js";
import { sendSuccess } from "../../../shared/utils/http/respond.js";
import {
	createCreatorService,
	deleteCreatorService,
	getAllCreatorsService,
	getCreatorService,
	updateCreatorService,
} from "../services/creatorService.js";
import { CreateCreatorPayload } from "../types/creator.js";
import {
	CreateCreatorRequest,
	DeleteCreatorRequest,
	UpdateCreatorRequest,
	UpdateMyCreatorRequest,
} from "../types/creatorRequest.js";
import { getAuthenticatedUserId } from "../../../shared/utils/auth/getAuthenticatedUserId.js";
import { SUCCESS_MESSAGES } from "../../../shared/constants/sucessMessages.js";

export const getAllCreatorsController = async (req: Request, res: Response) => {
	const { page, limit, offset } = pagination(req.query);

	const result = await getAllCreatorsService({ page, limit, offset });

	return sendSuccess(res, SUCCESS_MESSAGES.RETRIEVED_ALL("Creators"), {
		creators: result.items,
		meta: getPaginationMeta(result),
	});
};

export const createCreatorController = async (req: CreateCreatorRequest, res: Response) => {
	const userId = getAuthenticatedUserId(req);

	const data = req.body;

	const payload: CreateCreatorPayload = {
		user_id: userId,
		...data,
	};

	const creator = await createCreatorService(payload);

	return sendSuccess(res, SUCCESS_MESSAGES.CREATED("Creator"), { creator }, 201);
};

export const getCreatorController = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const creator = await getCreatorService(id);

	return sendSuccess(res, SUCCESS_MESSAGES.RETRIEVED("Creator"), { creator });
};

export const updateMyCreatorController = async (req: UpdateMyCreatorRequest, res: Response) => {
	const userId = getAuthenticatedUserId(req);

	const payload = req.body;

	const creator = await updateCreatorService(userId, payload);

	return sendSuccess(res, SUCCESS_MESSAGES.UPDATED("Creator"), { creator });
};

export const updateCreatorController = async (req: UpdateCreatorRequest, res: Response) => {
	const creatorId = Number(req.params.id);

	const payload = req.body;

	const creator = await updateCreatorService(creatorId, payload);

	return sendSuccess(res, SUCCESS_MESSAGES.UPDATED("Creator"), { creator });
};

export const deleteMyCreatorController = async (req: AuthenticatedRequest, res: Response) => {
	const userId = getAuthenticatedUserId(req);

	await deleteCreatorService(userId);

	return sendSuccess(res, SUCCESS_MESSAGES.DELETED("Creator"), null);
};

export const deleteCreatorController = async (req: DeleteCreatorRequest, res: Response) => {
	const creatorId = Number(req.params.id);

	await deleteCreatorService(creatorId);

	return sendSuccess(res, SUCCESS_MESSAGES.DELETED("Creator"), null);
};
