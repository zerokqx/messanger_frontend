import { useTokenStore } from '@/shared/token';
import { useRouter } from '@tanstack/react-router';
import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { db } from '@/shared/api';

export const useLogout = () => {
  const router = useRouter();
  const client = useQueryClient();

  return useCallback(async () => {
    await client.cancelQueries();
    client.clear();

    useTokenStore.getState().reset();
    useTokenStore.persist?.clearStorage();

    await db.delete();
    await router.navigate({
      to: '/auth',
      search: {
        redirect: '/y',
      },
      replace: true,
    });
  }, [client, router]);
};
