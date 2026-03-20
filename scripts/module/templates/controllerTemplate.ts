import { capitalize } from "../utils/capitalize";
import { pluralize } from "../utils/pluralize";

export function controllerTemplate(name: string) {
	const cap = capitalize(name);

	return `
		import { Request, Response } from "express";
		import { sendError, sendSuccess } from "../../../shared/utils/respond.js";

		export const getAll${pluralize(cap)}Controller = async (_: Request, res: Response) => {
		};

		export const create${pluralize(cap)}Controller = async (req: Request, res: Response) => {
		};

		export const get${pluralize(cap)}Controller = async (req: Request, res: Response) => {
		};

		export const update${pluralize(cap)}Controller = async (req: Request, res: Response) => {
		};

		export const delete${pluralize(cap)}Controller = async (req: Request, res: Response) => {
		};

	`;
}
