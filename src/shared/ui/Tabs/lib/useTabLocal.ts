import { use } from 'react';
import { TaberLocalContext } from '../model/context';
import type { CreateTabStore } from '../types';

export const useTabGlobal = <T extends TabsSources, R extends TabsWindows[T]>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  source: T
): CreateTabStore<R> => {
  const context = use(TaberLocalContext) as CreateTabStore<R> | null;
  if (!context) throw new Error('Not find Taber Context');
  return context;
};
