import { PaginationQuery } from "../../../shared/types/pagination.js";
import {
	createNewProduct,
	deleteProductById,
	findAllProducts,
	findProductById,
	updateProductById,
} from "../model/productModel.js";
import { CreateProductPayload, UpdateProductPayload } from "../types/product.js";

export const getAllProductsService = async (pagination: PaginationQuery) => {
	return await findAllProducts(pagination);
};

export const createProductService = async (id: number, payload: CreateProductPayload) => {
	return await createNewProduct(id, payload);
};

export const getProductService = async (id: number) => {
	return await findProductById(id);
};

export const updateProductService = async (id: number, creatorId: number, payload: UpdateProductPayload) => {
	return await updateProductById(id, creatorId, payload);
};

export const deleteProductService = async (id: number, creatorId: number) => {
	return await deleteProductById(id, creatorId);
};
