import type { ReactNode } from 'react';
import type { Windows } from './taber.type';

interface GeneralButtonProp {
  children: ReactNode;
}
export interface GoToProp<T extends Windows> extends GeneralButtonProp {
  resetTo: T[number] | 'zero';
}

export interface TaberButtons<T extends Windows> {
  GoTo: (props: GoToProp<T>) => ReactNode;
  Reset: (props: GeneralButtonProp) => ReactNode;
}
