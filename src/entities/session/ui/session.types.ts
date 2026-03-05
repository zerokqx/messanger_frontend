import type { Fn } from '@/shared/types/utils/functions';
import type { components } from '@/shared/types/v1';
import type { GridProps, TextProps } from '@mantine/core';
import type { ReactNode } from 'react';
import type { DividerProps as DividerPropsMantine } from '@mantine/core';

export type SessionData = components['schemas']['UserSessionItem'];

type DividerProps =
  | {
      withDivider?: false;
      dividerProps?: never;
    }
  | {
      withDivider: true;
      dividerProps?: DividerPropsMantine;
    };
export interface SessionProps {
  session: SessionData;
  gridProps?: GridProps;
  children: ReactNode;
}

interface SessionCardProps {
  session: SessionData;
  onRevoke: Fn<[string], void>;
}

export interface SessionHeaderProps {
  children: ReactNode;
}

export interface SessionTrusted {
  children: ReactNode;
  trusted?: boolean;
}

export type SessionBodyProps = DividerProps & {
  children: ReactNode;
};

export type SessionFooterProps = DividerProps & {
  children: ReactNode;
};

export interface SessionUserAgentProps {
  textProps?: TextProps;
}

export interface SessionIpProps {
  textProps?: TextProps;
}

export interface SessionComponent {
  (props: SessionProps): ReactNode;
  Header: (props: SessionHeaderProps) => ReactNode;
  Ip: (props: SessionIpProps) => ReactNode;
  Trusted: (props: SessionTrusted) => ReactNode;
  CreatedAt: () => ReactNode;
  LastRefresh: () => ReactNode;
  Body: (props: SessionBodyProps) => ReactNode;
  Footer: (props: SessionFooterProps) => ReactNode;
  CurrentBadge: () => ReactNode;
  UserAgent: (props: SessionUserAgentProps) => ReactNode;
  ThisDevice: () => ReactNode;
}
