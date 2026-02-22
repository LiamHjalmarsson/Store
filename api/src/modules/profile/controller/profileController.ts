import { Response } from "express";
import { AuthenticatedRequest } from "../../../middlewares/authenicated.js";
import { deleteProfileService, getProfileService, updateProfileService } from "../service/profileService.js";

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
	const user = await getProfileService(req.user!.id);

	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}

	res.json(user);
};

export const updateProfile = async (req: AuthenticatedRequest, res: Response) => {
	const updated = await updateProfileService(req.user!.id, req.body);

	if (!updated) {
		return res.status(404).json({ message: "User not found" });
	}

	res.json(updated);
};

export const deleteProfile = async (req: AuthenticatedRequest, res: Response) => {
	const deleted = await deleteProfileService(req.user!.id);

	if (!deleted) {
		return res.status(404).json({ message: "User not found" });
	}

	res.json({ message: "Profile deleted" });
};
