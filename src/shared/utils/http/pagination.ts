import type { Request } from "express";
import type { PaginatedResult, PaginationOptions, PaginationQuery } from "../../types/pagination.js";

export function pagination(query: Request["query"], options: PaginationOptions = {}): PaginationQuery {
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

export function getPaginationMeta<T>(result: PaginatedResult<T>) {
	return {
		page: result.page,
		limit: result.limit,
		total: result.total,
		totalPages: result.totalPages,
	};
}

export function paginationResult<T>(items: T[], total: number, paginationQuery: PaginationQuery): PaginatedResult<T> {
	return {
		items,
		total,
		page: paginationQuery.page,
		limit: paginationQuery.limit,
		totalPages: Math.ceil(total / paginationQuery.limit),
	};
}
