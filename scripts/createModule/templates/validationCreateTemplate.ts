export function validationCreateTemplate(_capitalizedName: string) {
	return `import { validateRequest } from "../../../shared/middlewares/validateRequest.js";

export const createValidation = validateRequest([]);
`;
}
