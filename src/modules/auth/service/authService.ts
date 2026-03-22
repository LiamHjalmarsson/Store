import { generateToken } from "../../../shared/utils/auth/jwt.js";
import { comparePassword, hashPassword } from "../../../shared/utils/auth/password.js";
import { createUserQuery, findUserByIdQuery, findUserWithPasswordByEmailQuery } from "../repository/authRepository.js";
import { CreateUserPayload } from "../types/authType.js";

export async function registerService(payload: CreateUserPayload) {
	const { password, email, username } = payload;

	const hashedPassword = await hashPassword(password);

	const user = await createUserQuery({ email, password: hashedPassword, username });

	const token = generateToken({ id: user.id, email: user.email, role: user.role });

	return { user, token };
}

export async function loginService(email: string, password: string) {
	const userWithPassword = await findUserWithPasswordByEmailQuery(email);

	if (!userWithPassword) {
		return null;
	}

	const match = await comparePassword(password, userWithPassword.password);

	if (!match) {
		return null;
	}

	const user = await findUserByIdQuery(userWithPassword.id);

	const token = generateToken({ id: user.id, email: user.email, role: user.role });

	return { user, token };
}

export async function meService(id: number) {
	return await findUserByIdQuery(id);
}
