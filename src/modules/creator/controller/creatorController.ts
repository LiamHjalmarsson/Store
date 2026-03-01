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

export const getAllCreators = async (_: Request, res: Response) => {
	const creators = await getAllCreatorsService();

	res.json({ creators });
};

export const createCreator = async (req: AuthenticatedRequest, res: Response) => {
	const userId = Number(req.user?.id);

	const payload: CreateCreatorPayload = {
		user_id: userId,
		...req.body,
	};

	const creator = await createCreatorService(payload);

	res.json({ creator });
};

export const getCreator = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const creator = await getCreatorService(id);

	if (!creator) {
		throw new NotFoundError("Creator not found");
	}

	res.json({ creator });
};

export const updateCreatorProfile = async (req: AuthenticatedRequest, res: Response) => {
	const userId = Number(req.user?.id);

	if (!req.body) {
		return res.status(400).json({ message: "No fields provided to update" });
	}

	const updated = await updateCreatorService(userId, req.body);

	if (!updated) {
		throw new NotFoundError("Creator not found");
	}

	res.json({ creator: updated });
};

export const updateCreator = async (req: Request, res: Response) => {
	const userId = Number(req.params.id);

	if (!req.body) {
		return res.status(400).json({ message: "No fields provided to update" });
	}

	const updated = await updateCreatorService(userId, req.body);

	if (!updated) {
		throw new NotFoundError("Creator not found");
	}

	res.json({ creator: updated });
};

export const deleteCreatorProfile = async (req: AuthenticatedRequest, res: Response) => {
	const userId = Number(req.params.id);

	const deleted = await deleteCreatorService(userId);

	if (!deleted) {
		throw new NotFoundError("Creator profile not found");
	}

	res.json({ message: "Creator profile deleted successfully" });
};

export const deleteCreator = async (req: AuthenticatedRequest, res: Response) => {
	const userId = Number(req.user?.id);

	const deleted = await deleteCreatorService(userId);

	if (!deleted) {
		throw new NotFoundError("Creator profile not found");
	}

	res.json({ message: "Creator profile deleted successfully" });
};
