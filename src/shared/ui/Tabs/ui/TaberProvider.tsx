import { usePrevious, useStateHistory } from '@mantine/hooks';
import { use, useCallback, useEffect, useMemo } from 'react';
import { useEffectOnce, useLogger } from 'react-use';
import { usesSources } from '../lib/usesSources';
import type {
  TaberProviderActions,
  TaberProviderProp,
} from '../types/taberProvider.type';
import { singletoneContext } from '../lib/singletoneContexts';
import { indexOf } from 'lodash';

export interface UseHistoryString<T extends string[]> {
  initial: T[number];
  strings: T;
}

export const TaberProvider = <
  V extends TabsSources,
  const W extends TabsWindows[V][],
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
  const previousTab = usePrevious(current);
  useEffect(() => {
    if (current >= windows.length) handlers.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);
  useEffect(() => {
    handleChangeTab()?.({
      current: {
        index: current,
        name: windows[current],
      },
      handlers,
      prev: {
        index: previousTab,
        name: windows[previousTab ?? 0],
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, previousTab]);
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
          index: current,
          name: windows[current] as string,
        },
        meta: {
          windows: windows as TabsWindows[V][],
        },
      }) satisfies TaberProviderActions<V, TabsWindows[V][]>,
    [handlers, current, windows]
  );
  const Context = singletoneContext(source);

  return (
    <>
      <Context {...{ value }}>{children}</Context>
    </>
  );
};
