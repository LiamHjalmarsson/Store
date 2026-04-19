import type { LoginPayload, RegisterPayload } from "../types/auth.js";

export const LOGIN_FIELDS = ["email", "password"] as const satisfies readonly (keyof LoginPayload)[];

export const REGISTER_FIELDS = ["email", "password", "username"] as const satisfies readonly (keyof RegisterPayload)[];
