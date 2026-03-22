import { Request, Response } from "express";
import {
	createSubcategoryService,
	deleteSubcategoryService,
	getAllSubcategoriesService,
	getSubcategoryService,
	updateSubcategoryService,
} from "../service/subcategoryService.js";
import { NotFoundError } from "../../../shared/errors/notFound.js";
import { sendSuccess } from "../../../shared/utils/http/respond.js";

export const getAllSubcategories = async (req: Request, res: Response) => {
	const categoryId = req.query.category_id ? Number(req.query.category_id) : undefined;

	const subcategories = await getAllSubcategoriesService(categoryId);

	return sendSuccess(res, "Subcategories retrieved successfully", { subcategories });
};

export const createSubcategory = async (req: Request, res: Response) => {
	const subcategory = await createSubcategoryService(req.body);

	return sendSuccess(res, "Subcategory created successfully", { subcategory }, 201);
};

export const getSubcategory = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const subcategory = await getSubcategoryService(id);

	if (!subcategory) throw new NotFoundError("Subcategory not found");

	return sendSuccess(res, "Subcategory retrieved successfully", { subcategory });
};

export const updateSubcategory = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const subcategory = await updateSubcategoryService(id, req.body);

	if (!subcategory) throw new NotFoundError("Subcategory not found");

	return sendSuccess(res, "Subcategory updated successfully", { subcategory });
};

export const deleteSubcategory = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const deleted = await deleteSubcategoryService(id);

	if (!deleted) throw new NotFoundError("Subcategory not found");

	return sendSuccess(res, "Subcategory deleted successfully", null);
};
