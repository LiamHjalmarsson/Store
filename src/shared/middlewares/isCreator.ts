import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./authenicated.js";

/**
 * Middleware: only allow creator users
 */
export function isCreator(req: AuthenticatedRequest, res: Response, next: NextFunction) {
	if (!req.user) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	if (req.user.role !== "creator") {
		return res.status(403).json({
			message: "Access denied — only creators can perform this action",
		});
	}

	next();
}
