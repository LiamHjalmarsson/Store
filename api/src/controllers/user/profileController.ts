import { Response } from "express";
import { findUserById, updateUserById, deleteUserById } from "../../models/userModel.js";
import { AuthenticatedRequest } from "../../middlewares/authenicated.js";

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
	if (req.user) {
		const user = await findUserById(req.user.id);

		if (!user) return res.status(404).json({ message: "User not found" });

		res.json(user);
	}
};

export const updateProfile = async (req: AuthenticatedRequest, res: Response) => {
	if (req.user) {
		const updated = await updateUserById(req.user.id, req.body);

		if (!updated) return res.status(404).json({ message: "User not found" });

		res.json(updated);
	}
};

export const deleteProfile = async (req: AuthenticatedRequest, res: Response) => {
	if (req.user) {
		const deleted = await deleteUserById(req.user.id);

		if (!deleted) return res.status(404).json({ message: "User not found" });

		res.json({ message: "Profile deleted" });
	}
};
