import { API_PATHS } from "@/constants";
import { convertCase } from "@/helpers";
import type { ApiListResponse, ApiShipModule, ApiShipModuleCreate } from "@/types";
import type { ShipModule } from "@/types";

import { apiClient } from "./api";

const parseJsonField = <T>(value: unknown, fallback: T[] = []): T[] => {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    try { return JSON.parse(value); } catch { return fallback; }
  }
  return fallback;
};

export const fetchModules = async (): Promise<ShipModule[]> => {
  const response = await apiClient.get<ApiListResponse<ApiShipModule>>(
    API_PATHS.modules,
  );

  return response.data.data.map((apiModule) => {
    const converted = convertCase<ShipModule>(apiModule, { targetCase: "camel" });

    return {
      ...converted,
      modifiers: parseJsonField(converted.modifiers),
      features: parseJsonField(converted.features),
      damage: typeof converted.damage === "string"
        ? (() => { try { return JSON.parse(converted.damage); } catch { return undefined; } })()
        : converted.damage,
    };
  });
};

export const createModule = async (
  moduleData: ApiShipModuleCreate,
): Promise<void> => {
  await apiClient.post(API_PATHS.modules, [moduleData]);
};

export const updateModule = async (
  moduleId: string,
  moduleData: Partial<ApiShipModuleCreate>,
): Promise<void> => {
  await apiClient.put(API_PATHS.modules, { _id: moduleId, ...moduleData });
};

export const deleteModule = async (moduleId: string): Promise<void> => {
  await apiClient.delete(API_PATHS.modules, { data: [moduleId] });
};
