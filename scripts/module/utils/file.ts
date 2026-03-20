import fs from "node:fs";

export function writeFileIfNotExists(path: string, content: string) {
	if (!fs.existsSync(path)) {
		fs.writeFileSync(path, content, "utf8");
	}
}
