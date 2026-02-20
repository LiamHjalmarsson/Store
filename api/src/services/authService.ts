import { createUser, CreateUserPayload, getUserByEmail } from "../models/user/userModel.js";
import { generateToken } from "../utils/jwt.js";
import { comparePassword, hashPassword } from "../utils/password.js";

export async function registerUser(payload: CreateUserPayload) {
	const { password, email, username } = payload;

	const hashedPassword = await hashPassword(password);

	const user = await createUser({ email, password: hashedPassword, username });

	const token = generateToken({ id: user.id, email: user.email, role: user.role });

	const safeUser = {
		id: user.id,
		email: user.email,
		firstname: user.firstname,
		lastname: user.lastname,
		avatar: user.avatar,
		username: user.username,
		role: user.role,
	};

	return { user: safeUser, token };
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

	const safeUser = {
		id: user.id,
		email: user.email,
		firstname: user.firstname,
		lastname: user.lastname,
		avatar: user.avatar,
		username: user.username,
		role: user.role,
	};

	return { user: safeUser, token };
}
