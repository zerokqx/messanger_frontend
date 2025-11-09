import type { ReactNode } from 'react';
import type { ChatContainerProp } from './ChatContainerProp';
import type { ChatItemProp } from './ChatItemProp';

export interface ChatConpouned {
  (props: ChatContainerProp): ReactNode;
  Item: (props: ChatItemProp) => ReactNode;
}
