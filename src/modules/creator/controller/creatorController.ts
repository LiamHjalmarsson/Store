import { Request, Response } from "express";
import {
	createCreatorService,
	deleteCreatorService,
	getAllCreatorsService,
	getCreatorService,
	updateCreatorService,
} from "../service/creatorService.js";
import { AuthenticatedRequest } from "../../../shared/middlewares/authenicated.js";
import { CreateCreatorPayload } from "../types/creator.js";

export const getAllCreators = async (req: Request, res: Response) => {
	try {
		const creators = await getAllCreatorsService();

		res.json({ creators });
	} catch (err) {
		res.status(500).json({ message: "Server error" });
	}
};

export const createCreator = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const userId = Number(req.user?.id);

		const payload: CreateCreatorPayload = {
			user_id: userId,
			...req.body,
		};

		const creator = await createCreatorService(payload);

		res.json({ creator });
	} catch (error) {
		res.status(404).json({ message: "Server error", error });
	}
};

export const getCreator = async (req: Request, res: Response) => {
	try {
		const id = Number(req.params.id);

		const creator = await getCreatorService(id);

		if (!creator) {
			return res.status(404).json({ message: "Creator not found" });
		}

		res.json({ creator });
	} catch (error) {
		res.status(500).json({ message: "Server error", error });
	}
};

export const updateCreatorProfile = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const userId = Number(req.user?.id);

		if (!req.body) {
			return res.status(400).json({ message: "No fields provided to update" });
		}

		const updated = await updateCreatorService(userId, req.body);

		if (!updated) {
			return res.status(404).json({ message: "Creator not found" });
		}

		res.json({ creator: updated });
	} catch (error) {
		res.status(404).json({ message: "Server error", error });
	}
};

export const updateCreator = async (req: Request, res: Response) => {
	const userId = Number(req.params.id);

	try {
		if (!req.body) {
			return res.status(400).json({ message: "No fields provided to update" });
		}

		const updated = await updateCreatorService(userId, req.body);

		if (!updated) {
			return res.status(404).json({ message: "Creator not found" });
		}

		res.json({ creator: updated });
	} catch (error) {
		res.status(404).json({ message: "Server error", error });
	}
};

export const deleteCreatorProfile = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const userId = Number(req.params.id);

		const deleted = await deleteCreatorService(userId);

		if (!deleted) return res.status(404).json({ message: "Creator profile not found" });

		res.json({ message: "Creator profile deleted successfully" });
	} catch (error) {
		res.status(404).json({ message: "Server error", error });
	}
};

export const deleteCreator = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const userId = Number(req.user?.id);

		const deleted = await deleteCreatorService(userId);

		if (!deleted) return res.status(404).json({ message: "Creator profile not found" });

		res.json({ message: "Creator profile deleted successfully" });
	} catch (error) {
		res.status(404).json({ message: "Server error", error });
	}
};
