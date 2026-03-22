import { promises as fs } from "fs";
import path from "path";
import { STORAGE_PATHS } from "../../config/storage.js";
import { ensureDirExists } from "../../shared/utils/file/ensureDirExists.js";
import { deleteFileIfExists } from "../../shared/utils/file/deleteFileIfExists.js";

export type StorageDisk = keyof typeof STORAGE_PATHS;

function sanitizePathSegment(value: string): string {
	return value
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9/_-]+/g, "-")
		.replace(/\/{2,}/g, "/")
		.replace(/^\/+|\/+$/g, "");
}

function buildTargetDirectory(disk: StorageDisk, subdirectory?: string): string {
	const baseDirectory = STORAGE_PATHS[disk];

	if (!subdirectory) {
		return baseDirectory;
	}

	return path.join(baseDirectory, sanitizePathSegment(subdirectory));
}

export async function saveFile(
	disk: StorageDisk,
	filename: string,
	buffer: Buffer,
	subdirectory?: string,
): Promise<string> {
	const targetDirectory = buildTargetDirectory(disk, subdirectory);

	await ensureDirExists(targetDirectory);

	const filePath = path.join(targetDirectory, filename);

	await fs.writeFile(filePath, buffer);

	return filePath;
}

export async function deleteFile(disk: StorageDisk, filename: string, subdirectory?: string): Promise<void> {
	const filePath = getFilePath(disk, filename, subdirectory);

	await deleteFileIfExists(filePath);
}

export function getFilePath(disk: StorageDisk, filename: string, subdirectory?: string): string {
	return path.join(buildTargetDirectory(disk, subdirectory), filename);
}

export async function fileExists(disk: StorageDisk, filename: string, subdirectory?: string): Promise<boolean> {
	const filePath = getFilePath(disk, filename, subdirectory);

	try {
		await fs.access(filePath);
		return true;
	} catch {
		return false;
	}
}

export function getPublicFilePath(disk: StorageDisk, filename: string, subdirectory?: string): string {
	if (!subdirectory) {
		return `/uploads/${disk}/${filename}`;
	}

	return `/uploads/${disk}/${sanitizePathSegment(subdirectory)}/${filename}`;
}
