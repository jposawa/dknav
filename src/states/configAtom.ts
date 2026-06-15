import { atom } from "jotai";

import type { AppConfig } from "@/types";

export const appConfigAtom = atom<AppConfig | null>(null);
