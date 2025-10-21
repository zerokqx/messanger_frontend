import { useTokenStore } from '@/entities/token/@x/user';
import { useLayoutEffect, useState } from 'react';

function useCheckAuth(): boolean {
  const { validateToken, clearStore, access } = useTokenStore();
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useLayoutEffect(() => {
    const status = validateToken();
    setIsAuth(
      status
        ? status
        : (() => {
            clearStore();
            return status;
          })()
    );
  }, [validateToken, access, clearStore]);

  return isAuth;
}

useCheckAuth.check = (): boolean => {
  const { validateToken, clearStore } = useTokenStore.getState();
  const statusToken = validateToken();
  if (statusToken) return true;

  clearStore();

  return false;
};

export { useCheckAuth };
