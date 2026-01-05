import type { Fn } from '@/shared/types/utils/functions';
import type { components } from '@/shared/types/v1';
import type { GridProps, TextProps } from '@mantine/core';
import type { ReactNode } from 'react';

export type SessionData = components['schemas']['UserSessionItem'];

export interface SessionProps {
  session: SessionData;
  onRevoke: Fn<[string], void>;
  children: ReactNode;
  gridProps?: GridProps;
}

export interface SessionCardProps {
  session: SessionData;
  onRevoke: Fn<[string], void>;
}

export interface SessionHeaderProps {
  children: ReactNode;
}

export interface SessionOnlyTrusted {
  children: ReactNode;
}

export interface SessionBodyProps {
  children: ReactNode;
}

export interface SessionFooterProps {
  children: ReactNode;
}
export interface SessionIpProps {
  textProp: TextProps;
}

export interface SessionUserAgentProps {
  textProps: TextProps;
}

export interface SessionComponent {
  (props: SessionProps): ReactNode;
  Header: (props: SessionHeaderProps) => ReactNode;
  Ip: () => ReactNode;
  OnlyTrusted: (props: SessionOnlyTrusted) => ReactNode;
  CreatedAt: () => ReactNode;
  LastRefresh: () => ReactNode;
  Body: (props: SessionBodyProps) => ReactNode;
  Footer: (props: SessionFooterProps) => ReactNode;
  CurrentBadge: () => ReactNode;
  UserAgent: (props: SessionUserAgentProps) => ReactNode;
}
