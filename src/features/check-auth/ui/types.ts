import type { ReactNode } from 'react';

export interface IsAuthProps {
  toRootUrl?: boolean;
  status?: boolean;
  children: ReactNode;
}
