import type { RouteConfig } from "@/types";

export const ROUTES = {
  LOGIN: { path: "/login", label: "Entrar" },
  REGISTER: { path: "/register", label: "Criar conta" },
  PROFILE: { path: "/profile", label: "Perfil" },
  MODULES: { path: "/modules", label: "Módulos" },
} as const satisfies Record<string, RouteConfig>;

export const DEFAULT_ROUTE = {
  authenticated: ROUTES.MODULES.path,
  unauthenticated: ROUTES.LOGIN.path,
} as const;
