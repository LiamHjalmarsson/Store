import { createRoleMiddleware } from "./requireRole.js";

export const isCreator = createRoleMiddleware(["creator"], "creator");

