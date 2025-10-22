import { useTokenStore } from '@/entities/token';
import { useLogout, useUserStore } from '@/entities/user';
import { useLogin } from '@/features/login';
import { useRegister } from '@/features/register';
import { AuthContext } from '@/shared/model/authProviderContext';
import { useMemo, useState } from 'react';
import { useEffectOnce, useLogger } from 'react-use';
import type { AuthProviderProps } from './authProvider.type';

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const { validateToken } = useTokenStore();
  const user = useUserStore();
  useEffectOnce(() => {
    setIsAuth(validateToken());
  });
  useLogger('AuthProvider', { isAuth });
  const value = useMemo(
    () => ({
      isAuth,
      user,
      useLogin: useLogin,
      useRegister: useRegister,
      useLogout: useLogout,
    }),
    [isAuth, user]
  );
  return <AuthContext value={value}>{children}</AuthContext>;
};
