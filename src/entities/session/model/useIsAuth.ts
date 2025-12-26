import { useTokenStore } from '@/shared/token';
import { tokenAction } from '@/shared/token';
import { useUserStore } from '@/entities/user';

export const useIsAuth = () => {
  const login = useUserStore((s) => s.data.login);
  const access = useTokenStore((s) => s.data.access);
  return !!(login && tokenAction.doValidate(access));
};

useIsAuth.check = () => {
  const login = useUserStore.getState().data.login;
  const access = useTokenStore.getState().data.access;
  return !!(login && tokenAction.doValidate(access));
};
