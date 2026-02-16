import type { ReactNode } from 'react';

export interface IsAuthAProp {
  toRootUrl?: boolean;
  status?: boolean;
  children: ReactNode;
}
