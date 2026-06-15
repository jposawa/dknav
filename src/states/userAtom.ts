import { atom } from "jotai";

import type { User } from "@/types";

export const isAuthenticatedAtom = atom<boolean>(false);
export const isAuthLoadingAtom = atom<boolean>(true);
export const currentUserAtom = atom<User | null>(null);
