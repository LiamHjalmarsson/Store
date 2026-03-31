import { ForbiddenError } from "../../../shared/errors/forbidden.js";
import { UnauthenticatedError } from "../../../shared/errors/unauthenticated.js";
import { UnauthorizedError } from "../../../shared/errors/unauthorized.js";
import { generateToken } from "../../../shared/utils/auth/jwt.js";
import { comparePassword, hashPassword } from "../../../shared/utils/auth/password.js";
import {
	createAuthUserQuery,
	findAuthUserByIdQuery,
	findAuthUserCredentialsByEmailQuery,
	updateUserLastLoginQuery,
} from "../repositories/authRepository.js";
import { AuthUser, LoginPayload, RegisterPayload } from "../types/auth.js";

export const registerService = async (payload: RegisterPayload) => {
	const { email, password, username } = payload;

	const hashedPassword = await hashPassword(password);

	const user = await createAuthUserQuery({ email, password: hashedPassword, username });

	return createAuthResponse(user);
};

export const loginService = async (payload: LoginPayload) => {
	const { email, password } = payload;

	const userCredentials = await findAuthUserCredentialsByEmailQuery(email);

	if (!userCredentials) {
		throw new UnauthenticatedError("Invalid email or password");
	}

	if (userCredentials.account_status !== "active") {
		throw new ForbiddenError(`Account is ${userCredentials.account_status}`);
	}

	const isPasswordMatching = await comparePassword(password, userCredentials.password);

	if (!isPasswordMatching) {
		throw new UnauthenticatedError("Invalid email or password");
	}

	await updateUserLastLoginQuery(userCredentials.id);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { password: _, ...user } = userCredentials;

	return createAuthResponse(user);
};

export const getCurrentUserService = async (userId: number) => {
	const user = await findAuthUserByIdQuery(userId);

	if (!user) {
		throw new UnauthorizedError("User not found");
	}

	return user;
};

function createAuthResponse(user: AuthUser) {
	const token = generateToken({ id: user.id, email: user.email, role: user.role });

	return { user, token };
}

