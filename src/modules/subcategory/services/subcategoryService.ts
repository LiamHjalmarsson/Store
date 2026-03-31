import { NotFoundError } from "../../../shared/errors/notFound.js";
import {
	createSubcategoryQuery,
	deleteSubcategoryByIdQuery,
	findAllSubcategoriesQuery,
	findSubcategoryByIdQuery,
	updateSubcategoryByIdQuery,
} from "../repositories/subcategoryRepository.js";
import { CreateSubcategoryPayload, UpdateSubcategoryPayload } from "../types/subcategory.js";

export async function getAllSubcategoriesService(categoryId?: number) {
	return findAllSubcategoriesQuery(categoryId);
}

export async function createSubcategoryService(payload: CreateSubcategoryPayload) {
	return createSubcategoryQuery(payload);
}

export async function getSubcategoryService(subcategoryId: number) {
	const subcategory = await findSubcategoryByIdQuery(subcategoryId);

	if (!subcategory) {
		throw new NotFoundError("Subcategory not found");
	}

	return subcategory;
}

export async function updateSubcategoryService(subcategoryId: number, payload: UpdateSubcategoryPayload) {
	const subcategory = await updateSubcategoryByIdQuery(subcategoryId, payload);

	if (!subcategory) {
		throw new NotFoundError("Subcategory not found");
	}

	return subcategory;
}

export async function deleteSubcategoryService(subcategoryId: number) {
	const deleted = await deleteSubcategoryByIdQuery(subcategoryId);

	if (!deleted) {
		throw new NotFoundError("Subcategory not found");
	}

	return deleted;
}

