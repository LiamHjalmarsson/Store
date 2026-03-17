import type { ApiError } from "@/types/api";

export type FieldMatcher = Record<string, string[]>;

export type FieldErrors<TFields extends string = string> = Partial<Record<TFields, string>> & {
	general?: string;
};

export function mapFieldErrors<TFields extends string>(
	error: ApiError | null,
	matchers: FieldMatcher,
): FieldErrors<TFields> {
	if (!error) return {};

	const result: FieldErrors<TFields> = {};

	for (const message of error.error.errors) {
		const lowerMessage = message.toLowerCase();

		let matched = false;

		for (const [field, keywords] of Object.entries(matchers)) {
			const hasMatch = keywords.some((keyword) => lowerMessage.includes(keyword.toLowerCase()));

			if (hasMatch) {
				result[field as TFields] = message;

				matched = true;

				break;
			}
		}

		if (!matched && !result.general) {
			result.general = message;
		}
	}

	return result;
}
