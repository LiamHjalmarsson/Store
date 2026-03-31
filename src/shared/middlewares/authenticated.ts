import { Request, Response, NextFunction } from "express";
import type { ParamsDictionary } from "express-serve-static-core";
import type { ParsedQs } from "qs";
import { UnauthorizedError } from "../errors/unauthorized.js";
import { verifyToken, type JwtPayload } from "../utils/auth/jwt.js";

export interface AuthenticatedRequest<
	P extends ParamsDictionary = ParamsDictionary,
	ResBody = unknown,
	ReqBody = unknown,
	ReqQuery = ParsedQs,
> extends Request<P, ResBody, ReqBody, ReqQuery> {
	user?: JwtPayload;
}

const BEARER_PREFIX = "Bearer ";

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
	}

	return authorizationHeader.trim();
}
