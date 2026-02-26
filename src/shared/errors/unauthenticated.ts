import { CustomError } from "./customError.js";

export class UnauthenticatedError extends CustomError {
	constructor(message: string | string[]) {
		const messages = Array.isArray(message) ? message : [message];

		super(messages.length > 1 ? "Validation errors" : messages[0], 401, messages);
	}
}
