import { useTokenStore } from '@/entities/token';
import { useUserStore } from '@/entities/user';
import { useCheckAuth } from '@/features/checkAuth';
import { AuthContext } from '@/shared/model/authProviderContext';
import { useMemo } from 'react';
import { AuthProviderHooks } from './AuthProvedHooks';
import type { AuthProviderProps } from './authProvider.type';

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const isAuth = useCheckAuth();
  const token = useTokenStore((s) => s);
  const user = useUserStore();
  const value = useMemo(
    () => ({
      isAuth,
      user,
      token,
    }),
    [isAuth, user, token]
  );

  return (
    <AuthContext value={value}>
      <AuthProviderHooks>{children}</AuthProviderHooks>
    </AuthContext>
  );
};
