import type { UseStateHistoryHandlers } from '@mantine/hooks';
import type { ReactNode } from 'react';

import type { ArrayValues } from 'type-fest';
interface TabDataType<V extends string> {
  index: number | undefined;
  name: V | undefined;
}
export interface TaberProviderProp<
  V extends TabsSources,
  W extends readonly TabsWindows[V][],
> {
  source: V;
  windows: W;
  initial: W[number];
  children?: ReactNode;
  onChangeTab?: (args: {
    prev: TabDataType<W[number]>;
    current: TabDataType<W[number]>;
    handlers: TaberProviderActions<V, W>['handlers'];
  }) => void;
}

export interface TaberProviderActions<
  V extends TabsSources,
  W extends readonly TabsWindows[V][],
> {
  handlers: UseStateHistoryHandlers<number>;
  current: {
    index: number;
    name: string;
  };
  meta: {
    windows: W;
  };
}

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
