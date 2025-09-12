import { Request, Response } from "express";

export const profile = (req: Request, res: Response) => {
	res.json({ message: "User profile endpoint" });
};

export const updateProfile = (req: Request, res: Response) => {
	res.json({ message: "Update profile endpoint" });
};

export const deleteProfile = (req: Request, res: Response) => {
	res.json({ message: "Delete profile endpoint" });
};
