import { tokenAction } from '@/shared/token';
import { userAction } from '@/entities/user/model/user-store';
import { useRouter } from '@tanstack/react-router';
import { useCallback } from 'react';

export const useLogout = () => {
  const router = useRouter();

  return useCallback(async () => {
    tokenAction.doReset();
    userAction.doReset();
    await router.navigate({
      to: '/auth',
      search: {
        redirect: '/y',
      },
    });
    await router.invalidate();
  }, [router]);
};
