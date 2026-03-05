import { type ContextSelector, useContextSelector } from '@fluentui/react-context-selector';
import React from 'react';
import type { TabsReducerAction } from './history-provider';
import { TabsContext } from './history-context.tsx';
import type { TabsContextValue } from './history-context';

export function useTabsSelector<T>(
  selector: ContextSelector<TabsContextValue, T>
): T {
  const selected = useContextSelector(TabsContext, (ctx) => {
    if (!ctx) throw new Error('useTabsSelector must be used within TabManagerProvider');
    return selector(ctx);
  });
  return selected;
}

export function useTabsDispatch() {
  return useTabsSelector((ctx) => ctx.dispatch);
}

export function useCurrentTab() {
  return useTabsSelector((ctx) => ctx.state.current);
}

function useTabHistory() {
  return useTabsSelector((ctx) => ctx.state.history);
}

export function useTabActions() {
  const dispatch = useTabsDispatch();

  return React.useMemo(
    () => ({
      push: (value: string) => { dispatch({ type: 'PUSH', value }); },
      back: () => { dispatch({ type: 'BACK' }); },
      replace: (value: string) => { dispatch({ type: 'REPLACE', value }); },
      reset: (value: string) => { dispatch({ type: 'RESET', value }); },
      batch: (actions: TabsReducerAction[]) => { dispatch({ type: 'BATCH', actions }); },
    }),
    [dispatch]
  );
}
export type TabActions = ReturnType<typeof useTabActions>
