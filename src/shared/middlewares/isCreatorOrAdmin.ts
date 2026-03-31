import { createRoleMiddleware } from "./requireRole.js";

export const isCreatorOrAdmin = createRoleMiddleware(["creator", "admin"], "creator or admin");
