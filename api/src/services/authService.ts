import { createUser, getUserByEmail } from "../models/userModel.js";
import { generateToken } from "../utils/jwt.js";
import { comparePassword, hashPassword } from "../utils/password.js";

export async function registerUser(email: string, password: string) {
	const hashed = await hashPassword(password);

	const user = await createUser(email, hashed);

	const token = generateToken({ id: user.id, email: user.email, role: user.role });

	return { user, token };
}

export async function loginUser(email: string, password: string) {
	const user = await getUserByEmail(email);

	if (!user) {
		return null;
	}

	const match = await comparePassword(password, user.password);

	if (!match) {
		return null;
	}

	const token = generateToken({ id: user.id, email: user.email, role: user.role });

	return { user, token };
}
