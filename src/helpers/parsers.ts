import { APP_PREFIX } from "@/constants";
import type { CaseDirection } from "@/types";

const baseCapitalize = (baseString: string) => {
	if (!baseString) {
		console.warn("[baseCapitalize] Received empty string");
		return "";
	}

	const capitalizedString = `${baseString[0].toUpperCase()}${baseString.slice(1)}`;

	return capitalizedString;
};

export const capitalize = (
	baseString: string,
	options: {
		allWords?: boolean;
		separator?: string;
		showDebug?: boolean;
	} = {},
) => {
	if (!baseString) {
		console.warn("[stringCapitalize] Received empty string");
		return "";
	}

	const { allWords = false, separator = " ", showDebug = false } = options;

	if (!allWords) {
		return baseCapitalize(baseString);
	}

	const wordsList = baseString.split(separator);

	const capitalizedWordsList = wordsList.map((word) => baseCapitalize(word));

	const capitalizedString = capitalizedWordsList.join(separator);

	if (showDebug) {
		console.log("[stringCapitalize] results", {
			wordsList,
			capitalizedWordsList,
			capitalizedString,
			separator,
			allWords,
			baseString,
		});
	}

	return capitalizedString;
};

export const withPrefix = (
	baseString: string,
	options: { separator?: string } = {},
) => {
	const { separator = "_" } = options;
	const prefixedString = `${APP_PREFIX}${separator}${baseString}`;

	return prefixedString;
};

export const toSnakeKey = (key: string): string =>
  key.replace(/([A-Z])/g, "_$1").toLowerCase();

export const toCamelKey = (key: string): string => {
  if (key === "_id") return "id";
  return key.replace(/_([a-z])/g, (_, char: string) => char.toUpperCase());
};

export const convertCase = <T extends object>(
  obj: object,
  options: { targetCase: CaseDirection },
): T => {
  const convertKey = options.targetCase === "camel" ? toCamelKey : toSnakeKey;
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [convertKey(key), value]),
  ) as T;
};

