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

	return `import { Request, Response } from "express";
import {
	create${cap}Service,
	delete${cap}Service,
	getAll${pluralCap}Service,
	get${cap}Service,
	update${cap}Service,
} from "../service/${name}Service.js";
import { sendSuccess } from "../../../shared/utils/http/respond.js";

export const getAll${pluralize(cap)}Controller = async (_: Request, res: Response) => {
	const ${pluralize(name)} = await getAll${pluralCap}Service();

	return sendSuccess(res, "${pluralCap} retrieved successfully", { ${pluralize(name)} });
};

export const create${cap}Controller = async (req: Request, res: Response) => {
	const ${name} = await create${cap}Service(req.body);

	return sendSuccess(res, "${cap} created successfully", { ${name} }, 201);
};

export const get${cap}Controller = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const ${name} = await get${cap}Service(id);

	return sendSuccess(res, "${cap} retrieved successfully", { ${name} });
};

export const update${cap}Controller = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const ${name} = await update${cap}Service(id, req.body);

	return sendSuccess(res, "${cap} updated successfully", { ${name} });
};

export const delete${cap}Controller = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	await delete${cap}Service(id);

	return sendSuccess(res, "${cap} deleted successfully", null);
};
`;
}

