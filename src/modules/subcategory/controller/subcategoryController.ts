import { Request, Response } from "express";
import { getAllSubcategoriesService } from "../service/subcategoryService.js";

export const getAllSubcategories = async (req: Request, res: Response) => {
	const subcategories = await getAllSubcategoriesService();

	res.json({ subcategories });
};
