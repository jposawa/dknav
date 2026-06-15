import { STORAGE_KEY } from '@/constants';
import type { User } from '@/types';

import { withPrefix } from './parsers';

export type Theme = 'light' | 'dark';

export const getInitialTheme = (): Theme => {
	const stored = loadStorage<Theme>(STORAGE_KEY.THEME, { isPersistent: true });

	if (stored === 'light' || stored === 'dark') {
		return stored;
	}

	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const getInitialUser = (): User | null => {
	return loadStorage<User>(STORAGE_KEY.USER, { needParse: true, isPersistent: true });
};

export const saveStorage = <T>(
	key: string,
	value: T,
	options: {
		needParse?: boolean;
		isPersistent?: boolean;
	} = {},
) => {
	const { needParse = false, isPersistent = false } = options;
	const storage = isPersistent ? localStorage : sessionStorage;
	const formattedKey = withPrefix(key);
	const formattedValue = needParse ? JSON.stringify(value) : `${value}`;

	storage.setItem(formattedKey, formattedValue);
};

export const loadStorage = <T>(
	key: string,
	options: { needParse?: boolean; isPersistent?: boolean } = {},
): T | null => {
	const { needParse = false, isPersistent = false } = options;
	const storage = isPersistent ? localStorage : sessionStorage;
	const formattedKey = withPrefix(key);
	const value = storage.getItem(formattedKey);

	if (!value) {
		return null;
	}

	const parsedValue = needParse ? JSON.parse(value) : value;

	return parsedValue;
};

export const removeStorage = (key: string, isPersistent = false) => {
	const storage = isPersistent ? localStorage : sessionStorage;
	const formattedKey = withPrefix(key);

	storage.removeItem(formattedKey);
};
