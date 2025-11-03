import { useTokenStore } from '@/entities/token/@x/user';
import { useLayoutEffect, useState } from 'react';

/**
 * @returns boolean
 */
function useCheckAuth(): boolean {
  const validateToken = useTokenStore((s) => s.validateToken);
  const clearStore = useTokenStore((s) => s.clearStore);
  const access = useTokenStore((s) => s.access); // или useStore(state => state.access)
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useLayoutEffect(() => {
    const status = validateToken();
    setIsAuth(status);
    if (!status) clearStore();
  }, [access, validateToken, clearStore]);

  return isAuth;
}

useCheckAuth.check = (): boolean => {
  const { validateToken } = useTokenStore.getState();
  const statusToken = validateToken();
  return statusToken;
};

export { useCheckAuth };
