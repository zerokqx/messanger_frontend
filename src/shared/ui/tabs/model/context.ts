import { createContext } from 'react';
import type { CreateTabStore } from '../types';

export const TaberLocalContext = createContext<null | CreateTabStore>(null);

export const TaberGlobalContext = createContext({});
jk
