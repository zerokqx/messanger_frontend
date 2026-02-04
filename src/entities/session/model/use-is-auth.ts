import { useTokenStore } from '@/shared/token';
import { tokenAction } from '@/shared/token';

export const useIsAuth = () => {
  const access = useTokenStore((s) => s.data.access);
  return tokenAction.doValidate(access);
};

useIsAuth.check = () => {
  const access = useTokenStore.getState().data.access;
  return tokenAction.doValidate(access);
};
