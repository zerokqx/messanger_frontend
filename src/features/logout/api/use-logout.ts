import { useTokenStore } from '@/shared/token';
import { useRouter } from '@tanstack/react-router';
import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { delteDb } from '@/shared/api';
import { useChatUserId, useSelectedChat } from '@/entities/chat';
import { useSessionLogoutSessionsLogoutPost } from '@/shared/api/orval/auth-service/v1-auth-sessions/v1-auth-sessions';

export const useLogout = () => {
  const router = useRouter();
  const client = useQueryClient();
  const { setUserId } = useChatUserId();
  const { mutateAsync: logoutFromServer } =
    useSessionLogoutSessionsLogoutPost();

  return useCallback(async () => {
    try {
      await logoutFromServer();
    } catch {
      document.cookie =
        'yobble_access_token=; Max-Age=0; path=/; domain=.yobble.org';
    }

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
  }, [client, logoutFromServer, router, setUserId]);
};
