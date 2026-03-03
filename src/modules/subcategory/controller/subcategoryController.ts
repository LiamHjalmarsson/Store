import { Request, Response } from "express";
import {
	createSubcategoryService,
	getAllSubcategoriesService,
	getSubcategoryService,
} from "../service/subcategoryService.js";
import { NotFoundError } from "../../../shared/errors/notFound.js";

export const getAllSubcategories = async (req: Request, res: Response) => {
	const categoryId = req.query.category_id ? Number(req.query.category_id) : undefined;

	const subcategories = await getAllSubcategoriesService(categoryId);

	res.json({ subcategories });
};

export const createSubcategory = async (req: Request, res: Response) => {
	const subcategory = await createSubcategoryService(req.body);

	res.status(201).json({ subcategory });
};

export const getSubcategory = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const subcategory = await getSubcategoryService(id);

	if (!subcategory) throw new NotFoundError("Subcategory not found");

	res.json({ subcategory });
};
