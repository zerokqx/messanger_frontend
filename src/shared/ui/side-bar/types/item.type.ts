import type { ComponentProps, ReactNode } from 'react';

export interface SideItemProps {
  children?: ReactNode;
  onClick?: ComponentProps<'button'>['onClick'];
  icon: ReactNode;
}
