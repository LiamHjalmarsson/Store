import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./authenticated.js";
import { UnauthorizedError } from "../errors/unauthorized.js";
import { ForbiddenError } from "../errors/forbidden.js";

/**
 * Middleware: only allow admin users
 */
export function isAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
	if (!req.user) {
		throw new UnauthorizedError("Unauthorized");
	}

	if (req.user.role !== "admin") {
		throw new ForbiddenError("Forbidden: admin access required");
	}

	next();
}
