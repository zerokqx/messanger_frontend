import type { ReactNode, RefObject } from 'react';
import type { TabsState, TabsReducerAction } from '../model/history-provider';
import type { TabAnimationVariant } from '../lib';
import type { TabActions } from '../model/tabs-selector-hooks';

interface TabsProps {
  initialTab?: string;
  children?: ReactNode;
  animationVariant?: TabAnimationVariant;
}

export interface Actions {
  push: (v: string) => void;
  back: () => void;
  replace: (v: string) => void;
  reset: (v: string) => void;
  batch: (actions: TabsReducerAction[]) => void;
}
interface TabsUseApiProps {
  children: (props: { actions: Actions; state: TabsState }) => ReactNode;
}

export interface AnimationBaseProps {
  withAnimation?: boolean;
  animationVariant?: TabAnimationVariant;
}

interface TabProps extends AnimationBaseProps {
  children?: ReactNode;
  value: string;
}

export interface ConditionalDisplayProps {
  displayOn: string[];
  children?: ReactNode;
}
export interface VisibilityBaseProps extends AnimationBaseProps {
  when: string[] | ((v: string) => boolean);
  children?: ReactNode;
}
interface BridgeProps {
  saveTo: RefObject<Actions | null>;
}
interface TriggerProps {
  on: unknown;
  reset: string | ((args:{cur: string,actions: TabActions}) => void);
}
export interface TabsComponent {
  (props: TabsProps): ReactNode;
  Tab: (props: TabProps) => ReactNode;
  TabKeepMounted: (props: TabProps) => ReactNode;
  UseApi: (props: TabsUseApiProps) => ReactNode;
  Hide: (props: VisibilityBaseProps) => ReactNode;
  Show: (props: VisibilityBaseProps) => ReactNode;
  Bridge: (props: BridgeProps) => ReactNode;
  useBridgeRef: () => RefObject<Actions | null>;
  MutallyExclusive: (
    props: Omit<VisibilityBaseProps, 'children'> & {
      children: [ReactNode, ReactNode];
    }
  ) => ReactNode;
  Trigger: (props: TriggerProps) => ReactNode;

  ConditionalDisplay: (props: ConditionalDisplayProps) => ReactNode;
}
