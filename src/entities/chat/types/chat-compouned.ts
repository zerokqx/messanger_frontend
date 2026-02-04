import type { ReactNode } from 'react';
import type { ChatContainerProp } from './chat-container-prop';
import type { ChatItemProp } from './chat-item-prop';

export interface ChatConpouned {
  (props: ChatContainerProp): ReactNode;
  Item: (props: ChatItemProp) => ReactNode;
}
