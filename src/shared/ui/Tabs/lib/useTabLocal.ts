import { use } from 'react';
import { TaberContext } from '../model/context';
import type { CreateTabStore } from '../types';

export const useTabGlobal = <T extends TabsSources, R extends TabsWindows[T]>(
  source: T
): CreateTabStore<R> => {
  const context = use(TaberContext) as Record<
    TabsSources,
    CreateTabStore<R>
  > | null;
  if (!context) throw new Error('Not find Taber Context');
  return context[source];
};
