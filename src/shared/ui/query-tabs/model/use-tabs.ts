import type { Dispatch } from 'react';
import type { TabsReducerAction, TabsState } from './history-provider';
import { useTabsDispatch, useTabsSelector } from './tabs-selector-hooks';

export const useTabs = (): readonly [
  TabsState,
  Dispatch<TabsReducerAction>,
] => {
  const state = useTabsSelector((ctx) => ctx.state);
  const dispatch = useTabsDispatch();
  return [state, dispatch] as const;
};
