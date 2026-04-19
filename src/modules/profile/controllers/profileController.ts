import { Response } from "express";
import { deleteProfileService, getProfileService, updateProfileService } from "../services/profileService.js";
import { UpdateProfilePayload } from "../types/profile.js";
import { AuthenticatedRequest } from "../../../shared/middlewares/authenticated.js";
import { sendSuccess } from "../../../shared/utils/http/respond.js";
import { PROFILE_MESSAGES } from "../constants/profileMessages.js";
import { getAuthenticatedUserId } from "../../../shared/utils/auth/getAuthenticatedUserId.js";

export const getProfileController = async (req: AuthenticatedRequest, res: Response) => {
	const userId = getAuthenticatedUserId(req);

	const user = await getProfileService(userId);

	return sendSuccess(res, PROFILE_MESSAGES.RETRIEVED, { user });
};

export const updateProfileController = async (req: AuthenticatedRequest, res: Response) => {
	const userId = getAuthenticatedUserId(req);

	const payload = req.body as UpdateProfilePayload;

	const user = await updateProfileService(userId, payload);

	return sendSuccess(res, PROFILE_MESSAGES.UPDATED, { user });
};

export const deleteProfileController = async (req: AuthenticatedRequest, res: Response) => {
	const userId = getAuthenticatedUserId(req);

	await deleteProfileService(userId);

	return sendSuccess(res, PROFILE_MESSAGES.DELETED, null);
};
