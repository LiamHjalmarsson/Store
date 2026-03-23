export function routesTemplate(name: string, capitalizedName: string, pluralizedCapitalizedName: string) {
	return `import { Router } from "express";
import {
	create${capitalizedName}Controller,
	delete${capitalizedName}Controller,
	getAll${pluralizedCapitalizedName}Controller,
	get${capitalizedName}Controller,
	update${capitalizedName}Controller,
} from "../controller/${name}Controller.js";
import { createValidation } from "../validation/createValidation.js";
import { updateValidation } from "../validation/updateValidation.js";

const router = Router();

router.get("/", getAll${pluralizedCapitalizedName}Controller);
router.get("/:id", get${capitalizedName}Controller);
router.post("/", createValidation, create${capitalizedName}Controller);
router.patch("/:id", updateValidation, update${capitalizedName}Controller);
router.delete("/:id", delete${capitalizedName}Controller);

export default router;
`;
}

