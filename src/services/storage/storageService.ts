import { promises as fs } from "fs";
import path from "path";
import { STORAGE_PATHS } from "../../config/storage.js";
import { ensureDirExists } from "../../shared/utils/file/ensureDirExists.js";
import { deleteFileIfExists } from "../../shared/utils/file/deleteFileIfExists.js";

export type StorageDisk = keyof typeof STORAGE_PATHS;

function sanitizeRelativePath(value: string) {
	return value
		.split(/[\\/]+/)
		.map((segment) =>
			segment
				.trim()
				.toLowerCase()
				.replace(/[^a-z0-9_-]+/g, "-")
				.replace(/^-+|-+$/g, ""),
		)
		.filter(Boolean)
		.join("/");
}

function buildSafeAbsolutePath(baseDirectory: string, relativePath: string) {
	const resolvedBaseDirectory = path.resolve(baseDirectory);

	const resolvedTargetPath = path.resolve(resolvedBaseDirectory, relativePath);

	const relativeToBase = path.relative(resolvedBaseDirectory, resolvedTargetPath);

	if (relativeToBase.startsWith("..") || path.isAbsolute(relativeToBase)) {
		throw new Error("Invalid storage path");
	}

	return resolvedTargetPath;
}

function buildTargetDirectory(disk: StorageDisk, subdirectory?: string) {
	const baseDirectory = STORAGE_PATHS[disk];

	if (!subdirectory) {
		return baseDirectory;
	}

	const sanitizedSubdirectory = sanitizeRelativePath(subdirectory);

	if (!sanitizedSubdirectory) {
		return baseDirectory;
	}

	return buildSafeAbsolutePath(baseDirectory, sanitizedSubdirectory);
}

function sanitizeFilename(filename: string) {
	return path.basename(filename);
}

export async function saveFile(disk: StorageDisk, filename: string, buffer: Buffer, subdirectory?: string) {
	const targetDirectory = buildTargetDirectory(disk, subdirectory);

	const safeFilename = sanitizeFilename(filename);

	await ensureDirExists(targetDirectory);

	const filePath = buildSafeAbsolutePath(targetDirectory, safeFilename);

	await fs.writeFile(filePath, buffer);

	return filePath;
}

export async function deleteFile(disk: StorageDisk, filename: string, subdirectory?: string) {
	const filePath = getFilePath(disk, filename, subdirectory);

	await deleteFileIfExists(filePath);
}

export function getFilePath(disk: StorageDisk, filename: string, subdirectory?: string) {
	const targetDirectory = buildTargetDirectory(disk, subdirectory);

	return buildSafeAbsolutePath(targetDirectory, sanitizeFilename(filename));
}

export async function fileExists(disk: StorageDisk, filename: string, subdirectory?: string) {
	const filePath = getFilePath(disk, filename, subdirectory);

	try {
		await fs.access(filePath);
		return true;
	} catch {
		return false;
	}
}

export function getPublicFilePath(disk: StorageDisk, filename: string, subdirectory?: string) {
	const safeFilename = sanitizeFilename(filename);

	if (!subdirectory) {
		return `/uploads/${disk}/${safeFilename}`;
	}

	const sanitizedSubdirectory = sanitizeRelativePath(subdirectory);

	if (!sanitizedSubdirectory) {
		return `/uploads/${disk}/${safeFilename}`;
	}

	return `/uploads/${disk}/${sanitizedSubdirectory}/${safeFilename}`;
}

