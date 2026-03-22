export type StorageLocationFromPublicPath = {
	subdirectory: string | null;
	filename: string;
};

export function getStorageLocationFromPublicPath(publicPath: string): StorageLocationFromPublicPath {
	const normalized = publicPath.replace(/^\/+/, "");

	const parts = normalized.split("/");

	if (parts.length < 3) {
		return {
			subdirectory: null,
			filename: parts[parts.length - 1] ?? "",
		};
	}

	const filename = parts[parts.length - 1] ?? "";

	const subdirectoryParts = parts.slice(2, -1);

	return {
		subdirectory: subdirectoryParts.length > 0 ? subdirectoryParts.join("/") : null,
		filename,
	};
}
