import { Response } from "express";
import { AuthenticatedRequest } from "../../../shared/middlewares/authenicated.js";
import { deleteProfileService, getProfileService, updateProfileService } from "../service/profileService.js";
import { NotFoundError } from "../../../shared/errors/notFound.js";

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
	const user = await getProfileService(req.user!.id);

	if (!user) {
		throw new NotFoundError("User not found");
	}

	res.json(user);
};

export const updateProfile = async (req: AuthenticatedRequest, res: Response) => {
	const updated = await updateProfileService(req.user!.id, req.body);

	if (!updated) {
		throw new NotFoundError("User not found");
	}

	res.json(updated);
};

export const deleteProfile = async (req: AuthenticatedRequest, res: Response) => {
	const deleted = await deleteProfileService(req.user!.id);

	if (!deleted) {
		throw new NotFoundError("User not found");
	}

	res.json({ message: "Profile deleted" });
};
