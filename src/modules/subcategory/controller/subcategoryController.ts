import { Request, Response } from "express";
import { getAllSubcategoriesService } from "../service/subcategoryService.js";

export const getAllSubcategories = async (_: Request, res: Response) => {
	const subcategories = await getAllSubcategoriesService();

	res.json({ subcategories });
};
