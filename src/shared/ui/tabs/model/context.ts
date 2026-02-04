import { createContext } from 'react';
import { number } from 'zod';
import type { CreateTabStore } from '../types';

export const TaberLocalContext = createContext<null | CreateTabStore>(null);

export const TaberGlobalContext = createContext({});
jk
