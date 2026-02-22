import { Request, Response } from "express";
import {
	awardAchievementService,
	createAchievementService,
	deleteAchievementService,
	getAchievementsService,
	updateAchievementService,
} from "../service/achievementService.js";
import { AuthenticatedRequest } from "../../../middlewares/authenicated.js";
import { getUserAchievements } from "../model/achievementModel.js";

export const getAchievements = async (req: Request, res: Response) => {
	const achievements = await getAchievementsService();

	res.json({ achievements });
};

export const createAchievement = async (req: Request, res: Response) => {
	try {
		const achievement = await createAchievementService(req.body);

		res.json({ achievement });
	} catch (error) {
		res.status(500).json({ message: "Server error", error });
	}
};

export const updateAchievement = async (req: Request, res: Response) => {
	try {
		const id = Number(req.params.id);

		const achievement = await updateAchievementService(id, req.body);

		if (!achievement) {
			return res.status(404).json({ message: "Achievement not found" });
		}

		res.json({ achievement });
	} catch {
		res.status(500).json({ message: "Server error" });
	}
};

export const deleteAchievement = async (req: Request, res: Response) => {
	try {
		const id = Number(req.params.id);

		const deleted = await deleteAchievementService(id);

		if (!deleted) {
			return res.status(404).json({ message: "Achievement not found" });
		}

		res.json({ message: "Achievement deleted" });
	} catch {
		res.status(500).json({ message: "Server error" });
	}
};

export const getMyAchievements = async (req: AuthenticatedRequest, res: Response) => {
	const userId = Number(req.user?.id);

	const achievements = await getUserAchievements(userId);

	res.json({ achievements });
};

export const awardAchievement = async (req: AuthenticatedRequest, res: Response) => {
	const userId = Number(req.user?.id);

	const { achievement_id } = req.body;

	await awardAchievementService(userId, achievement_id);

	res.json({ message: "Achievement awarded" });
};
