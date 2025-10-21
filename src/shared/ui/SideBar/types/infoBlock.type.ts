import type { ReactNode } from 'react';
import type { IconType } from 'react-icons/lib';

export interface InfoBlockProp {
  accent?: boolean;
  icon?: ReactNode;
  children: ReactNode;
  inline?: boolean;
}
