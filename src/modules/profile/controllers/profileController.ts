import { Response } from "express";
import { deleteProfileService, getProfileService, updateProfileService } from "../services/profileService.js";
import { UpdateProfilePayload } from "../types/profile.js";
import { AuthenticatedRequest } from "../../../shared/middlewares/authenticated.js";
import { sendSuccess } from "../../../shared/utils/http/respond.js";
import { UnauthorizedError } from "../../../shared/errors/unauthorized.js";

export const getProfileController = async (req: AuthenticatedRequest, res: Response) => {
	const userId = getAuthenticatedUserId(req);

	const user = await getProfileService(userId);

	return sendSuccess(res, "Profile retrieved successfully", { user });
};

export const updateProfileController = async (req: AuthenticatedRequest, res: Response) => {
	const userId = getAuthenticatedUserId(req);

	const payload = req.body as UpdateProfilePayload;

	const user = await updateProfileService(userId, payload);

	return sendSuccess(res, "Profile updated successfully", { user });
};

export const deleteProfileController = async (req: AuthenticatedRequest, res: Response) => {
	const userId = getAuthenticatedUserId(req);

	await deleteProfileService(userId);

	return sendSuccess(res, "Profile deleted successfully", null);
};

function getAuthenticatedUserId(req: AuthenticatedRequest) {
	const userId = req.user?.id;

	if (!userId) {
		throw new UnauthorizedError("Authentication required");
	}

	return userId;
}

