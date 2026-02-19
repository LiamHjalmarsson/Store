import { Request, Response } from "express";
import { getAllCategoriesService, getCategoryService } from "../../services/categoryService.js";

export const getAllCategories = async (req: Request, res: Response) => {
	try {
		const categories = await getAllCategoriesService();

		res.json({ categories });
	} catch (error) {
		res.status(500).json({ message: "Server error", error });
	}
};

export const createCategory = async (req: Request, res: Response) => {};

export const getCategory = async (req: Request, res: Response) => {
	try {
		const id = Number(req.params.id);

		const category = await getCategoryService(id);

		if (!category) {
			return res.status(404).json({ message: "Category not found" });
		}

		res.json({ category });
	} catch (error) {
		res.status(500).json({ message: "Server error", error });
	}
};

export const updateCategory = async (req: Request, res: Response) => {};

export const deleteCategory = async (req: Request, res: Response) => {};
