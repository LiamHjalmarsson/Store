import { Response, NextFunction } from "express";
import { ForbiddenError } from "../errors/forbidden.js";
import { UnauthorizedError } from "../errors/unauthorized.js";
import { AuthenticatedRequest } from "./authenticated.js";

/**
 * Middleware: only allow creator users
 */
export function isCreator(req: AuthenticatedRequest, _: Response, next: NextFunction) {
	if (!req.user) {
		throw new UnauthorizedError("Unauthorized");
	}

	if (req.user.role !== "creator") {
		throw new ForbiddenError("Forbidden: creator access required");
	}

	next();
}

