import { generateToken } from "../../../utils/jwt.js";
import { comparePassword, hashPassword } from "../../../utils/password.js";
import { createUser, findUserById, findUserWithPasswordByEmail } from "../model/authModel.js";
import { CreateUserPayload } from "../types/authType.js";

export async function registerUserService(payload: CreateUserPayload) {
	const { password, email, username } = payload;

	const hashedPassword = await hashPassword(password);

	const user = await createUser({ email, password: hashedPassword, username });

	const token = generateToken({ id: user.id, email: user.email, role: user.role });

	return { user, token };
}

export async function loginUserService(email: string, password: string) {
	const user = await findUserWithPasswordByEmail(email);

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
		username: user.username,
		role: user.role,
		account_status: user.account_status,
		signed_to_newsletter: user.account_status,
	};

	return { user: safeUser, token };
}

export async function meService(id: number) {
	return await findUserById(id);
}
