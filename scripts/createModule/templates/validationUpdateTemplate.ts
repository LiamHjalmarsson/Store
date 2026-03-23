export function validationUpdateTemplate(_capitalizedName: string) {
	return `import { validateRequest } from "../../../shared/middlewares/validateRequest.js";

export const updateValidation = validateRequest([]);
`;
}
