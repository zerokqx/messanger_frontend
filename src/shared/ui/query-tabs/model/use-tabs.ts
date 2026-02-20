import type { Dispatch } from 'react';
import {
  type TabsContext,
  type TabsReducerAction,
  useTabManagerIternal,
} from './history-context';

export const useTabs = (): [TabsContext, Dispatch<TabsReducerAction>] => {
  const [state, dispatch] = useTabManagerIternal();
  return [state, dispatch as Dispatch<TabsReducerAction>] as const;
};
