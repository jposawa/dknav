import { atom } from 'jotai';

import { getInitialTheme, type Theme } from '@/helpers';

export const themeAtom = atom<Theme>(getInitialTheme());
