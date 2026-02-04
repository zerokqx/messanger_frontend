import { useTokenStore } from '@/shared/token';
import { useCallback, useEffect, useState } from 'react';
import { useLogger } from 'react-use';
import z from 'zod';

/**
 * @returns boolean
 * @deprecated
 */
function useCheckAuth(): boolean {
  const validate = useCallback((t: string) => z.jwt().safeParse(t).success, []);
  const access = useTokenStore((s) => s.data.access);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useLogger('useCheckAuth validation', { status: validate(access) });
  useEffect(() => {
    const status = validate(access);
    setIsAuth(status);
  }, [access, validate]);

  return isAuth;
}

useCheckAuth.check = (): boolean => {
  const validate = (t: string) => z.jwt().safeParse(t).success;
  const token = useTokenStore.getState().data.access;
  return validate(token);
};

export { useCheckAuth };
