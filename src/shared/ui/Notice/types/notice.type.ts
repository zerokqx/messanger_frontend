import type { HTMLMotionProps } from 'motion/react';
import type { ReactNode } from 'react';
import type { DisplayProp } from './display.type';

export type Status = boolean;
export interface NoticeProp extends HTMLMotionProps<'div'> {
}
export interface NoticeCompouned {
  (props: NoticeProp): ReactNode;
  Display: (props: DisplayProp) => ReactNode;
}
