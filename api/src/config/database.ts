import { Pool, PoolConfig, QueryResult, QueryResultRow } from "pg";
import config from "./config.js";

const poolConfig: PoolConfig = {
	user: config.pgUser,
	host: config.pgHost,
	database: config.pgDb,
	password: config.pgPassword,
	port: config.pgPort,
};

const pool = new Pool(poolConfig);

type PgParam = null | undefined | string | number | boolean | Date | Buffer | bigint;

/**
 * Helper for running typed SQL queries using pg.
 * Exempel:
 * const result = await query<User>("SELECT * FROM users WHERE id = $1", [id]);
 */
export async function query<T extends QueryResultRow>(text: string, params: PgParam[] = []): Promise<QueryResult<T>> {
	return pool.query<T>(text, params);
}

export default pool;
