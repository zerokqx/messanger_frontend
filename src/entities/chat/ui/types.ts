import type { ReactNode } from 'react';

export interface ChatContainerProp {
  children: ReactNode;
}

export interface ChatItemProp {
  lastMessage: string;
  userName: string;
}

export interface ChatConpouned {
  (props: ChatContainerProp): ReactNode;
  Item: (props: ChatItemProp) => ReactNode;
}
