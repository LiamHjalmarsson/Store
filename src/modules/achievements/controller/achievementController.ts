import { Request, Response } from "express";
import {
	awardAchievementService,
	createAchievementService,
	deleteAchievementService,
	getAllAchivementsService,
	updateAchievementService,
} from "../service/achievementService.js";
import { AuthenticatedRequest } from "../../../middlewares/authenicated.js";
import { getUserAchievements } from "../model/achievementModel.js";

export const getAllAchievements = async (req: Request, res: Response) => {
	try {
		const achievements = await getAllAchivementsService();

		res.json({ achievements });
	} catch (error) {
		res.status(500).json({ message: "Server error", error });
	}
};

export const createAchievement = async (req: Request, res: Response) => {
	try {
		const created = await createAchievementService(req.body);

		res.json({ achievement: created });
	} catch (error) {
		res.status(500).json({ message: "Server error", error });
	}
};

export const updateAchievement = async (req: Request, res: Response) => {
	try {
		const id = Number(req.params.id);

		const updated = await updateAchievementService(id, req.body);

		if (!updated) {
			return res.status(404).json({ message: "Achievement not found" });
		}

		res.json({ achievement: updated });
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
	try {
		const userId = Number(req.user?.id);

		const achievements = await getUserAchievements(userId);

		res.json({ achievements });
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

export const awardAchievement = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const userId = Number(req.user?.id);

		const { achievement_id } = req.body;

		await awardAchievementService(userId, achievement_id);

		res.json({ message: "Achievement awarded" });
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};
