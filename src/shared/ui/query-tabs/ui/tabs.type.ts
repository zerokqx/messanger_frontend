import type { ReactNode } from 'react';
import type { TabsContext, TabsReducerAction } from '../model/history-context';

interface TabsProps {
  initialTab?: string;
  children?: ReactNode;
}

export interface Actions {
  push: (v: string) => void;
  back: () => void;
  replace: (v: string) => void;
  reset: (v: string) => void;
  batch: (actions: TabsReducerAction[]) => void;
}
interface TabsUseApiProps {
  children: (props: { actions: Actions; state: TabsContext }) => ReactNode;
}
interface TabProps {
  children?: ReactNode;
  value: string;
}

export interface TabsComponent {
  (props: TabsProps): ReactNode;
  Tab: (props: TabProps) => ReactNode;
  UseApi: (props: TabsUseApiProps) => ReactNode;
}
