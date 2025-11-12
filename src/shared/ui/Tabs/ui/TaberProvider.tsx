import {
  useListState,
  useLogger,
  useStateHistory,
  type UseStateHistoryHandlers,
  type UseStateHistoryReturnValue,
} from '@mantine/hooks';
import { keys } from 'localforage';
import {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type Context,
  type ReactNode,
} from 'react';
import { useEffectOnce, useStateWithHistory } from 'react-use';
import type { UseStateHistoryReturn } from 'react-use/lib/useStateWithHistory';
import { usesSources } from '../lib/usesSources';
import type {
  TaberProviderActions,
  TaberProviderProp,
} from '../types/taberProvider.type';
import { singletoneContext } from '../lib/singletoneContexts';
import { indexOf } from 'lodash';

export const TaberProvider = <
  V extends TabsSources,
  const W extends readonly TabsWindows[V][],
>({
  source,
  windows,
  children,
  initial,
  onChangeTab,
}: TaberProviderProp<V, W>) => {
  const initialIndex = useMemo(
    () => indexOf(windows, initial as TabsWindows[V]),
    [windows, initial]
  );
  const [, handlers, { current }] = useStateHistory(initialIndex);
  const handleChangeTab = useCallback(() => onChangeTab, [onChangeTab]);

  useEffect(() => {
    memoOnChangeTab?.({
      index: current,
      name: windows[current] as W[number],
    });
  }, [current, windows]);
  useEffectOnce(() => {
    usesSources.add(source);
    return () => {
      usesSources.delete(source);
    };
  });
  const value = useMemo(
    () =>
      ({
        handlers,
        current: {
          index: history.current,
          name: windows[history.current] as string,
        },
      }) satisfies TaberProviderActions,
    [handlers, history, windows]
  );
  const Context = singletoneContext(source);

  return (
    <>
      <Context {...{ value }}>{children}</Context>
    </>
  );
};

export const useTab = (source: TabsSources) => {
  const context = use(singletoneContext(source));
  if (!context) throw new Error('Hook caled in not context');
  return context as TaberProviderActions satisfies TaberProviderActions;
};
