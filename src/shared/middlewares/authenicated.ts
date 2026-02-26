import { Request, Response, NextFunction } from "express";
import { JwtPayload, verifyToken } from "../utils/jwt.js";
import { UnauthorizedError } from "../errors/unauthorized.js";

export interface AuthenticatedRequest extends Request {
	user?: JwtPayload;
}

/**
 * Middleware: only allow logged in users
 */
export default function authenicated(req: AuthenticatedRequest, res: Response, next: NextFunction) {
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
