import { useMemo } from 'react';
import type { Actions } from '../ui/tabs.type';
import type { TabsState } from './history-provider';
import { useTabActions, useTabsSelector } from './tabs-selector-hooks';

export const useTabsApi = (): [Actions, TabsState] => {
  const state = useTabsSelector((ctx) => ctx.state);
  const actions = useTabActions();

  return useMemo(() => [actions, state] as const, [actions, state]);
};
