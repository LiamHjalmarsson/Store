import { Request, Response } from "express";
import { getAllSubcategoriesService } from "../service/subcategoryService.js";

export const getAllSubcategories = async (req: Request, res: Response) => {
	try {
		const subcategories = await getAllSubcategoriesService();

		res.json({ subcategories });
	} catch (error) {
		res.status(500).json({ message: "Server error", error });
	}
};
