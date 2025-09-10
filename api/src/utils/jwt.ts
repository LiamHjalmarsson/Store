import jwt, { SignOptions } from "jsonwebtoken";
import config from "../config/config.js";

export interface JwtPayload {
	id: number;
	email: string;
}

/**
 * Generate a signed JWT access token
 */
export function generateToken(payload: JwtPayload): string {
	const options: SignOptions = { expiresIn: config.jwtExpiresIn };

	return jwt.sign(payload, config.jwtSecret, options);
}

/**
 * Verify and decode a JWT token
 */
export function verifyToken(token: string): JwtPayload {
	return jwt.verify(token, config.jwtSecret) as JwtPayload;
}
