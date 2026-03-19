import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors/unauthorized.js";
import { JwtPayload, verifyToken } from "../utils/jwt.js";

export interface AuthenticatedRequest extends Request {
	user?: JwtPayload;
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
