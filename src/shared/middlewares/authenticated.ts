import type { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors/unauthorized.js";
import { verifyToken } from "../utils/auth/jwt.js";
import type { JwtPayload } from "../utils/auth/jwt.js";

export interface AuthenticatedRequest extends Request {
	user?: JwtPayload;
}

export type AuthenticatedMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;

export function getAuthenticatedUserOrThrow(req: AuthenticatedRequest): JwtPayload {
	const user = req.user;

	if (!user) {
		throw new UnauthorizedError("Unauthorized");
	}

	return user;
}

/**
 * Middleware: only allow logged in users
 */
export default function authenticated(req: AuthenticatedRequest, _: Response, next: NextFunction) {
	const authHeader = req.headers["authorization"];

	if (!authHeader) {
		throw new UnauthorizedError("authentication invalid");
	}

	const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : authHeader.trim();

	try {
		const decoded = verifyToken(token);

		req.user = decoded;

		next();
	} catch {
		throw new UnauthorizedError("authentication invalid");
	}
}

