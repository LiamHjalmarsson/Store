import { createRoleMiddleware } from "./requireRole.js";

export const isAdmin = createRoleMiddleware(["admin"], "admin");
