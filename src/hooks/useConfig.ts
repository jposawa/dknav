import React from "react";

import { useAtom } from "jotai";

import { fetchRealtimeData } from "@/services";
import { appConfigAtom } from "@/states";
import type { AppConfig } from "@/types";

const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT ?? "stage";
const CONFIG_PATH = `dknav/${ENVIRONMENT}/config`;

export const useConfig = () => {
	const [config, setConfig] = useAtom(appConfigAtom);
	const [isConfigLoading, setIsConfigLoading] = React.useState(!config);

	React.useEffect(() => {
		if (config) {
			return;
		}

		fetchRealtimeData<AppConfig>(CONFIG_PATH)
			.then((data) => {
				if (data) {
					setConfig(data);
				}
			})
			.catch((error) => {
				console.error("[useConfig] Error fetching config:", error);
			})
			.finally(() => {
				setIsConfigLoading(false);
			});
	}, [config, setConfig]);

	return { config, isConfigLoading };
};
