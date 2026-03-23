import { Response, NextFunction } from "express";
import { ForbiddenError } from "../errors/forbidden.js";
import { UnauthorizedError } from "../errors/unauthorized.js";
import { AuthenticatedRequest } from "./authenticated.js";

/**
 * Middleware: only allow creator or admin users
 */
export function isCreatorOrAdmin(req: AuthenticatedRequest, _: Response, next: NextFunction) {
	if (!req.user) {
		throw new UnauthorizedError("Unauthorized");
	}

	if (req.user.role !== "creator" && req.user.role !== "admin") {
		throw new ForbiddenError("Forbidden: creator or admin access required");
	}

	next();
}
