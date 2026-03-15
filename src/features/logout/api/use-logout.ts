import { tokenAction } from '@/shared/token';
import { useRouter } from '@tanstack/react-router';
import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export const useLogout = () => {
  const router = useRouter();
  const client = useQueryClient();

  return useCallback(async () => {
    tokenAction.doReset();
    await client.cancelQueries();
    client.clear();

    await router.navigate({
      to: '/auth',
      search: {
        redirect: '/y',
      },
    });
    await router.invalidate();
  }, [client, router]);
};
