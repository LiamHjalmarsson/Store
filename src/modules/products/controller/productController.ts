import { Request, Response } from "express";
import { getAllProductsService } from "../service/productService.js";

export const getAllProducts = async (req: Request, res: Response) => {
	try {
		const products = await getAllProductsService();

		res.json({ products });
	} catch (error) {
		res.status(500).json({ message: "Server error", error });
	}
};
