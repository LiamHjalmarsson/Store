import path from "path";

export function getFilenameFromPath(filePath: string) {
	return path.basename(filePath);
}
