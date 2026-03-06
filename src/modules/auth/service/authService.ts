import { generateToken } from "../../../shared/utils/jwt.js";
import { comparePassword, hashPassword } from "../../../shared/utils/password.js";
import { createNewUser, findUserById, findUserWithPasswordByEmail } from "../model/authModel.js";
import { CreateUserPayload } from "../types/authType.js";

export async function registerService(payload: CreateUserPayload) {
	const { password, email, username } = payload;

	const hashedPassword = await hashPassword(password);

	const user = await createNewUser({ email, password: hashedPassword, username });

	const token = generateToken({ id: user.id, email: user.email, role: user.role });

	return { user, token };
}

export async function loginService(email: string, password: string) {
	const userWithPassword = await findUserWithPasswordByEmail(email);

	if (!userWithPassword) {
		return null;
	}

	const match = await comparePassword(password, userWithPassword.password);

	if (!match) {
		return null;
	}

	const user = await findUserById(userWithPassword.id);

	const token = generateToken({ id: user.id, email: user.email, role: user.role });

	return { user, token };
}

export async function meService(id: number) {
	return await findUserById(id);
}
