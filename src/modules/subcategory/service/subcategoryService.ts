import {
	createNewSubcategory,
	deleteSubcategoryById,
	findAllSubcategories,
	findSubcategoryById,
	updateSubcategoryById,
} from "../model/subcategoryModel.js";
import { CreateSubcategoryPayload, UpdateSubcategoryPayload } from "../types/subcategory.js";

export async function getAllSubcategoriesService(id?: number) {
	return await findAllSubcategories(id);
}

export async function createSubcategoryService(payload: CreateSubcategoryPayload) {
	return await createNewSubcategory(payload);
}

export async function getSubcategoryService(id: number) {
	return await findSubcategoryById(id);
}

export async function updateSubcategoryService(id: number, payload: UpdateSubcategoryPayload) {
	return await updateSubcategoryById(id, payload);
}

export async function deleteSubcategoryService(id: number) {
	return deleteSubcategoryById(id);
}
