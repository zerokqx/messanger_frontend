import { use } from 'react';
import type { TaberProviderActions } from '../types/taber-provider.type';
import { singletoneContext } from './singletone-contexts';
import type { ArrayIndices } from 'type-fest';
import { indexOf } from 'lodash';

export const useTab = <
  V extends TabsSources,
  W extends readonly TabsWindows[V][],
>(
  source: V
) => {
  const context = use(singletoneContext(source));
  if (!context) throw new Error('Hook caled in not context');
  return context as TaberProviderActions<V, W> satisfies TaberProviderActions<
    V,
    W
  >;
};

export const useIndexOfWindows = <
  V extends TabsSources,
  W extends TabsWindows[V][],
>(
  value: Extract<W[number], TabsWindows[V]>,
  source: V
) => {
  const context = use(singletoneContext(source));
  if (!context) throw new Error('Hook caled in not context');
  const typedContext = context as TaberProviderActions<
    V,
    W
  > satisfies TaberProviderActions<V, W>;
  const windows = typedContext.meta.windows;
  const index = indexOf(windows, value);
};
