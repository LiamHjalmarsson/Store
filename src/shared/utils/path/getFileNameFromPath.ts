import path from "path";

export function getFilenameFromPath(filePath: string): string {
	return path.basename(filePath);
}
