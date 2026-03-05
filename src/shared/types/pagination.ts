export interface PaginationQuery {
	page: number;
	limit: number;
	offset: number;
}

export interface PaginatedResult<T> {
	items: T[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}
