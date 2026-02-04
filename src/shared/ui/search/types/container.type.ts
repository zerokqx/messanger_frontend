import type { ReactNode } from 'react';
import type { SearchItemProp } from './item.type';

export interface SearchContainerProp {
  children?: ReactNode;
}

export interface SearchCompouned {
  (props: SearchContainerProp): ReactNode;
  Item: (props: SearchItemProp) => ReactNode;
}
