import { Request, Response } from "express";
import { sendSuccess } from "../../../shared/utils/http/respond.js";
import {
	createSubcategoryService,
	deleteSubcategoryService,
	getAllSubcategoriesService,
	getSubcategoryService,
	updateSubcategoryService,
} from "../services/subcategoryService.js";
import { CreateSubcategoryPayload, SubcategoryQuery, UpdateSubcategoryPayload } from "../types/subcategory.js";
import { SUCCESS_MESSAGES } from "../../../shared/constants/successMessages.js";

export const getAllSubcategoriesController = async (req: Request, res: Response) => {
	const query = req.query as SubcategoryQuery;

	const categoryId = Number(query.category_id);

	const subcategories = await getAllSubcategoriesService(categoryId);

	return sendSuccess(res, SUCCESS_MESSAGES.RETRIEVED_ALL("Subcategories"), { subcategories });
};

export const createSubcategoryController = async (req: Request, res: Response) => {
	const payload = req.body as CreateSubcategoryPayload;

	const subcategory = await createSubcategoryService(payload);

	return sendSuccess(res, SUCCESS_MESSAGES.CREATED("Subcategory"), { subcategory }, 201);
};

export const getSubcategoryController = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const subcategory = await getSubcategoryService(id);

	return sendSuccess(res, SUCCESS_MESSAGES.RETRIEVED("Subcategory"), { subcategory });
};

export const updateSubcategoryController = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const payload = req.body as UpdateSubcategoryPayload;

	const subcategory = await updateSubcategoryService(id, payload);

	return sendSuccess(res, SUCCESS_MESSAGES.UPDATED("Subcategory"), { subcategory });
};

export const deleteSubcategoryController = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	await deleteSubcategoryService(id);

	return sendSuccess(res, SUCCESS_MESSAGES.DELETED("Subcategory"), null);
};
