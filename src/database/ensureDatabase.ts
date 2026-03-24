/* eslint-disable no-console */
import { Client } from "pg";
import config from "../config/config.js";

export async function ensureDatabaseExists() {
	const client = new Client({
		user: config.pgUser,
		host: config.pgHost,
		password: config.pgPassword,
		port: config.pgPort,
		database: "postgres",
	});

	await client.connect();

	try {
		const result = await client.query("SELECT 1 FROM pg_database WHERE datname = $1", [config.pgDb]);

		if ((result.rowCount ?? 0) > 0) {
			console.log(`Database "${config.pgDb}" already exists`);

			return;
		}

		await client.query(`CREATE DATABASE "${config.pgDb}"`);

		console.log(`Database "${config.pgDb}" created`);
	} finally {
		await client.end();
	}
}
