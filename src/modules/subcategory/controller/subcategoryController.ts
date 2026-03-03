import { Request, Response } from "express";
import { createSubcategoryService, getAllSubcategoriesService } from "../service/subcategoryService.js";

export const getAllSubcategories = async (req: Request, res: Response) => {
	const categoryId = req.query.category_id ? Number(req.query.category_id) : undefined;

	const subcategories = await getAllSubcategoriesService(categoryId);

	res.json({ subcategories });
};

export const createSubcategory = async (req: Request, res: Response) => {
	const subcategory = await createSubcategoryService(req.body);

	res.status(201).json({ subcategory });
};
