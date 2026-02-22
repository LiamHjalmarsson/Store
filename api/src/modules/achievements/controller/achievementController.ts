import { Request, Response } from "express";
import {
	awardAchievementService,
	createAchievementService,
	getAchievementsService,
} from "../service/achievementService.js";

export const getAchievements = async (req: Request, res: Response) => {
	const achievements = await getAchievementsService();

	res.json({ achievements });
};

export const createAchievement = async (req: Request, res: Response) => {
	const achievement = await createAchievementService(req.body);

	res.json({ achievement });
};

export const awardAchievement = async (req: Request, res: Response) => {
	const { userId, achievementId } = req.body;

	await awardAchievementService(userId, achievementId);

	res.json({ message: "Achievement awarded" });
};

export const updateAchievement = async (req: Request, res: Response) => {
	const achievement = await createAchievementService(req.body);

	res.json({ achievement });
};

export const deleteAchievement = async (req: Request, res: Response) => {
	const achievement = await createAchievementService(req.body);

	res.json({ achievement });
};
