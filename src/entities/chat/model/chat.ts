import { create } from 'zustand';
import { useRouter, useRouterState } from '@tanstack/react-router';
import type { PrivateChatListItem } from '@/shared/api/orval/chat-private-service/chat-private-service.schemas';
import { useChatCreate } from '../api';
import { useCallback, useEffect } from 'react';

export type ChatItem = PrivateChatListItem;

interface UseSelectedChatState {
  chatId: string;
}

interface UseSelectedChatActions {
  /**
   * Устанавливает текущий выбранный чат
   * @param chatId - идентификатор чата
   */
  set: (chatId: string) => void;
}

const initialState = {
  chatId: '',
} as const;
/**
 * Zustand store для хранения текущего выбранного чата
 * @returns { chatId: string, set: (chatId: string) => void }
 */
export const useSelectedChat = create<
  UseSelectedChatState & UseSelectedChatActions
>((set, get) => ({
  ...initialState,
  set: (chatId) => {
    const current = get().chatId;
    if (chatId !== current) set((state) => ({ ...state, chatId }));
    return;
  },
}));

/**
 * Хук для работы с userId через хэш URL
 */
export function useChatUserId() {
  const router = useRouter();

  const rawHash = useRouterState({
    select: (state) => state.location.hash,
  });

  const userId = rawHash.replace(/^#/, '');

  /**
   * Устанавливает новый userId в хэше URL
   * @param {string} nextUserId - новый идентификатор пользователя
   */
  const setUserId = useCallback(
    async (nextUserId: string) => {
      await router.navigate({ hash: nextUserId });
    },
    [ router]
  );

  return { userId, setUserId };
}

/**
 * Хук для обеспечения существования чата с пользователем.
 * Если чат не существует, создаёт его и обновляет состояние selectedChat
 * @param {string} userId - идентификатор пользователя для чата
 */
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
