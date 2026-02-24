import { Request, Response, NextFunction } from "express";
import { JwtPayload, verifyToken } from "../utils/jwt.js";

export interface AuthenticatedRequest extends Request {
	user?: JwtPayload;
}

/**
 * Middleware: only allow logged in users
 */
export default function authenicated(req: AuthenticatedRequest, res: Response, next: NextFunction) {
	const authHeader = req.headers["authorization"];

	if (!authHeader) {
		return res.status(401).json({ message: "No token provided" });
	}

	const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : authHeader.trim();

	try {
		const decoded = verifyToken(token);

		req.user = decoded;

		next();
	} catch {
		res.status(401).json({ message: "Invalid or expired token" });
	}
}
