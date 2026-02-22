import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./authenicated.js";

/**
 * Middleware: only allow creator users
 */
export function isCreatorOrAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
	if (!req.user) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	if (req.user.role !== "creator" && req.user.role !== "admin") {
		return res.status(403).json({ message: "Access denied — creator or admin required" });
	}

	next();
}
