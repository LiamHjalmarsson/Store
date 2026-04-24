import { Request, Response } from "express";
import {
	createCategoryService,
	deleteCategoryService,
	getAllCategoriesService,
	getCategoryService,
	updateCategoryService,
} from "../services/categoryService.js";
import { sendSuccess } from "../../../shared/utils/http/respond.js";
import { CreateCategoryRequest, DeleteCategoryRequest, UpdateCategoryRequest } from "../types/categoryRequest.js";
import { SUCCESS_MESSAGES } from "../../../shared/constants/successMessages.js";

export const getAllCategoriesController = async (_: Request, res: Response) => {
	const categories = await getAllCategoriesService();

	return sendSuccess(res, SUCCESS_MESSAGES.RETRIEVED_ALL("categories"), { categories });
};

export const createCategoryController = async (req: CreateCategoryRequest, res: Response) => {
	const payload = req.body;

	const category = await createCategoryService(payload);

	return sendSuccess(res, SUCCESS_MESSAGES.CREATED("category"), { category }, 201);
};

export const getCategoryController = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const category = await getCategoryService(id);

	return sendSuccess(res, SUCCESS_MESSAGES.RETRIEVED("category"), { category });
};

export const updateCategoryController = async (req: UpdateCategoryRequest, res: Response) => {
	const id = Number(req.params.id);

	const payload = req.body;

	const category = await updateCategoryService(id, payload);

	return sendSuccess(res, SUCCESS_MESSAGES.UPDATED("category"), { category });
};

export const deleteCategoryController = async (req: DeleteCategoryRequest, res: Response) => {
	const id = Number(req.params.id);

	await deleteCategoryService(id);

	return sendSuccess(res, SUCCESS_MESSAGES.DELETED("category"), null);
};
