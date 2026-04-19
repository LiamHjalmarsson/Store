import { capitalize } from "../utils/capitalize.js";
import { pluralize } from "../utils/pluralize.js";

/**
 * Generates a controller wired to the module service layer.
 */
export function controllerTemplate(
	name: string,
	capitalizedName = capitalize(name),
	pluralizedCapitalizedName = capitalize(pluralize(name)),
) {
	const cap = capitalizedName;
	const pluralCap = pluralizedCapitalizedName;
	const messageConstant = `${name.toUpperCase()}_MESSAGES`;

	return `import { Request, Response } from "express";
import {
	create${cap}Service,
	delete${cap}Service,
	getAll${pluralCap}Service,
	get${cap}Service,
	update${cap}Service,
} from "../services/${name}Service.js";
import { ${messageConstant} } from "../constants/${name}Messages.js";
import { sendSuccess } from "../../../shared/utils/http/respond.js";

export const getAll${pluralize(cap)}Controller = async (_: Request, res: Response) => {
	const ${pluralize(name)} = await getAll${pluralCap}Service();

	return sendSuccess(res, ${messageConstant}.RETRIEVED_ALL, { ${pluralize(name)} });
};

export const create${cap}Controller = async (req: Request, res: Response) => {
	const ${name} = await create${cap}Service(req.body);

	return sendSuccess(res, ${messageConstant}.CREATED, { ${name} }, 201);
};

export const get${cap}Controller = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const ${name} = await get${cap}Service(id);

	return sendSuccess(res, ${messageConstant}.RETRIEVED, { ${name} });
};

export const update${cap}Controller = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const ${name} = await update${cap}Service(id, req.body);

	return sendSuccess(res, ${messageConstant}.UPDATED, { ${name} });
};

export const delete${cap}Controller = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	await delete${cap}Service(id);

	return sendSuccess(res, ${messageConstant}.DELETED, null);
};
`;
}

