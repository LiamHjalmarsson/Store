import { promises as fs } from "fs";

export async function ensureDirExists(dir: string) {
	await fs.mkdir(dir, { recursive: true });
}
