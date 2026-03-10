import { Request, Response } from "express";
import {
	createCreatorService,
	deleteCreatorService,
	getAllCreatorsService,
	getCreatorService,
	updateCreatorService,
} from "../service/creatorService.js";
import { AuthenticatedRequest } from "../../../shared/middlewares/authenticated.js";
import { CreateCreatorPayload } from "../types/creator.js";
import { NotFoundError } from "../../../shared/errors/notFound.js";
import { pagination } from "../../../shared/utils/pagination.js";
import { sendSuccess } from "../../../shared/utils/respond.js";

export const getAllCreators = async (req: Request, res: Response) => {
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

export const createCreator = async (req: AuthenticatedRequest, res: Response) => {
	const userId = Number(req.user?.id);

	const payload: CreateCreatorPayload = {
		user_id: userId,
		...req.body,
	};

	const creator = await createCreatorService(payload);

	return sendSuccess(res, "Creator created successfully", { creator }, 201);
};

export const getCreator = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const creator = await getCreatorService(id);

	if (!creator) {
		throw new NotFoundError("Creator not found");
	}

	return sendSuccess(res, "Creator retrieved successfully", { creator });
};

export const updateCreatorProfile = async (req: AuthenticatedRequest, res: Response) => {
	const userId = Number(req.user?.id);

	const creator = await updateCreatorService(userId, req.body);

	if (!creator) {
		throw new NotFoundError("Creator not found");
	}

	return sendSuccess(res, "Creator profile updated successfully", { creator });
};

export const updateCreator = async (req: Request, res: Response) => {
	const userId = Number(req.params.id);

	const creator = await updateCreatorService(userId, req.body);

	if (!creator) {
		throw new NotFoundError("Creator not found");
	}

	return sendSuccess(res, "Creator updated successfully", { creator });
};

export const deleteCreatorProfile = async (req: AuthenticatedRequest, res: Response) => {
	const userId = Number(req.user?.id);

	const deleted = await deleteCreatorService(userId);

	if (!deleted) {
		throw new NotFoundError("Creator profile not found");
	}

	return sendSuccess(res, "Creator profile deleted successfully", null);
};

export const deleteCreator = async (req: AuthenticatedRequest, res: Response) => {
	const userId = Number(req.params.id);

	const deleted = await deleteCreatorService(userId);

	if (!deleted) {
		throw new NotFoundError("Creator profile not found");
	}

	return sendSuccess(res, "Creator deleted successfully", null);
};
