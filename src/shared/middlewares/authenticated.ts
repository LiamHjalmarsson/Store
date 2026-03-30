import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors/unauthorized.js";
import { JwtPayload, verifyToken } from "../utils/auth/jwt.js";

const BEARER_PREFIX = "Bearer ";

export interface AuthenticatedRequest extends Request {
	user?: JwtPayload;
}

/**
 * Middleware: only allow logged in users
 */
export default function authenticated(req: AuthenticatedRequest, _: Response, next: NextFunction) {
	const token = getAuthorizationToken(req.headers.authorization);

	try {
		req.user = verifyToken(token);

		next();
	} catch {
		throw new UnauthorizedError("Authentication required");
	}
}

function getAuthorizationToken(authorizationHeader?: string) {
	if (!authorizationHeader) {
		throw new UnauthorizedError("Authentication required");
	}

	if (authorizationHeader.startsWith(BEARER_PREFIX)) {
		return authorizationHeader.slice(BEARER_PREFIX.length).trim();
	} else {
		return authorizationHeader.trim();
	}
}

