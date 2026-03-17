import { promises as fs } from "fs";

export async function readJsonFile<T>(filePath: string): Promise<T> {
	const content = await fs.readFile(filePath, "utf-8");

	return JSON.parse(content) as T;
}
