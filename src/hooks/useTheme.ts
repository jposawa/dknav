import React from "react";

import { useAtom } from "jotai";

import { STORAGE_KEY } from "@/constants";
import { saveStorage } from "@/helpers";
import { themeAtom } from "@/states";

export const useTheme = () => {
	const [theme, setTheme] = useAtom(themeAtom);

	const updateTheme = React.useCallback(
		(targetTheme: "light" | "dark") => {
			saveStorage(STORAGE_KEY.THEME, targetTheme, {
				isPersistent: true,
			});

			setTheme(targetTheme);
		},
		[setTheme],
	);

	const toggleTheme = React.useCallback(() => {
		const targetTheme = theme === "light" ? "dark" : "light";

		updateTheme(targetTheme);
	}, [theme, updateTheme]);

	return { theme, setTheme, toggleTheme };
};
