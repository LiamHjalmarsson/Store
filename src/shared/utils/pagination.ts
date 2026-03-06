import { Request } from "express";

export interface PaginationOptions {
	defaultPage?: number;
	defaultLimit?: number;
	maxLimit?: number;
}

export interface PaginationResult {
	page: number;
	limit: number;
	offset: number;
}

export function pagination(query: Request["query"], options: PaginationOptions = {}) {
	const defaultPage = options.defaultPage ?? 1;

	const defaultLimit = options.defaultLimit ?? 1;

	const maxLimit = options.maxLimit ?? 100;

	const page = Number(query.page) > 0 ? Number(query.page) : defaultPage;

	const limit = Number(query.limit) > 0 ? Math.min(Number(query.limit), maxLimit) : defaultLimit;

	return {
		page,
		limit,
		offset: (page - 1) * limit,
	};
}
