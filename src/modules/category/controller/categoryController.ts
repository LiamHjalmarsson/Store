import { Request, Response } from "express";
import {
	createCategoryService,
	deleteCategoryService,
	getAllCategoriesService,
	getCategoryService,
	updateCategoryService,
} from "../service/categoryService.js";
import { NotFoundError } from "../../../shared/errors/notFound.js";
import { sendSuccess } from "../../../shared/utils/http/respond.js";

export const getAllCategories = async (_: Request, res: Response) => {
	const categories = await getAllCategoriesService();

	return sendSuccess(res, "Categories retrieved successfully", { categories });
};

export const createCategory = async (req: Request, res: Response) => {
	const category = await createCategoryService(req.body);

	return sendSuccess(res, "Category created successfully", { category }, 201);
};

export const getCategory = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const category = await getCategoryService(id);

	if (!category) {
		throw new NotFoundError("Category not found");
	}

	return sendSuccess(res, "Category retriveved successfully", { category });
};

export const updateCategory = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const category = await updateCategoryService(id, req.body);

	if (!category) {
		throw new NotFoundError("Category not found");
	}

	return sendSuccess(res, "Category updated successfully", { category });
};

export const deleteCategory = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const category = await deleteCategoryService(id);

	if (!category) {
		throw new NotFoundError("Category not found");
	}

	return sendSuccess(res, "Category deleted successfully", null);
};
