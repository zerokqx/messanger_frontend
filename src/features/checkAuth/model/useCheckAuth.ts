import { useTokenStore } from '@/entities/token/@x/user';
import { useEffect, useState } from 'react';
import { useLogger } from 'react-use';

/**
 * @returns boolean
 */
function useCheckAuth(): boolean {
  const validateToken = useTokenStore((s) => s.validateToken);
  const access = useTokenStore((s) => s.access); // или useStore(state => state.access)
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useLogger('useCheckAuth validation', { status: validateToken() });
  useEffect(() => {
    const status = validateToken(access);
    setIsAuth(status);
  }, [access, validateToken]);

  return isAuth;
}

useCheckAuth.check = (): boolean => {
  const { validateToken } = useTokenStore.getState();
  const statusToken = validateToken();
  return statusToken;
};

export { useCheckAuth };
