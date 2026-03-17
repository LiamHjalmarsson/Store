import { promises as fs } from "fs";

export async function deleteFileIfExists(filePath: string) {
	try {
		await fs.access(filePath);

		await fs.unlink(filePath);
	} catch {
		// File does not exist, ignore
	}
}
