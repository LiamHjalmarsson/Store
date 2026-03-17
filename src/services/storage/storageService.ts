import { promises as fs } from "fs";
import path from "path";
import { ensureDirExists } from "../../shared/utils/file/ensureDirExists.js";
import { deleteFileIfExists } from "../../shared/utils/file/deleteFileIfExists.js";
import { STORAGE_PATHS } from "../../config/storage.js";

export type StorageDisk = keyof typeof STORAGE_PATHS;

export async function saveFile(disk: StorageDisk, filename: string, buffer: Buffer): Promise<string> {
	const targetDirectory = STORAGE_PATHS[disk];

	await ensureDirExists(targetDirectory);

	const filePath = path.join(targetDirectory, filename);

	await fs.writeFile(filePath, buffer);

	return filePath;
}

export async function deleteFile(disk: StorageDisk, filename: string): Promise<void> {
	const targetDirectory = STORAGE_PATHS[disk];

	const filePath = path.join(targetDirectory, filename);

	await deleteFileIfExists(filePath);
}

export function getFilePath(disk: StorageDisk, filename: string): string {
	return path.join(STORAGE_PATHS[disk], filename);
}

export function getPublicFilePath(disk: StorageDisk, filename: string): string {
	return `/uploads/${disk}/${filename}`;
}

export async function fileExists(disk: StorageDisk, filename: string): Promise<boolean> {
	const filePath = getFilePath(disk, filename);

	try {
		await fs.access(filePath);

		return true;
	} catch {
		return false;
	}
}
