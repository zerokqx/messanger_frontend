import { useMe } from '@/entities/user';
import { useRefresh } from '@/features/refresh/api';
import type { ReactNode } from 'react';

export const AuthProviderHooks = ({ children }: { children: ReactNode }) => {
  useRefresh();
  useMe();

  return children;
};
