import { useTokenStore } from '@/entities/token/@x/user';
import { useLayoutEffect, useState } from 'react';

function useCheckAuth() {
  const { validateToken, clearStore, access } = useTokenStore();
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (validateToken()) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
      clearStore();
    }
  }, [validateToken, access, clearStore]);

  return isAuth;
}

useCheckAuth.check = (): boolean => {
  const { validateToken, clearStore } = useTokenStore.getState();
  if (validateToken()) {
    return true;
  }
  clearStore();
  return false;
};

export { useCheckAuth };
