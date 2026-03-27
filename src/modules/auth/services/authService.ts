import { ForbiddenError } from "../../../shared/errors/forbidden.js";
import { UnauthenticatedError } from "../../../shared/errors/unauthenticated.js";
import { UnauthorizedError } from "../../../shared/errors/unauthorized.js";
import { generateToken } from "../../../shared/utils/auth/jwt.js";
import { comparePassword, hashPassword } from "../../../shared/utils/auth/password.js";
import {
	createUserQuery,
	findUserByIdQuery,
	findUserWithPasswordByEmailQuery,
	updateUserLastLoginQuery,
} from "../repositories/authRepository.js";
import { CreateUserPayload } from "../types/auth.js";

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
		throw new UnauthenticatedError("Ogiltiga inloggningsuppgifter");
	}

	if (userWithPassword.account_status !== "active") {
		throw new ForbiddenError(`Account is ${userWithPassword.account_status}`);
	}

	const match = await comparePassword(password, userWithPassword.password);

	if (!match) {
		throw new UnauthenticatedError("Ogiltiga inloggningsuppgifter");
	}

	await updateUserLastLoginQuery(userWithPassword.id);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { password: _, ...user } = userWithPassword;

	const token = generateToken({ id: user.id, email: user.email, role: user.role });

	return { user, token };
}

export async function meService(id: number) {
	const user = await findUserByIdQuery(id);

	if (!user) {
		throw new UnauthorizedError("Användaren hittades inte");
	}

	return user;
}
