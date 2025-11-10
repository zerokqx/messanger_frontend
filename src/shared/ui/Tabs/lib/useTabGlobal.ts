import { use } from 'react';
import { TaberContext } from '../model/context';
import type { CreateTabStore } from '../types';

declare global {
  export type TabsSources = 'sidebar' | 'asside';
  export interface TabsWindows {
    sidebar:
      | 'main'
      | 'profile'
      | 'profile_edit'
      | 'settings'
      | 'profile_settings'
      | 'interface_edit';
    asside: 'chats' | 'search' | 'user' | 'profile';
  }
}

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
