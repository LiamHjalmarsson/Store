import { findUserById, updateUserById, deleteUserById, createUser, findAllUsers } from "../models/user/userModel.js";
import { User } from "../types/user.js";
import { hashPassword } from "../utils/password.js";

export async function getAllUsersService(): Promise<User[]> {
	return await findAllUsers();
}

export async function createUserService(email: string, password: string): Promise<User | null> {
	const hashedPassword = await hashPassword(password);

	return await createUser(email, hashedPassword);
}

export async function getUserService(userId: number): Promise<User | null> {
	return await findUserById(userId);
}

export async function updateUserService(userId: number, data: Partial<User>): Promise<User | null> {
	return await updateUserById(userId, data);
}

export async function deleteUserService(userId: number): Promise<boolean> {
	const deleted = await deleteUserById(userId);

	return !!deleted;
}
