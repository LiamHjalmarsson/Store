import { promises as fs } from "fs";
import path from "path";

export async function moveFile(from: string, to: string) {
	const targetDir = path.dirname(to);

	await fs.mkdir(targetDir, { recursive: true });

	await fs.rename(from, to);
}
