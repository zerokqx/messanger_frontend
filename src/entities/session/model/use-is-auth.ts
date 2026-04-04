import { useTokenStore } from '@/shared/token';
import { isClientSessionAuthorized } from '@/shared/api';

export const useIsAuth = () => {
  const access = useTokenStore((s) => s.data.access);
  return isClientSessionAuthorized(access);
};

useIsAuth.check = () => {
  const access = useTokenStore.getState().data.access;
  return isClientSessionAuthorized(access);
};
