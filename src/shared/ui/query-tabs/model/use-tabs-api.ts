import { useMemo } from 'react';
import type { Actions } from '../ui/tabs.type';
import { useTabs } from './use-tabs';
import type { TabsContext } from './history-context';

export const useTabsApi = (): [Actions, TabsContext] => {
  const [state, dispatch] = useTabs();
  const actions = useMemo<Actions>(
    () => ({
      push: (v) => {
        dispatch({ type: 'PUSH', value: v });
      },
      back: () => {
        dispatch({ type: 'BACK' });
      },
      replace: (v) => {
        dispatch({ type: 'REPLACE', value: v });
      },
      reset: (v) => {
        dispatch({ type: 'RESET', value: v });
      },
      batch: (actions) => {
        dispatch({ type: 'BATCH', actions });
      },
    }),
    [dispatch]
  );

  return [actions, state];
};
