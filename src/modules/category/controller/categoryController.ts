import { Request, Response } from "express";
import {
	createCategoryService,
	deleteCategoryService,
	getAllCategoriesService,
	getCategoryService,
	updateCategoryService,
} from "../service/categoryService.js";
import { sendSuccess } from "../../../shared/utils/http/respond.js";

export const getAllCategoriesController = async (_: Request, res: Response) => {
	const categories = await getAllCategoriesService();

	return sendSuccess(res, "Categories retrieved successfully", { categories });
};

export const createCategoryController = async (req: Request, res: Response) => {
	const category = await createCategoryService(req.body);

	return sendSuccess(res, "Category created successfully", { category }, 201);
};

export const getCategoryController = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const category = await getCategoryService(id);

	return sendSuccess(res, "Category retriveved successfully", { category });
};

export const updateCategoryController = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const category = await updateCategoryService(id, req.body);

	return sendSuccess(res, "Category updated successfully", { category });
};

export const deleteCategoryController = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	await deleteCategoryService(id);

	return sendSuccess(res, "Category deleted successfully", null);
};
