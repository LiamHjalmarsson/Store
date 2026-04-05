import { Request, Response } from "express";
import {
	createCategoryService,
	deleteCategoryService,
	getAllCategoriesService,
	getCategoryService,
	updateCategoryService,
} from "../services/categoryService.js";
import { sendSuccess } from "../../../shared/utils/http/respond.js";
import { CATEGORY_MESSAGES } from "../constants/categoryMessages.js";
import { CreateCategoryRequest, DeleteCategoryRequest, UpdateCategoryRequest } from "../types/categoryRequest.js";

export const getAllCategoriesController = async (_: Request, res: Response) => {
	const categories = await getAllCategoriesService();

	return sendSuccess(res, CATEGORY_MESSAGES.RETRIEVED_ALL, { categories });
};

export const createCategoryController = async (req: CreateCategoryRequest, res: Response) => {
	const payload = req.body;

	const category = await createCategoryService(payload);

	return sendSuccess(res, CATEGORY_MESSAGES.CREATED, { category }, 201);
};

export const getCategoryController = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const category = await getCategoryService(id);

	return sendSuccess(res, CATEGORY_MESSAGES.RETRIEVED, { category });
};

export const updateCategoryController = async (req: UpdateCategoryRequest, res: Response) => {
	const id = Number(req.params.id);

	const payload = req.body;

	const category = await updateCategoryService(id, payload);

	return sendSuccess(res, CATEGORY_MESSAGES.UPDATED, { category });
};

export const deleteCategoryController = async (req: DeleteCategoryRequest, res: Response) => {
	const id = Number(req.params.id);

	await deleteCategoryService(id);

	return sendSuccess(res, CATEGORY_MESSAGES.DELETED, null);
};
