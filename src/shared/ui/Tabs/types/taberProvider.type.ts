import type {
  UseStateHistoryHandlers,
  UseStateHistoryReturnValue,
} from '@mantine/hooks';
import type { ReactNode } from 'react';
import type { UseStateHistoryReturn } from 'react-use/lib/useStateWithHistory';

export interface TaberProviderProp<
  V extends TabsSources,
  W extends readonly TabsWindows[V][],
> {
  source: V;
  windows: W;
  initial: W[number];
  children?: ReactNode;
  onPostChangeTab?: (reset: () => void) => void;
  onPreChangeTab?: (next: { index: number; name: W[number] }) => null | boolean;
  onChangeTab?: (prev: { index: number; name: W[number] }) => null | boolean;
}

export interface TaberProviderActions {
  handlers: UseStateHistoryHandlers<number>;
  current: {
    index: number;
    name: string;
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
