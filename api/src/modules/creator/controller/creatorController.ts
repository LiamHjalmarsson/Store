import { Request, Response } from "express";
import { getAllCreatorsService, getCreatorService } from "../service/creatorService.js";

export const getAllCreators = async (req: Request, res: Response) => {
	try {
		const creators = await getAllCreatorsService();

		res.json({ creators });
	} catch (err) {
		res.status(500).json({ message: "Server error" });
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
