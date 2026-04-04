import { isClientSessionAuthorized } from '@/shared/api';
import { useTokenStore } from '@/shared/token';
import { useCallback, useEffect, useState } from 'react';
import { useLogger } from 'react-use';

/**
 * @returns boolean
 */
function useCheckAuth(): boolean {
  const validate = useCallback(
    (token: string) => isClientSessionAuthorized(token),
    []
  );
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
  const token = useTokenStore.getState().data.access;
  return isClientSessionAuthorized(token);
};

export { useCheckAuth };
