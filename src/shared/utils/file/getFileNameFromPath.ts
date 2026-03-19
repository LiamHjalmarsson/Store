import path from "path";

export function getFilenameFromPublicPath(filePath: string): string {
	return path.basename(filePath);
}
