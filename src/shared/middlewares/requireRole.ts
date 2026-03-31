import { NextFunction, Response } from "express";
import { ForbiddenError } from "../errors/forbidden.js";
import { UnauthorizedError } from "../errors/unauthorized.js";
import { AccountRole } from "../types/user.js";
import { AuthenticatedRequest } from "./authenticated.js";

export function requireAuthenticatedUser(req: AuthenticatedRequest) {
	const user = req.user;

	if (!user) {
		throw new UnauthorizedError("Authentication required");
	}

	return user;
}

export function createRoleMiddleware(allowedRoles: AccountRole[], roleDescription: string) {
	return (req: AuthenticatedRequest, _: Response, next: NextFunction) => {
		const user = requireAuthenticatedUser(req);

		if (!allowedRoles.includes(user.role)) {
			throw new ForbiddenError(`Forbidden: ${roleDescription} access required`);
		}

		next();
	};
}
