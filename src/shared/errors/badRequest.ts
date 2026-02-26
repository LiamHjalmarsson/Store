import { CustomError } from "./customError.js";

export class BadRequestError extends CustomError {
	constructor(message: string | string[]) {
		const messages = Array.isArray(message) ? message : [message];

		super(messages.length > 1 ? "Validation errors" : messages[0], 400, messages);
	}
}
