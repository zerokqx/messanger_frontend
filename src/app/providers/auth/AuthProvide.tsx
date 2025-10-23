import { useTokenStore } from '@/entities/token';
import { useUserStore } from '@/entities/user';
import { AuthContext } from '@/shared/model/authProviderContext';
import { useEffect, useMemo, useState } from 'react';
import { AuthProviderHooks } from './AuthProvedHooks';
import type { AuthProviderProps } from './authProvider.type';

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const token = useTokenStore((s) => s);

  const { validateToken, clearStore } = useTokenStore();
  const user = useUserStore();
  const value = useMemo(
    () => ({
      isAuth,
      user,
      token,
    }),
    [isAuth, user, token]
  );
  useEffect(() => {
    const status = validateToken();
    setIsAuth(status);

    if (!status) clearStore();
  }, [token.access, clearStore, validateToken]);

  return (
    <AuthContext value={value}>
      <AuthProviderHooks>{children}</AuthProviderHooks>
    </AuthContext>
  );
};
