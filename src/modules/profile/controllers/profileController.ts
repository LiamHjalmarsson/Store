import { Response } from "express";
import { deleteProfileService, getProfileService, updateProfileService } from "../services/profileService.js";
import { UpdateProfilePayload } from "../types/profile.js";
import { AuthenticatedRequest } from "../../../shared/middlewares/authenticated.js";
import { sendSuccess } from "../../../shared/utils/http/respond.js";
import { getAuthenticatedUserId } from "../../../shared/utils/auth/getAuthenticatedUserId.js";
import { SUCCESS_MESSAGES } from "../../../shared/constants/successMessages.js";

export const getProfileController = async (req: AuthenticatedRequest, res: Response) => {
	const userId = getAuthenticatedUserId(req);

	const user = await getProfileService(userId);

	return sendSuccess(res, SUCCESS_MESSAGES.RETRIEVED("Profile"), { user });
};

export const updateProfileController = async (req: AuthenticatedRequest, res: Response) => {
	const userId = getAuthenticatedUserId(req);

	const payload = req.body as UpdateProfilePayload;

	const user = await updateProfileService(userId, payload);

	return sendSuccess(res, SUCCESS_MESSAGES.UPDATED("Profile"), { user });
};

export const deleteProfileController = async (req: AuthenticatedRequest, res: Response) => {
	const userId = getAuthenticatedUserId(req);

	await deleteProfileService(userId);

	return sendSuccess(res, SUCCESS_MESSAGES.DELETED("Profile"), null);
};
