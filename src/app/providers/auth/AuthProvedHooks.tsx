import { useMe } from '@/entities/user';
import { useRefresh } from '@/features/refresh';
import type { ReactNode } from 'react';

export const AuthProviderHooks = ({ children }: { children: ReactNode }) => {
  useMe();

  return children;
};
