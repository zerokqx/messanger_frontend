import { useLiveQuery } from 'dexie-react-hooks';
import { create } from 'zustand';
import { chatExists } from './chat-exists';
import {
  useCanGoBack,
  useNavigate,
  useRouter,
  useRouterState,
  useSearch,
} from '@tanstack/react-router';
import type { PrivateChatListItem } from '@/shared/api/orval/chat-private-service/chat-private-service.schemas';
import { useChatCreate } from '../api';
import { useCallback, useEffect } from 'react';
import { router } from '@/app/main';

export type ChatItem = PrivateChatListItem;

interface UseSelectedChatState {
  chatId: string;
}
interface UseSelectedChatActions {
  set: (chatId: string) => void;
}

export const useSelectedChat = create<
  UseSelectedChatState & UseSelectedChatActions
>((set, get) => ({
  chatId: '',
  set: (chatId) => {
    const current = get().chatId;
    if (chatId !== current) set((state) => ({ ...state, chatId }));
    return;
  },
}));

export function useChatUserId() {
  const router = useRouter();

  const rawHash = useRouterState({
    select: (state) => state.location.hash,
  });

  const userId = rawHash.replace(/^#/, '');

  const setUserId = useCallback(
    async (nextUserId: string) => {
      await router.navigate({ hash: nextUserId });
    },
    [router]
  );

  return { userId, setUserId };
}

export function useEnsureChat(userId: string) {
  const chatId = useSelectedChat((s) => s.chatId);
  const setChatId = useSelectedChat((s) => s.set);
  const { smartCreateMutate } = useChatCreate();

  useEffect(() => {
    if (!userId) return;

    let cancelled = false;

    void smartCreateMutate(userId).then((chat) => {
      if (!cancelled && chatId !== chat.chat_id) {
        setChatId(chat.chat_id);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [userId, chatId, setChatId, smartCreateMutate]);

  return chatId;
}
