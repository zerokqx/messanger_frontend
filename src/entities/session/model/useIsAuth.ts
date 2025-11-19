import { useTokenStore } from '@/entities/token';
import { doValidateToken } from '@/entities/token/model/useTokenStore';
import { useUserStore } from '@/entities/user';

export const useIsAuth = () => {
  const login = useUserStore((s) => s.data.login);
  const access = useTokenStore((s) => s.data.access);
  return !!(login && doValidateToken(access));
};

useIsAuth.check = () => {
  const login = useUserStore.getState().data.login;
  const access = useTokenStore.getState().data.access;
  return !!(login && doValidateToken(access));
};
