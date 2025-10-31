import { useMe } from '@/entities/user';
import type { ReactNode } from 'react';

export const AuthProviderHooks = ({ children }: { children: ReactNode }) => {
  useMe();

  return children;
};
