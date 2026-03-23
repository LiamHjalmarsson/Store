/**
 * Generates a minimal update validation file ready for real rules.
 */
export function validationUpdateTemplate(_capitalizedName: string) {
	return `import { validateRequest } from "../../../shared/middlewares/validateRequest.js";

export const updateValidation = validateRequest([]);
`;
}
