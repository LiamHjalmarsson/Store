import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./authenicated.js";

/**
 * Middleware: only allow admin users
 */
export function isAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
	if (!req.user) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	if (req.user.role !== "admin") {
		return res.status(403).json({ message: "Forbidden: admin access required" });
	}

	next();
}
