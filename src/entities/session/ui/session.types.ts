import type { UserSessionItem } from '@/shared/api/orval/auth-service/auth-service.schemas';
import type { GridProps, TextProps } from '@mantine/core';
import type { ReactNode } from 'react';
import type { DividerProps as DividerPropsMantine } from '@mantine/core';

export type SessionData = UserSessionItem;

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
