import { use } from 'react';
import { TaberGlobalContext, TaberLocalContext } from '../model/context';
import type { CreateTabStore } from '../types';
import { functions, has } from 'lodash';

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
  const context = use(TaberGlobalContext) as Record<
    TabsSources,
    CreateTabStore<R>
  > | null;
  if (!context) throw new Error('Not find Taber Context');
  return context[source];
};

export function useTab<T extends TabsSources, R extends TabsWindows[T]>(
  sorce: T
): CreateTabStore<R> | null {
  const context = use(TaberGlobalContext) as Record<
    TabsSources,
    CreateTabStore<R>
  > | null;
  if (!context) throw new Error('Called in not context');

  if (has(context, sorce)) {
    return context[sorce];
  }
  return null;
}
