import { useTokenStore } from '@/entities/token/@x/user';
import { useLayoutEffect, useState } from 'react';
import { set } from 'zod';

export const useCheckAuth = () => {
  const { validateToken, clearStore, access } = useTokenStore();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  useLayoutEffect(() => {
    if (validateToken()) {
      setIsAuth(true);
    }
  }, [validateToken, access, clearStore]);
};
