import { Response } from "express";
import { AuthenticatedRequest } from "../../../shared/middlewares/authenticated.js";
import { deleteProfileService, getProfileService, updateProfileService } from "../service/profileService.js";
import { NotFoundError } from "../../../shared/errors/notFound.js";
import { sendSuccess } from "../../../shared/utils/respond.js";

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
	const user = await getProfileService(req.user!.id);

	if (!user) {
		throw new NotFoundError("User not found");
	}

	return sendSuccess(res, "Profile retrieved successfully", { user });
};

export const updateProfile = async (req: AuthenticatedRequest, res: Response) => {
	const user = await updateProfileService(req.user!.id, req.body);

	if (!user) {
		throw new NotFoundError("User not found");
	}

	return sendSuccess(res, "Profile updated successfully", { user });
};

export const deleteProfile = async (req: AuthenticatedRequest, res: Response) => {
	const deleted = await deleteProfileService(req.user!.id);

	if (!deleted) {
		throw new NotFoundError("User not found");
	}

	return sendSuccess(res, "Profile deleted successfully", null);
};
