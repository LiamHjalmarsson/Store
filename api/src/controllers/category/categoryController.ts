import { Request, Response } from "express";
import { getAllCategoriesService } from "../../services/categoryService.js";

export const getAllCategories = async (req: Request, res: Response) => {
	try {
		const categories = await getAllCategoriesService();

		res.json({ categories });
	} catch (error) {
		res.status(500).json({ message: "Server error", error });
	}
};

export const createCategory = async (req: Request, res: Response) => {};

export const getCategory = async (req: Request, res: Response) => {};

export const updateCategory = async (req: Request, res: Response) => {};

export const deleteCategory = async (req: Request, res: Response) => {};
