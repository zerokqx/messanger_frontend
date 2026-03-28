import { useTokenStore } from '@/shared/token';
import { useRouter } from '@tanstack/react-router';
import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { delteDb } from '@/shared/api';
import { useChatUserId, useSelectedChat } from '@/entities/chat';

export const useLogout = () => {
  const router = useRouter();
  const client = useQueryClient();
  const { setUserId } = useChatUserId();

  return useCallback(async () => {
    localStorage.clear();
    sessionStorage.clear();
    await client.cancelQueries();
    await setUserId('');
    useTokenStore.getState().reset();
    useTokenStore.persist?.clearStorage();
    useSelectedChat.getState().set('');
    await delteDb();
    await router.invalidate();
    client.clear();
  }, [client, router, setUserId]);
};
