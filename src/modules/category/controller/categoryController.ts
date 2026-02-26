import { Request, Response } from "express";
import {
	createCategoryService,
	deleteCategoryService,
	getAllCategoriesService,
	getCategoryService,
	updateCategoryService,
} from "../service/categoryService.js";
import { NotFoundError } from "../../../shared/errors/notFound.js";

export const getAllCategories = async (_: Request, res: Response) => {
	const categories = await getAllCategoriesService();

	res.json({ categories });
};

export const createCategory = async (req: Request, res: Response) => {
	const category = await createCategoryService(req.body);

	res.json({ category });
};

export const getCategory = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const category = await getCategoryService(id);

	if (!category) {
		throw new NotFoundError("Category not found");
	}

	res.json({ category });
};

export const updateCategory = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const updated = await updateCategoryService(id, req.body);

	if (!updated) {
		throw new NotFoundError("Category not found");
	}

	res.json({ category: updated });
};

export const deleteCategory = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const deleted = await deleteCategoryService(id);

	if (!deleted) {
		throw new NotFoundError("Category not found");
	}

	res.json({ message: "Category deleted" });
};
