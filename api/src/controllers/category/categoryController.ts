import { Request, Response } from "express";
import {
	createCategoryService,
	deleteCategoryService,
	getAllCategoriesService,
	getCategoryService,
	updateCategoryService,
} from "../../services/categoryService.js";

export const getAllCategories = async (req: Request, res: Response) => {
	try {
		const categories = await getAllCategoriesService();

		res.json({ categories });
	} catch (error) {
		res.status(500).json({ message: "Server error", error });
	}
};

export const createCategory = async (req: Request, res: Response) => {
	try {
		const category = await createCategoryService(req.body);

		res.json({ category });
	} catch (error) {
		res.status(500).json({ message: "Server error", error });
	}
};

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

export const updateCategory = async (req: Request, res: Response) => {
	try {
		const id = Number(req.params.id);

		console.log(req.body);

		const updated = await updateCategoryService(id, req.body);

		if (!updated) {
			return res.status(404).json({ message: "Category not found" });
		}

		res.json({ category: updated });
	} catch {
		res.status(500).json({ message: "Server error" });
	}
};

export const deleteCategory = async (req: Request, res: Response) => {
	try {
		const id = Number(req.params.id);

		const deleted = await deleteCategoryService(id);

		if (!deleted) {
			return res.status(404).json({ message: "Category not found" });
		}

		res.json({ message: "Category deleted" });
	} catch {
		res.status(500).json({ message: "Server error" });
	}
};
